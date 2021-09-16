<template>
  <div class="select-container" @click.stop="">
    <ul ref="selectedRef" class="selected" @click="onClickSelected">
      <li
        class="tag"
        v-for="option in selected"
        :key="option"
        :title="option"
        @click.stop="onDelete(option)"
      >
        {{ option }}
      </li>
      <li>
        <input ref="inputRef" @input="onInputChange" />
      </li>
    </ul>
    <ul
      :style="{ top: `${optionsTop}px` }"
      class="options"
      v-show="showOptions"
    >
      <li
        :class="selected.indexOf(option) >= 0 ? 'select' : ''"
        v-for="option of options"
        :key="option"
        @click="onClickTag(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  Ref,
} from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<string[]>,
      requried: true,
    },
    selected: {
      type: Array as PropType<string[]>,
      required: true,
    },
    onAdd: Function as PropType<(option: string) => void>,
    onDelete: Function as PropType<(option: string) => void>,
  },
  setup(prop) {
    const selectedRef = ref<HTMLUListElement | null>(
      null,
    ) as Ref<HTMLUListElement>;
    const inputRef = ref<HTMLInputElement | null>(
      null,
    ) as Ref<HTMLInputElement>;
    const inputValue = ref("");
    const showOptions = ref(false);
    const observer = new ResizeObserver((mutation) => {
      const paddingBottom =
        parseFloat(getComputedStyle(selectedRef.value).paddingBottom) || 0;
      optionsTop.value = mutation[0].contentRect.height + paddingBottom + 8;
    });
    onMounted(() => {
      observer.observe(selectedRef.value);
      document.addEventListener("click", onDocumentClick);
    });
    onBeforeUnmount(() => {
      observer.unobserve(selectedRef.value);
      document.removeEventListener("click", onDocumentClick);
    });
    const onInputChange = (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const tags = target.value.split(/,|，/g);
      if (tags.length > 1) {
        for (const tag of tags) {
          if (tag) {
            prop.onAdd?.(tag);
          }
        }
        target.value = "";
        target.style.width = "";
      } else {
        target.style.width = `${target.scrollWidth}px`;
      }
    };
    const onDocumentClick = () => {
      if (inputRef.value.value) {
        prop.onAdd?.(inputRef.value.value);
        inputRef.value.value = "";
      }
      showOptions.value = false;
    };
    const optionsTop = ref(0);
    const onClickSelected = () => {
      inputRef.value.focus();
      showOptions.value = true;
    };
    const onClickTag = (option: string) => {
      if (prop.selected.indexOf(option) >= 0) {
        prop.onDelete?.(option);
      } else {
        prop.onAdd?.(option);
      }
    };
    return {
      inputRef,
      selectedRef,
      optionsTop,
      showOptions,
      onClickSelected,
      inputValue,
      onInputChange,
      onClickTag,
    };
  },
});
</script>

<style lang="less">
@import "@/variant.less";
.select-container {
  width: 40em;
  position: relative;
  .selected,
  .options {
    list-style: none;
    padding: 0;
  }
  .selected {
    padding: 0.5em;
    border: 1px solid currentColor;
    border-radius: 0.2em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > li {
      max-width: calc(100% - 1em);
      &.tag {
        border: 1px solid currentColor;
        border-radius: 0.2em;
        max-width: calc(100% - 1.5em);
        margin: 0.2em;
        padding: 0 0.5em;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      input {
        border: none;
        outline: none;
        background: none;
        color: currentColor;
        width: 1em;
        max-width: 100%;
      }
    }
  }
  .options {
    position: absolute;
    box-shadow: 0 1px 2px 0 black;
    width: 99.8%;
    left: 0.1%;
    max-height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
    & > li {
      padding: 0.5em;
      margin: 0 -1px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: @background-from;
      &:hover {
        background: @background-to;
      }
      &.select {
        background: @card-background;
      }
    }
  }
}
</style>
