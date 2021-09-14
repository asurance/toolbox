import { RemoteTool } from "./tool";

export type InsertOpr = {
  type: "insert";
  data: RemoteTool;
};

export type UpdateOpr = {
  type: "update";
  data: Partial<RemoteTool> & { _id: string };
};

export type DeleteOpr = {
  type: "delete";
  data: string;
};

export type DiffOpr = InsertOpr | UpdateOpr | DeleteOpr;
