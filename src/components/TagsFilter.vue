<template>
  <div class="tags">
    <label v-for="{ name, selected } of allTags" :key="name">
      <input
        type="checkbox"
        :checked="selected"
        @change="onSelecetedChange(name)"
      />
      <span>{{ name }}</span>
    </label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Tag } from "../interfaces";

export default defineComponent({
  props: {
    tags: {
      type: Set as PropType<Set<Tag>>,
      required: true,
    },
    selectedTag: {
      type: Set as PropType<Set<Tag>>,
      required: true,
    },
  },
  setup(props) {
    const allTags = computed(() => {
      const results: { name: Tag; selected: boolean }[] = [];
      for (const tag of props.tags) {
        if (props.selectedTag.has(tag)) {
          results.push({ name: tag, selected: true });
        } else {
          results.push({ name: tag, selected: false });
        }
      }
      return results;
    });
    const onSelecetedChange = (tag: Tag) => {
      if (props.selectedTag.has(tag)) {
        props.selectedTag.delete(tag);
      } else {
        props.selectedTag.add(tag);
      }
    };
    return {
      allTags,
      onSelecetedChange,
    };
  },
});
</script>
