<template>
  <BaseContainer>
    <BaseSelect v-model="selectedCategory">
      <option key="-1" value="Не выбрано">Не выбрано</option>
      <option v-for="option in optionsArray" :key="option.id">
        {{ option.alias }}
      </option>
    </BaseSelect>
  </BaseContainer>
</template>

<script setup>
import { ref } from "vue";
import BaseContainer from "@/components/base/BaseContainer.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

const selectedCategory = ref("Не выбрана");
const optionsArray = ref([
  { alias: "коктейли", id: 1 },
  { alias: "супы", id: 2 },
  { alias: "горячие блюда", id: 3 },
]);
</script>

<style lang="scss" scoped></style>
