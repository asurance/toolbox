<template>
  <section>
    <header>{{ tool.name }}</header>
    <p>
      {{ tool.description }}
    </p>
    <div>
      <div v-for="tag in tool.tags" :key="tag">{{ tag }}</div>
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
});
</script>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  min-width: 16rem;
  max-width: 32rem;
  height: 16rem;
  margin: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.3rem hsla(0, 0%, 0%, 0.7);
  transition: box-shadow 0.2s;
}
section:hover {
  box-shadow: 0.1rem 0.1rem 0.1rem hsla(0, 0%, 0%, 0.3);
}
section > header {
  flex: 0 0 1.5rem;
  margin: 1rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: bold;
  position: relative;
}

section > header::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.4rem;
  margin: 0 auto;
  width: 0%;
  height: 5px;
  transform: scale(1, 0.2);
  border-radius: 0.2rem;
  background-color: hsla(0, 0%, 0%, 0.3);
}
section:hover > header::before {
  width: 100%;
  background-color: hsla(0, 0%, 0%, 0.7);
  transition: all 0.5s;
}

section > p {
  flex: 1 1 auto;
  margin: 0 1rem;
  display: flex;
  max-width: 24rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

section > div {
  flex: 0 0 2rem;
  /* overflow-x: auto; */
  margin: 1rem;
  display: flex;
  position: relative;
}

section > div::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -0.4rem;
  margin: 0 auto;
  width: 0%;
  height: 5px;
  transform: scale(1, 0.2);
  border-radius: 0.2rem;
  background-color: hsla(0, 0%, 0%, 0.3);
}

section:hover > div::before {
  width: 100%;
  background-color: hsla(0, 0%, 0%, 0.7);
  transition: all 0.5s;
}

section > div > div {
  padding: 0.2rem 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  transition: background-color 0.5s;
  background-color: hsla(0, 0%, 0%, 0.05);
}

section > div > div:hover {
  background-color: hsla(0, 0%, 0%, 0.1);
}
</style>
