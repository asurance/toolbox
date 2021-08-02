<template>
  <header>Asurance的工具箱</header>
  <div>
    <input
      type="text"
      autocomplete="false"
      placeholder="搜索"
      @keydown="onChange"
    />
    <div class="test" v-if="results.length > 0">
      <div v-for="(result, index) of results" :key="index">{{ result }}</div>
    </div>
  </div>
  <main>
    <ToolCard v-for="(tool, index) of tools" :key="index" :tool="tool" />
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ToolCard from "@/components/ToolCard.vue";
import { ToolStore } from "@/config";
import { DefaultSorter, GetScore } from "@/util";

export default defineComponent({
  components: { ToolCard },
  setup() {
    const results = ref<string[]>([]);
    const onChange = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        const value = (e.target as HTMLInputElement).value;
        const sorted = ToolStore.allNames.value
          .map<{ name: string; score: number }>((name) => {
            const score = GetScore(name, value, []);
            return {
              name,
              score,
            };
          })
          .filter(({ score }) => score > 0)
          .sort((a, b) => {
            if (a.score < b.score) {
              return 1;
            } else if (a.score > b.score) {
              return -1;
            } else {
              return DefaultSorter(a.name, b.name);
            }
          });
        results.value = sorted.map(({ name }) => name);
      }
    };
    return { tools: ToolStore.tools, onChange, results };
  },
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  padding: 4rem 0;
  color: white;
  background-color: hsla(144, 82%, 46%, 0.7);
  border-radius: 0 0 2rem 2rem;
}
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
div {
  display: flex;
  justify-content: center;
  position: relative;
}
.test {
  position: absolute;
  top: 1rem;
}
</style>
