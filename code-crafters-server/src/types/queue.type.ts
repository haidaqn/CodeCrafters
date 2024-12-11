import { STATUS_SUBMISSION } from "./status.type";

export interface SubmitCodeJobData {
  clientId: string;
  submissionId: number;
  code: string;
  problem: {
    timeLimit: number;
  };
  language: {
    name: string
  };
  testCases: Array<{ input: string; output: string }>;
  timeLimit: number;
}

export interface SubmitCodeResult {
  submissionId: number;
  maxMemoryUsed: number;
  totalMemoryUsed: number;
  statusSubmit: STATUS_SUBMISSION;
}
