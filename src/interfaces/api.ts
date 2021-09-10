import { RemoteTool } from "./tool";

export type APISuccess<T> = {
  success: true;
  data: T;
};

export type APIFail = {
  success: false;
  message: string;
};

export type APIResult<T> = APISuccess<T> | APIFail;

export type QueryKeyResult = {
  secretId: string;
  secretKey: string;
};

export type QueryConfigResult = {
  updateTime: number;
  tools: RemoteTool[];
};
