<template>
  <header>Asurance的工具箱</header>
  <div>
    <input type="text" placeholder="搜索" @focus="onFocusSearch" />
    <SearchBox
      :visible="searchVisible"
      @VisibleChange="onSearchVisibleChange"
    />
  </div>
  <main>
    <ToolCard v-for="(tool, index) of tools" :key="index" :tool="tool" />
  </main>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ToolCard from "@/components/ToolCard.vue";
import SearchBox from "@/components/SearchBox.vue";
import { ToolStore } from "@/config";

export default defineComponent({
  components: { ToolCard, SearchBox },
  setup() {
    const searchVisible = ref(false);
    const onFocusSearch = (e: Event) => {
      const target = e.target as HTMLInputElement;
      target.blur();
      searchVisible.value = true;
    };
    const onSearchVisibleChange = (visible: boolean) => {
      searchVisible.value = visible;
    };
    return {
      tools: ToolStore.tools,
      searchVisible,
      onFocusSearch,
      onSearchVisibleChange,
    };
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
