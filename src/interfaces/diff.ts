import { RemoteTool } from "./tool";

export type UpdateData = {
  updateTime: number;
  inserts: RemoteTool[];
  updates: (Partial<RemoteTool> & { _id: string })[];
  deletes: string[];
};
