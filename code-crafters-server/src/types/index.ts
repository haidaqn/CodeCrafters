import {IsArray, IsNumber} from "class-validator";

export * from "./user.type";
export * from "./problem.type";
export * from "./status.type";
export * from "./queue.type";
export * from "./paging";


export class IdsDTo {
  @IsArray()
  @IsNumber({}, {each: true})
  ids: number[];
}