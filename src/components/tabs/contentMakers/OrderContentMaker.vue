<template>
  <div class="content-maker">
    <div class="content-maker__title">Содержимое заказа</div>
    <div class="content-maker__head">
      <div class="content-maker__head-item content-maker__head-item_position">
        Позиция
      </div>
      <div class="content-maker__head-item content-maker__head-item_amount">
        Кол-во
      </div>
      <div class="content-maker__head-item content-maker__head-item_sum">
        Сумма
      </div>
      <div
        class="content-maker__head-item content-maker__head-item_cross"
      ></div>
    </div>
    <div class="content-maker__content">
      <OrderContentItem
        v-for="item in props.orderContent"
        :order-item="item"
        :key="item.id"
        :positions="props.positions"
        :selected-object="props.selectedObject"
        @content-position-changed="handleContentPositionChanges"
        @content-amount-changed="handleContentAmountChanges"
        @content-position-delete="handlePositionDelete"
      />
    </div>
    <div v-if="props.selectedObject" class="content-maker__sum">
      К оплате:
      {{ props?.selectedObject?.sum + "₽" }}
    </div>
    <BaseButton
      @click="handlePositionAddition"
      class="content-maker__button"
      :isWhite="true"
      type="button"
      size="xxl"
      v-if="
        props.selectedObject !== undefined &&
        props.selectedObject?.status !== 'Закрытый'
      "
    >
      добавить позицию
    </BaseButton>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
import OrderContentItem from "@/components/tabs/contentItems/OrderContentItem.vue";

const props = defineProps(["orderContent", "positions", "selectedObject"]);

const emit = defineEmits([
  "content-position-changed",
  "content-amount-changed",
  "content-item-add",
]);

const handleContentPositionChanges = (changedPositionID, newPosition) => {
  emit("content-position-changed", changedPositionID, newPosition);
};

const handleContentAmountChanges = (changedPositionID, newAmount) => {
  emit("content-amount-changed", changedPositionID, newAmount);
};

const handlePositionDelete = (deletedPositionID) => {
  emit("content-position-delete", deletedPositionID);
};

const handlePositionAddition = () => {
  let isAdditionValid = true;

  // валидация всех позиций в заказе
  props.orderContent.forEach((item) => {
    if (!item.position || item.amount <= 0) {
      isAdditionValid = false;
    }
  });

  console.log(isAdditionValid, "RESULT");

  if (isAdditionValid) {
    emit("content-item-add");
  }
};
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

  &__head {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-item {
      font-size: 12px;
      text-align: center;
      height: 20px;

      vertical-align: middle;
      line-height: 20px;

      &_position {
        width: 200px;
      }

      &_amount {
        width: 78px;
      }

      &_sum {
        width: 83px;
      }

      &_cross {
        width: 10px;
      }
    }
  }

  &__content {
    width: 100%;
  }

  &__button {
    margin-top: 15px;
  }

  &__sum {
    margin-top: 15px;
    font-weight: 500;
  }
}
</style>
