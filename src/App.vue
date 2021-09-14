<template>
  <main>
    <div class="menu">
      <Download v-if="!configSuccess" @Click="requestConfig" />
      <Loading v-if="configLoading" />
    </div>
    <header>Asurance的工具箱</header>
    <InputSearch :searchValue="searchValue" @SearchChange="onSearchChange" />
    <div class="tags">
      <TagGroup :tags="tags" :selected="selectedTag" />
    </div>
    <div class="cards">
      <ToolCard
        v-for="({ tool, highlights }, index) of tools"
        :key="index"
        :tool="tool"
        :highlights="highlights"
        :selectedTag="selectedTag"
        :editable="editable"
        @Click="onClickCard"
        @Delete="onDeleteTool"
      />
    </div>
  </main>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import ToolCard from "@/components/ToolCard.vue";
import TagGroup from "@/components/TagGroup.vue";
import InputSearch from "@/components/InputSearch.vue";
import Download from "@/svg/Download.vue";
import Loading from "@/svg/Loading.vue";
import { getRemoteConfig, tools, tagsSet, deleteTool } from "@/store/tools";
import useRequest from "@/hooks/useRequest";
import useScorer from "@/hooks/useScorer";
import { isLogin } from "@/store/user";
import { StoreTool } from "./interfaces/tool";

export default defineComponent({
  components: {
    ToolCard,
    TagGroup,
    InputSearch,
    Download,
    Loading,
  },
  setup() {
    const {
      loading: configLoading,
      success: configSuccess,
      send: requestConfig,
    } = useRequest(getRemoteConfig, true);
    onMounted(requestConfig);
    const searchValue = ref("");
    const onSearchChange = (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      searchValue.value = target.value;
    };
    const selectedTagSet = reactive(new Set<string>());
    const showTools = computed(() => {
      if (selectedTagSet.size > 0) {
        return tools.value.filter((tool) => {
          for (const tag of selectedTagSet) {
            if (!tool.tags.includes(tag)) {
              return false;
            }
          }
          return true;
        });
      } else {
        return tools.value;
      }
    });
    const toolScore = useScorer(showTools, searchValue);
    const onClickCard = (tool: StoreTool) => {
      window.open(tool.url);
    };
    const onDeleteTool = (tool: StoreTool) => {
      deleteTool(tool._id);
    };
    return {
      configLoading,
      configSuccess,
      requestConfig,
      tools: toolScore,
      tags: tagsSet,
      selectedTag: selectedTagSet,
      searchValue,
      onSearchChange,
      editable: isLogin,
      onClickCard,
      onDeleteTool,
    };
  },
});
</script>
<style lang="less">
@import "@/variant.less";
@menu-svg-size: 2em;
main {
  & > .menu {
    min-height: @menu-svg-size;
    text-align: right;
  }
  & > .menu > svg {
    width: @menu-svg-size;
    height: @menu-svg-size;
    margin-right: 0.4em;
  }

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
