<template>
  <section class="card" :title="tool.url" @click="onClickCard">
    <header>
      <span
        v-for="({ content, isHighlight }, index) of headerList"
        :key="index"
        :class="isHighlight ? 'highlight' : ''"
        >{{ content }}</span
      >
    </header>
    <p>
      {{ tool.description }}
    </p>
    <div class="tags">
      <CheckedTag
        v-for="tag in showTags"
        :key="tag"
        :name="tag"
        :selectedTag="selectedTag"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import CheckedTag from "@/components/CheckedTag.vue";
import { StoreTool } from "@/interfaces";
import Record from "@/record";
import { DefaultSorter } from "../util";

export default defineComponent({
  components: { CheckedTag },
  props: {
    tool: {
      type: Object as PropType<StoreTool>,
      required: true,
    },
    selectedTag: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
    pos: {
      type: Array as PropType<[number, number][]>,
      required: true,
    },
  },
  setup(props) {
    const onClickCard = () => {
      Record.addRecord(props.tool.name, "tool");
      window.open(props.tool.url);
    };
    const showTags = computed(() => {
      const tags = [...props.tool.tags];
      return tags.sort(DefaultSorter);
    });
    const headerList = computed(() => {
      const list: {
        content: string;
        isHighlight: boolean;
      }[] = [];
      if (props.pos.length > 0) {
        if (props.pos[0][0] > 0) {
          list.push({
            content: props.tool.name.slice(0, props.pos[0][0]),
            isHighlight: false,
          });
        }
        list.push({
          content: props.tool.name.slice(props.pos[0][0], props.pos[0][1] + 1),
          isHighlight: true,
        });
        for (let i = 1; i < props.pos.length; i++) {
          list.push({
            content: props.tool.name.slice(
              props.pos[i - 1][1] + 1,
              props.pos[i][0],
            ),
            isHighlight: false,
          });
          list.push({
            content: props.tool.name.slice(
              props.pos[i][0],
              props.pos[i][1] + 1,
            ),
            isHighlight: true,
          });
        }
        if (props.pos[props.pos.length - 1][1] < props.tool.name.length - 1) {
          list.push({
            content: props.tool.name.slice(
              props.pos[props.pos.length - 1][1] + 1,
            ),
            isHighlight: false,
          });
        }
      } else {
        list.push({
          content: props.tool.name,
          isHighlight: false,
        });
      }
      return list;
    });
    return {
      onClickCard,
      showTags,
      headerList,
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
    .highight {
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
