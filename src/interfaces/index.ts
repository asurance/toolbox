export type Tool = {
  name: string;
  url: string;
  description: string;
  tags: Tag[];
};

export type Tag =
  | "2d"
  | "3d"
  | "美术"
  | "独立游戏"
  | "资源"
  | "软件"
  | "工具"
  | "音频"
  | "WebGL"
  | "文档"
  | "Icon"
  | "字体"
  | "Rust"
  | "js/ts"
  | "css"
  | "React"
  | "Vue"
  | "前端"
  | "chrome插件"
  | "数学";
