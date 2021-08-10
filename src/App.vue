<template>
  <main>
    <header>Asurance的工具箱</header>
    <div class="search">
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#333333"
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6c3.2 3.2 8.4 3.2 11.6 0l43.6-43.5c3.2-3.2 3.2-8.4 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
        />
      </svg>
      <input
        type="text"
        placeholder="搜索"
        :value="searchValue"
        @input.prevent="onSearchChange"
      />
    </div>
    <TagsFilter :tags="tags" :selectedTag="selectedTag" />
    <div class="cards">
      <ToolCard
        v-for="({ tool, pos }, index) of tools"
        :key="index"
        :tool="tool"
        :pos="pos"
        :selectedTag="selectedTag"
      />
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ToolCard from "@/components/ToolCard.vue";
import TagsFilter from "@/components/TagsFilter.vue";
import useTools from "@/hooks/useTools";
import useSearchFilter from "@/hooks/useSearchFilter";
import useTagsFilter from "@/hooks/useTagsFilter";

export default defineComponent({
  components: { ToolCard, TagsFilter },
  setup() {
    const { tools: rawTools, tags } = useTools();
    const { selectedTag, filteredTools } = useTagsFilter(rawTools);
    const {
      searchValue,
      onSearchChange,
      filteredResult: showTools,
    } = useSearchFilter(filteredTools);
    return {
      tools: showTools,
      tags,
      selectedTag,
      searchValue,
      onSearchChange,
    };
  },
});
</script>
