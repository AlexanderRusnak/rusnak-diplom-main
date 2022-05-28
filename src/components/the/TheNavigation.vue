<template>
  <div>
    <BaseContainer>
      <div class="product-navigation">
        <div class="navigation product-navigation__navigation">
          <div class="navigation__item">
            <div @click="redirect('orders')" class="link">заказы</div>
          </div>
          <div class="navigation__item">
            <div @click="redirect('positions')" class="link">позиции</div>
          </div>
          <div class="navigation__item">
            <div @click="redirect('categories')" class="link">категории</div>
          </div>
          <div class="navigation__item">
            <div @click="redirect('waiters')" class="link">официанты</div>
          </div>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseContainer from "@/components/base/BaseContainer.vue";

const router = useRouter();

const redirect = (route) => {
  router.push(`/${route}`);
};
</script>

<style lang="scss" scoped>
.product-navigation {
  height: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  &__navigation {
    display: flex;
    justify-content: flex-end;

    margin: auto;
  }
}

.navigation__item {
  margin-left: 30px;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }
}
</style>
