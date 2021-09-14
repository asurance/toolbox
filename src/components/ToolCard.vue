<template>
  <section class="card" :title="tool.url" @click="onClickCard">
    <header>
      <span
        v-for="({ str, flag }, index) of highlights"
        :key="index"
        :class="flag ? 'highlight' : ''"
        >{{ str }}</span
      >
    </header>
    <p>
      {{ tool.description }}
    </p>
    <div class="tags">
      <TagGroup :tags="new Set(tool.tags)" :selected="selectedTag" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TagGroup from "@/components/TagGroup.vue";
import { StoreTool } from "@/interfaces/tool";
import { Hightlight } from "@/Scorer";

export default defineComponent({
  components: { TagGroup },
  props: {
    tool: {
      type: Object as PropType<StoreTool>,
      required: true,
    },
    selectedTag: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
    highlights: {
      type: Array as PropType<Hightlight[]>,
      required: true,
    },
  },
  setup(props) {
    const onClickCard = () => {
      window.open(props.tool.url);
    };
    return {
      onClickCard,
    };
  },
});
</script>

<style lang="less">
@import "@/variant.less";
.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 18em;
  border: 1px solid currentColor;
  padding: 1em;
  border-radius: 1em;
  background-color: @card-background;
  box-shadow: 0.3em 0.3em 0.3em @card-shadow, -0.3em 0.3em 0.3em @card-shadow;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0.1em 0.1em 0.1em @card-shadow-thin,
      -0.1em 0.1em 0.1em @card-shadow-thin;
  }

  @media (max-width: @xl) {
    height: 24em;
  }
  @media (max-width: @lg) {
    height: 28em;
  }
  @media (max-width: @sm) {
    height: 32em;
  }

  & > header {
    flex: 0 0 1.5em;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    .highlight {
      color: @font-color-select;
    }
  }
  & > p {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    margin: 0.5em 0;
    border-width: 1px 0 1px 0;
    border-style: solid;
    border-color: currentColor;
    color: @card-article;
  }
  & > .tags {
    flex: 0 0 1em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
