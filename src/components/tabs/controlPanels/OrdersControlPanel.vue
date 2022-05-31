<template>
  <div class="control-panel">
    <div>
      <BaseInput
        :value="props.search"
        @input="updateSearch"
        class="control-panel__search-input"
        :isOpened="false"
        type="text"
        placeholder="Поиск по столу..."
      />

      <BaseSelect
        :value="props.orderStatusFilter"
        @change="updateOrderStatusFilter"
        class="control-panel__select"
      >
        <option value="Все заказы" selected="selected">Все заказы</option>
        <option>Открытый</option>
        <option>Закрытый</option>
      </BaseSelect>

      <BaseSelect
        :value="props.orderWaiterFilter"
        @change="updateOrderWaiterFilter"
        class="control-panel__select"
      >
        <option value="Все официанты" selected="selected">Все официанты</option>
        <option v-for="waiter in props.waiters" :key="waiter.id">
          {{ waiter.name }}
        </option>
      </BaseSelect>
    </div>

    <BaseButton @click="updateModalStatus" size="small-adaptive">
      создать заказ
    </BaseButton>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

const props = defineProps([
  "search",
  "orderStatusFilter",
  "orderWaiterFilter",
  "waiters",
]);

const emit = defineEmits([
  "updateSearch",
  "updateModalStatus",
  "updateOrderStatusFilter",
  "updateOrderWaiterFilter",
]);

// ! Updates

const updateSearch = () => {
  emit("updateSearch", event.target.value);
};

const updateOrderStatusFilter = () => {
  emit("updateOrderStatusFilter", event.target.value);
};

const updateOrderWaiterFilter = () => {
  emit("updateOrderWaiterFilter", event.target.value);
};

const updateModalStatus = () => {
  emit("updateModalStatus");
};
</script>

<style lang="scss" scoped>
.control-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

  &__search-input {
    width: 150px;
    height: 31px;
    padding: 0px 10px;
    font-size: 13px;
  }

  &__select {
    width: 172px;
    margin-left: 5px;
  }
}
</style>
