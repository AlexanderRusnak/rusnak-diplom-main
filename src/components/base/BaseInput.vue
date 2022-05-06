<template>
  <input :value="props.modelValue" @input="updateInput" type="text" />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);

const emit = defineEmits("updateInput");

const updateInput = () => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped></style>
