import { Tool } from "@/interfaces";
import { computed, ComputedRef, reactive } from "vue";

export const tools: Tool[] = [
  {
    name: "Mixamo",
    description: "3d动作资源网站",
    tags: ["3d资源"],
    url: "https://www.mixamo.com/",
  },
  {
    name: "Sketchfab",
    description: "3d模型资源网站",
    tags: ["3d资源"],
    url: "https://sketchfab.com/",
  },
  {
    name: "Indienova",
    description: "独立游戏资讯网站",
    tags: ["独立游戏"],
    url: "https://www.indienova.com/",
  },
  {
    name: "Audacity",
    description: "免费音频编辑软件",
    tags: ["音频"],
    url: "https://www.audacityteam.org/",
  },
  {
    name: "freesound",
    description: "免费音频资源网站",
    tags: ["音频"],
    url: "https://freesound.org/",
  },
  {
    name: "Spector.js",
    description: "WebGL调试工具",
    tags: ["WebGL"],
    url: "https://spector.babylonjs.com/",
  },
  {
    name: "khronos",
    description: "WebGL官方文档",
    tags: ["WebGL"],
    url: "https://www.khronos.org/webgl/",
  },
  {
    name: "The Spriters Resource",
    description: "2d资源网站",
    tags: ["2d资源"],
    url: "https://www.spriters-resource.com/",
  },
  {
    name: "MathStudio",
    description: "数学工具",
    tags: ["数学"],
    url: "http://mathstud.io/",
  },
  {
    name: "Shadershop",
    description: "数学工具",
    tags: ["数学"],
    url: "http://tobyschachman.com/Shadershop/editor/",
  },
  {
    name: "cypress",
    description: "前端测试框架",
    tags: ["前端"],
    url: "https://www.cypress.io/",
  },
  {
    name: "free-font",
    description: "中文免费可商用字体",
    tags: ["字体"],
    url: "https://github.com/wordshub/free-font",
  },
  {
    name: "Font Awesome",
    description: "图形化字体",
    tags: ["字体"],
    url: "https://fontawesome.dashgame.com/",
  },
  {
    name: "Adobe Color",
    description: "adobe 调色盘",
    tags: ["前端"],
    url: "https://color.adobe.com/zh/explore",
  },
  {
    name: "Rust月刊",
    description: "Rust语言开源杂志",
    tags: ["Rust"],
    url: "https://rustmagazine.github.io/rust_magazine_2021/index.html",
  },
  {
    name: "Code My UI",
    description: "UI样例网站",
    tags: ["前端"],
    url: "https://codemyui.com/",
  },
  {
    name: "30 seconds of code",
    description: "代码片段",
    tags: ["前端"],
    url: "https://www.30secondsofcode.org/",
  },
  {
    name: "NW.js",
    description: "类似electron桌面开发库",
    tags: ["js库"],
    url: "https://nwjs.org.cn/",
  },
  {
    name: "Talend API Tester",
    description: "Http请求和url解析插件",
    tags: ["chrome插件"],
    url: "https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm",
  },
  {
    name: "collection.js",
    description: "js容器库",
    tags: ["js库"],
    url: "http://www.collectionsjs.com/",
  },
  {
    name: "danger.js",
    description: "CI工具链库",
    tags: ["js库"],
    url: "https://danger.systems/js/",
  },
  {
    name: "Multiavatar",
    description: "假头像库",
    tags: ["js库"],
    url: "https://multiavatar.com/",
  },
  {
    name: "faker.js",
    description: "假数据库",
    tags: ["js库"],
    url: "https://github.com/Marak/faker.js",
  },
  {
    name: "Majestic",
    description: "测试工具",
    tags: ["js库"],
    url: "https://github.com/Raathigesh/majestic",
  },
  {
    name: "素材集合",
    description: "素材集合",
    tags: ["独立游戏", "chrome"],
    url: "http://game.yixin.im/static-web/hd/game-base/#/guide",
  },
];

export const ToolStore = {
  tools: reactive(tools),
  get allNames(): ComputedRef<string[]> {
    return computed(() => {
      return this.tools.map((tool) => tool.name);
    });
  },
  get allTags(): ComputedRef<string[]> {
    return computed(() => {
      const set = new Set<string>();
      for (const { tags } of this.tools) {
        for (const tag of tags) {
          set.add(tag);
        }
      }
      return [...set];
    });
  },
};
