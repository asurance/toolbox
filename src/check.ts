import { tools } from "@/config";

const nameSet = new Set<string>();
const duplicateSet = new Set<string>();
for (const { name } of tools) {
  if (nameSet.has(name)) {
    duplicateSet.add(name);
  } else {
    nameSet.add(name);
  }
}
if (duplicateSet.size > 0) {
  console.error(`配置表中出现重复名称: ${[...duplicateSet].join(",")}`);
}
