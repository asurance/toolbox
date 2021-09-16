<template>
  <Tag
    v-for="tag of tags"
    :key="tag"
    :name="tag"
    :selected="selected.has(tag)"
    :onClick="onClickTag"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Tag from "@/components/Tag.vue";

export default defineComponent({
  components: { Tag },
  props: {
    tags: {
      type: Array as PropType<string[]>,
      required: true,
    },
    selected: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
  },
  setup(props) {
    const onClickTag = (name: string) => {
      if (props.selected.has(name)) {
        props.selected.delete(name);
      } else {
        props.selected.add(name);
      }
    };
    return {
      onClickTag,
    };
  },
});
</script>
