<template>
  <div class="sign-in-view">
    <div class="sign-in-view__title">Авторизация</div>
    <SignInForm />
    <router-link class="sign-in-view__link" to="/password-forget">
      Забыли пароль?
    </router-link>
  </div>
</template>

<script setup>
import SignInForm from "@/components/forms/SignInForm.vue";
</script>

<style lang="scss" scoped>
.sign-in-view {
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

  &__link {
    font-size: 14px;
    color: #9f9f9f;
    text-decoration: none;

    &:hover {
      color: black;
      text-decoration: underline;
    }
  }
}
</style>
