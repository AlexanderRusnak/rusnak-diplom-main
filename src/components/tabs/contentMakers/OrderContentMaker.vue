<template>
  <div class="content-maker">
    <div class="content-maker__title">Содержимое заказа</div>
    <div class="content-maker__content">
      <OrderContentItem
        v-for="item in props.orderContent"
        :order-item="item"
        :key="item.id"
      />
    </div>
    <BaseButton
      class="content-maker__button"
      :isWhite="true"
      type="button"
      size="xxl"
    >
      добавить позицию
    </BaseButton>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import OrderContentItem from "@/components/tabs/contentItems/OrderContentItem.vue";

const props = defineProps(["orderContent"]);
// const emit = defineEmits(["updateInput"]);
</script>

<style lang="scss" scoped>
.content-maker {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__content {
    margin-top: 20px;
    width: 100%;
  }

  &__button {
    margin-top: 15px;
  }
}
</style>
