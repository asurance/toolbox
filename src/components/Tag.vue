<template>
  <div :class="['tag', selected ? 'selected' : '']" @click.stop="onClickTag">
    <Tag />
    <span>{{ name }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Tag from "@/svg/Tag.vue";

export default defineComponent({
  components: { Tag },
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Boolean,
    onClick: Function as PropType<(name: string) => void>,
  },
  setup(props) {
    const onClickTag = () => {
      props.onClick?.(props.name);
    };
    return {
      onClickTag,
    };
  },
});
</script>
<style lang="less">
@import "@/variant.less";
.tag {
  cursor: pointer;
  border: 1px solid currentColor;
  border-radius: 1em;
  padding: 0.2em 0.8em;
  margin: 0.2em;
  background-color: @tag-background;
  &.selected {
    color: @font-color-select;
    background-color: @tag-background-select;
  }
  & > svg {
    width: 1em;
    height: 1em;
    position: relative;
    top: 0.2em;
  }
}
</style>
