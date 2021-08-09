<template>
  <section class="card" :title="tool.url" @click="onClickCard">
    <header>{{ tool.name }}</header>
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
import { defineComponent, PropType } from "vue";
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
  },
});
</script>
