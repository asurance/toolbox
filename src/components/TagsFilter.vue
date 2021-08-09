<template>
  <div class="tags">
    <CheckedTag
      v-for="tag of tags"
      :key="tag"
      :name="tag"
      :selectedTag="selectedTag"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import CheckedTag from "@/components/CheckedTag.vue";
import { Tag } from "@/interfaces";

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
});
</script>
