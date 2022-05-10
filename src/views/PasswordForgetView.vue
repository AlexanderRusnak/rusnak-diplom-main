<template>
  <div class="password-forget-view">
    <div class="password-forget-view__title">Восстановление пароля</div>
    <PasswordForgetForm />
    <router-link class="password-forget-view__link" to="/sign-in">
      {{ "< Назад" }}
    </router-link>
  </div>
</template>

<script setup>
import PasswordForgetForm from "@/components/forms/PasswordForgetForm.vue";
</script>

<style lang="scss" scoped>
.password-forget-view {
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
