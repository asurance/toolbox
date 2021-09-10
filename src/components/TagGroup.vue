<template>
  <Tag
    v-for="tag of showTags"
    :key="tag"
    :name="tag"
    :selected="selected.has(tag)"
    :onClick="onClickTag"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import Tag from "@/components/Tag.vue";
import { DefaultSorter } from "@/util";

export default defineComponent({
  components: { Tag },
  props: {
    tags: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
    selected: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
  },
  setup(props) {
    const showTags = computed(() => [...props.tags].sort(DefaultSorter));
    const onClickTag = (name: string) => {
      if (props.selected.has(name)) {
        props.selected.delete(name);
      } else {
        props.selected.add(name);
      }
    };
    return {
      showTags,
      onClickTag,
    };
  },
});
</script>
