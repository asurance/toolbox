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
        v-for="tag in tool.tags"
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
import { Tag, Tool } from "@/interfaces";

export default defineComponent({
  components: { CheckedTag },
  props: {
    tool: {
      type: Object as PropType<Tool>,
      required: true,
    },
    selectedTag: {
      type: Set as PropType<Set<Tag>>,
      required: true,
    },
    pos: {
      type: Array as PropType<[number, number][]>,
      required: true,
    },
  },
  setup(props) {
    const onClickCard = () => {
      window.open(props.tool.url);
    };
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
      headerList,
    };
  },
});
</script>
