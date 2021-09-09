<template>
  <CheckedTag
    v-for="tag of showTags"
    :key="tag"
    :name="tag"
    :selectedTag="selectedTag"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import CheckedTag from "@/components/CheckedTag.vue";
import { DefaultSorter } from "@/util";

export default defineComponent({
  components: { CheckedTag },
  props: {
    tags: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
    selectedTag: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
  },
  setup(props) {
    const showTags = computed(() => [...props.tags].sort(DefaultSorter));
    return {
      showTags,
    };
  },
});
</script>
