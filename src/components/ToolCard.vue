<template>
  <section class="card" :title="tool.url" @click="onClickCard">
    <header>
      <div class="title">
        <span
          v-for="({ str, flag }, index) of highlights"
          :key="index"
          :class="flag ? 'highlight' : ''"
        >
          {{ str }}
        </span>
      </div>
      <Delete v-if="editable" @Click="onClickDelete" />
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
import Delete from "@/svg/Delete.vue";
import { StoreTool } from "@/interfaces/tool";
import { Hightlight } from "@/Scorer";

export default defineComponent({
  components: { TagGroup, Delete },
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
    editable: {
      type: Boolean,
      required: true,
    },
    onClick: Function as PropType<(tool: StoreTool) => void>,
    onDelete: Function as PropType<(tool: StoreTool) => void>,
  },
  setup(props) {
    const onClickCard = () => {
      props.onClick?.(props.tool);
    };
    const onClickDelete = () => {
      props.onDelete?.(props.tool);
    };
    return {
      onClickCard,
      onClickDelete,
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
    position: relative;
    & > .title {
      & > .highlight {
        color: @font-color-select;
      }
    }
    & > {
      svg {
        width: 1em;
        height: 1em;
        position: absolute;
        top: 0.15em;
        right: -0.3em;
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
  }
  &:hover > header {
    & > {
      svg {
        opacity: 1;
      }
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
