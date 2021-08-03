<template>
  <teleport to="body">
    <div v-show="visible" class="wrapper" @click="onClickBackground">
      <input
        type="text"
        autocomplete="false"
        placeholder="搜索"
        ref="inputRef"
        @input="onSearchChange"
        @click.stop=""
      />
      <div class="test" v-if="results.length > 0" @click.stop="">
        <div v-for="(result, index) of results" :key="index">{{ result }}</div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, toRef, watch } from "vue";
import { ToolStore } from "../config";
import { DefaultSorter, GetScore } from "../util";

export default defineComponent({
  props: {
    visible: Boolean,
    onVisibleChange: Function as PropType<(visible: boolean) => void>,
  },
  setup(props) {
    const visible = toRef(props, "visible");
    const inputRef = ref<HTMLInputElement | null>(null);
    watch([visible, inputRef], ([visible, inputRef]) => {
      if (visible && inputRef) {
        nextTick(() => {
          inputRef.focus();
        });
      }
    });
    const results = ref<string[]>([]);
    const onSearchChange = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      if (value.length === 0) {
        results.value = [];
        return;
      }
      const sorted = ToolStore.allNames.value
        .map<{ name: string; score: number }>((name) => {
          const score = GetScore(name.toLowerCase(), value.toLowerCase(), []);
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
    };
    const onClickBackground = () => {
      props.onVisibleChange?.(false);
    };
    return {
      onClickBackground,
      inputRef,
      onSearchChange,
      results,
    };
  },
});
</script>
<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.3);
}
</style>
