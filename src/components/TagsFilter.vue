<template>
  <div class="tags">
    <CheckedTag
      v-for="tag of showTags"
      :key="tag"
      :name="tag"
      :selectedTag="selectedTag"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import CheckedTag from "@/components/CheckedTag.vue";
import { Tag } from "@/interfaces";
import { TagSorter } from "@/util";

export default defineComponent({
  components: { CheckedTag },
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
    const showTags = computed(() => [...props.tags].sort(TagSorter));
    return {
      showTags,
    };
  },
});
</script>
