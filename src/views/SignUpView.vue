<template>
  <div class="sign-up-view">
    <div class="sign-up-view__title">Регистрация</div>
    <SignUpForm />
    <router-link to="/sign-in">Уже зарегистрированы?</router-link>
  </div>
</template>

<script setup>
import SignUpForm from "@/components/forms/SignUpForm.vue";
</script>

<style lang="scss" scoped>
.sign-up-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__title {
    margin-bottom: 40px;
    font-size: 25px;
    font-weight: 700;
  }
}
</style>
