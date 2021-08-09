<template>
  <section class="card" :title="tool.url" @click="onClickCard">
    <header>{{ tool.name }}</header>
    <p>
      {{ tool.description }}
    </p>
    <div>
      <span class="tag" v-for="tag in tool.tags" :key="tag">{{ tag }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Tool } from "@/interfaces";

export default defineComponent({
  props: {
    tool: {
      type: Object as PropType<Tool>,
      required: true,
    },
  },
  setup(props) {
    const onClickCard = () => {
      window.open(props.tool.url);
    };
    return {
      onClickCard,
    };
  },
});
</script>
