<template>
  <main>
    <header>Asurance的工具箱</header>
    <InputSearch :searchValue="searchValue" @SearchChange="onSearchChange" />
    <div class="tags">
      <TagGroup :tags="tags" :selected="selectedTag" />
    </div>
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
import { defineComponent, onMounted } from "vue";
import ToolCard from "@/components/ToolCard.vue";
import TagGroup from "@/components/TagGroup.vue";
import InputSearch from "@/components/InputSearch.vue";
import useTools from "@/hooks/useTools";
import useSearchFilter from "@/hooks/useSearchFilter";
import useTagsFilter from "@/hooks/useTagsFilter";
import { getRemoteConfig } from "./store/tools";

export default defineComponent({
  components: { ToolCard, TagGroup, InputSearch },
  setup() {
    onMounted(() => {
      getRemoteConfig();
    });
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
<style lang="less">
@import "@/variant.less";
main {
  & > header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    padding: 1em 0;
  }

  & > .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1em 0;
  }

  & > .cards {
    display: grid;
    grid-template-columns: repeat(4, 18em);
    grid-gap: 2em;
    justify-content: space-around;
    align-content: space-around;
    align-items: stretch;
    justify-items: stretch;
    @media (max-width: @xl) {
      grid-template-columns: repeat(3, 18em);
    }
    @media (max-width: @lg) {
      grid-template-columns: repeat(2, 18em);
    }
  }
}
</style>
