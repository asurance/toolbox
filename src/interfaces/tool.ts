export type RemoteTool = {
  _id: string;
  name: string;
  url: string;
  description: string;
  tags: string;
};

export type StorageTool = {
  name: string;
  url: string;
  description: string;
  tags: string;
};

export type StoreTool = {
  _id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
};
