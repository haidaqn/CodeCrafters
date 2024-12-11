import { Injectable } from "@nestjs/common";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs/promises";
import { LoggerService } from "../logger";
import * as path from "path";
import { DockerDto } from "./docker.dto";
import { STATUS_SUBMISSION } from "../types";

const execAsync = promisify(exec);

@Injectable()
export class DockerService {
  constructor(private readonly logger: LoggerService) {
  }

  async runCode(dockerDto: DockerDto): Promise<{
    status: STATUS_SUBMISSION;
    output: string;
    error: string;
    memoryUsed?: number
  }> {
    const { code, timeLimit, input, language } = dockerDto;

    let fileName = `main.${this.getExtension(language)}`;
    const folderPath = `./temp/${Date.now()}`;
    const absoluteFolderPath = path.resolve(folderPath);
    const containerName = `submission_${Date.now()}`;

    await fs.mkdir(absoluteFolderPath, { recursive: true });

    try {
      await fs.writeFile(`${absoluteFolderPath}/${fileName}`, code);
      await fs.writeFile(`${absoluteFolderPath}/input.txt`, input);

      const dockerImage = this.getDockerImage(language);
      if (!dockerImage) {
        return { status: STATUS_SUBMISSION.CE, output: "", error: "Unsupported language" };
      }

      const unixPath = absoluteFolderPath.replace(/\\/g, "/");

      if (language === "java") {
        const classNameMatch = code.match(/public class (\w+)/);
        if (classNameMatch) {
          const className = classNameMatch[1];
          fileName = `${className}.java`;
          await fs.writeFile(`${absoluteFolderPath}/${fileName}`, code);
        }
      }

      let command = "";
      if (language === "cpp") {
        command = `docker run --name ${containerName} --rm -v ${unixPath}:/app ${dockerImage} bash -c "g++ /app/${fileName} -o /app/main && /app/main < /app/input.txt"`;
      } else if (language === "java") {
        const javaFileName = fileName.replace(".java", "");
        command = `docker run --name ${containerName} --rm -v ${unixPath}:/app ${dockerImage} bash -c "javac /app/${fileName} && java -cp /app ${javaFileName} < /app/input.txt"`;
      } else if (language === "javascript") {
        command = `docker run --name ${containerName} --rm -v ${unixPath}:/app ${dockerImage} bash -c "node /app/${fileName} < /app/input.txt"`;
      } else if (language === "python") {
        command = `docker run --name ${containerName} --rm -v ${unixPath}:/app ${dockerImage} bash -c "python /app/${fileName} < /app/input.txt"`;
      } else {
        return { status: STATUS_SUBMISSION.CE, output: "", error: "Unsupported language" };
      }

      this.logger.log(`Running command: ${command}`);

      const { stdout, stderr } = await execAsync(command, { timeout: timeLimit * 1000 });

      if (stderr) {
        return { status: STATUS_SUBMISSION.RE, output: "", error: stderr.trim() };
      }

      const statsCommand = `docker stats ${containerName} --no-stream --format "{{.MemUsage}}"`;
      const { stdout: statsOutput } = await execAsync(statsCommand);
      const memoryUsage = this.parseMemoryUsage(statsOutput);

      return { status: STATUS_SUBMISSION.AC, output: stdout.trim(), error: "", memoryUsed: memoryUsage };

    } catch (err: any) {
      if (err.message.includes("timeout")) {
        return { status: STATUS_SUBMISSION.TLE, output: "", error: "Time limit exceeded" };
      }

      this.logger.error(`Docker execution failed: ${err.message || err}`);
      return { status: STATUS_SUBMISSION.RE, output: "", error: `Execution failed: ${err.message || "Unknown error"}` };
    } finally {
      try {
        await fs.rm(absoluteFolderPath, { recursive: true, force: true });
        await execAsync(`docker rm ${containerName}`); // Clean up the container
      } catch (cleanupError) {
        this.logger.warn(`Failed to clean up temporary directory: ${absoluteFolderPath}. Error: ${cleanupError.message}`);
      }
    }
  }

  private getExtension(language: string): string {
    const extensions = { python: "py", java: "java", javascript: "js", cpp: "cpp" };
    return extensions[language] || "txt";
  }

  private getDockerImage(language: string): string {
    const images = {
      python: "python:3.9",
      java: "openjdk:11",
      javascript: "node:14",
      cpp: "gcc:11"
    };
    return images[language] || "";
  }

  private parseMemoryUsage(memUsage: string): number {
    const match = memUsage.match(/(\d+(\.\d+)?)\s?(KiB|MiB|GiB)/);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[3];

    switch (unit) {
      case "GiB":
        return value * 1024 * 1024; // Convert to KiB
      case "MiB":
        return value * 1024;
      case "KiB":
      default:
        return value;
    }
  }
}