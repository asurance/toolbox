import { Ref } from "vue";
import { Tool } from "@/interfaces";
import { localConfig, tagsSet } from "@/store/tools";

export default function useTools(): {
  tools: Tool[];
  tags: Ref<Set<string>>;
} {
  return {
    tools: localConfig.tools,
    tags: tagsSet,
  };
}
