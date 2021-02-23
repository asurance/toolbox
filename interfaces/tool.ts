export type Tool = {
    id: number;
    name: string;
    url: string;
    description: string;
    tag: Tag;
}

export type Tag =
    '3d资源' |
    '独立游戏' |
    '音频' |
    'WebGL' |
    '2d资源' |
    '数学' |
    'js库' |
    '字体' |
    'Rust' |
    '前端' |
    'chrome插件'