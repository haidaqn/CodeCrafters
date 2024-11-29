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

  //
  // async runCode(dockerDto: DockerDto): Promise<{ status: STATUS_SUBMISSION; output: string; error: string }> {
  //   const { code, timeLimit, input, language } = dockerDto;
  //
  //   const fileName = `main.${this.getExtension(language)}`;
  //   const folderPath = `./temp/${Date.now()}`;
  //   const absoluteFolderPath = path.resolve(folderPath);
  //
  //   await fs.mkdir(absoluteFolderPath, { recursive: true });
  //
  //   try {
  //     await fs.writeFile(`${absoluteFolderPath}/${fileName}`, code);
  //     await fs.writeFile(`${absoluteFolderPath}/input.txt`, input);
  //
  //     const dockerImage = this.getDockerImage(language);
  //     if (!dockerImage) {
  //       return { status: STATUS_SUBMISSION.CE, output: "", error: "Unsupported language" };
  //     }
  //
  //     // Chuyển đổi đường dẫn từ Windows sang Unix format cho Docker
  //     const unixPath = absoluteFolderPath.replace(/\\/g, "/");
  //
  //     let command = "";
  //     if (language === "cpp") {
  //       command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "g++ /app/${fileName} -o /app/main && /app/main < /app/input.txt"`;
  //     } else if (language === "java") {
  //       const javaFileName = fileName.replace(".java", "");  // Xử lý tên lớp Java
  //       const fileNameChange = javaFileName.charAt(0).toUpperCase() + javaFileName.slice(1);
  //       command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "javac /app/${fileName} && java -cp /app ${fileNameChange} < /app/input.txt"`;
  //     } else if (language === "javascript") {
  //       command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "node /app/${fileName} < /app/input.txt"`;
  //     } else if (language === "python") {
  //       command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "python /app/${fileName} < /app/input.txt"`;
  //     } else {
  //       return { status: STATUS_SUBMISSION.CE, output: "", error: "Unsupported language" };
  //     }
  //
  //     this.logger.log(`Running command: ${command}`);
  //
  //     const { stdout, stderr } = await execAsync(command, { timeout: timeLimit * 1000 });
  //
  //     if (stderr) {
  //       return { status: STATUS_SUBMISSION.RE, output: "", error: stderr.trim() }; // Runtime Error (RE)
  //     }
  //
  //     return { status: STATUS_SUBMISSION.AC, output: stdout.trim(), error: "" }; // Accepted (AC)
  //
  //   } catch (err: any) {
  //     if (err.message.includes("timeout")) {
  //       return { status: STATUS_SUBMISSION.TLE, output: "", error: "Time limit exceeded" }; // Time Limit Exceeded (TLE)
  //     }
  //
  //     this.logger.error(`Docker execution failed: ${err.message || err}`);
  //     return { status: STATUS_SUBMISSION.RE, output: "", error: `Execution failed: ${err.message || "Unknown error"}` }; // Runtime Error (RE)
  //   } finally {
  //     try {
  //       await fs.rm(absoluteFolderPath, { recursive: true, force: true });
  //     } catch (cleanupError) {
  //       this.logger.warn(`Failed to clean up temporary directory: ${absoluteFolderPath}. Error: ${cleanupError.message}`);
  //     }
  //   }
  // }

  async runCode(dockerDto: DockerDto): Promise<{ status: STATUS_SUBMISSION; output: string; error: string }> {
    const { code, timeLimit, input, language } = dockerDto;

    let fileName = `main.${this.getExtension(language)}`;
    const folderPath = `./temp/${Date.now()}`;
    const absoluteFolderPath = path.resolve(folderPath);

    await fs.mkdir(absoluteFolderPath, { recursive: true });

    try {
      await fs.writeFile(`${absoluteFolderPath}/${fileName}`, code);
      await fs.writeFile(`${absoluteFolderPath}/input.txt`, input);

      const dockerImage = this.getDockerImage(language);
      if (!dockerImage) {
        return { status: STATUS_SUBMISSION.CE, output: "", error: "Unsupported language" };
      }

      // Chuyển đổi đường dẫn từ Windows sang Unix format cho Docker
      const unixPath = absoluteFolderPath.replace(/\\/g, "/");

      // Xác định tên lớp Java cho tệp
      if (language === "java") {
        const classNameMatch = code.match(/public class (\w+)/);
        if (classNameMatch) {
          const className = classNameMatch[1];
          fileName = `${className}.java`;
          await fs.writeFile(`${absoluteFolderPath}/${fileName}`, code);
        }
      }

      // Xây dựng command tùy theo ngôn ngữ lập trình
      let command = "";
      if (language === "cpp") {
        command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "g++ /app/${fileName} -o /app/main && /app/main < /app/input.txt"`;
      } else if (language === "java") {
        const javaFileName = fileName.replace(".java", "");  // Xử lý tên lớp Java
        command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "javac /app/${fileName} && java -cp /app ${javaFileName} < /app/input.txt"`;
      } else if (language === "javascript") {
        command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "node /app/${fileName} < /app/input.txt"`;
      } else if (language === "python") {
        command = `docker run --rm -v ${unixPath}:/app ${dockerImage} bash -c "python /app/${fileName} < /app/input.txt"`;
      } else {
        return { status: STATUS_SUBMISSION.CE, output: "", error: "Unsupported language" };
      }

      this.logger.log(`Running command: ${command}`);

      // Thực thi lệnh Docker và lấy kết quả stdout, stderr
      const { stdout, stderr } = await execAsync(command, { timeout: timeLimit * 1000 });

      // Kiểm tra lỗi và trả về trạng thái phù hợp
      if (stderr) {
        return { status: STATUS_SUBMISSION.RE, output: "", error: stderr.trim() }; // Runtime Error (RE)
      }

      return { status: STATUS_SUBMISSION.AC, output: stdout.trim(), error: "" }; // Accepted (AC)

    } catch (err: any) {
      if (err.message.includes("timeout")) {
        return { status: STATUS_SUBMISSION.TLE, output: "", error: "Time limit exceeded" }; // Time Limit Exceeded (TLE)
      }

      this.logger.error(`Docker execution failed: ${err.message || err}`);
      return { status: STATUS_SUBMISSION.RE, output: "", error: `Execution failed: ${err.message || "Unknown error"}` }; // Runtime Error (RE)
    } finally {
      try {
        // Dọn dẹp thư mục tạm thời
        await fs.rm(absoluteFolderPath, { recursive: true, force: true });
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
}
