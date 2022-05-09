<template>
  <button
    :class="{
      button: true,
      ['button_' + props.size]: true,
      button_white: props.isWhite,
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["isWhite", "size"]);
</script>

<style lang="scss" scoped>
.button {
  font-size: 14px;
  font-weight: 400;
  color: white;
  background-color: black;
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
}

.button_white {
  background-color: white;
  color: black;
}

.button_small-adaptive {
  width: auto;
  padding: 0px 23px;
  height: 32px;
}

.button_medium {
  width: 200px;
  height: 48px;
  min-height: 48px;
}

.button_large {
  width: 280px;
  height: 48px;
}

.button_xxl {
  width: 100%;
  height: 48px;
}

.button_disabled {
  opacity: 0.5 !important;
  cursor: not-allowed;
}
</style>
