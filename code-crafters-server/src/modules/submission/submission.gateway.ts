import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: true })
export class SubmissionGateway {
  @WebSocketServer()
  server: Server;

  sendTestCaseResult(clientId: string, data: any) {
    this.server.to(clientId).emit("testCaseResult", data);
  }

  sendSubmissionResult(clientId: string, data: any) {
    this.server.to(clientId).emit("submissionResult", data);
  }
}
