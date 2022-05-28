<template>
  <BaseContainer>
    <div class="landing-container">
      <div class="logo">Restik</div>
      <div class="title">Добро пожаловать в Restik</div>
      <div class="subtitle">
        Мы предоставляем простую и понятную платформу для автоматизации
        внутренних процессов ресторана.
      </div>
      <div class="text">
        Наше веб-приложение позволяет: принимать заказы, вести учет официантов,
        позиций и категорий меню. Данные функции помогут автоматизировать
        процессы ресторана, улучшат и оптимизируют его работу.
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import FirebaseService from "@/services/FirebaseService";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "vue";
import BaseContainer from "@/components/base/BaseContainer.vue";

const router = useRouter();
const authListener = FirebaseService.checkAuthStateChanged(function (user) {
  if (!user) {
    router.push("/sign-in");
  }
});
onBeforeUnmount(() => {
  authListener();
});
</script>

<style lang="scss" scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-top: 205px;
  font-size: 30px;
  font-family: "Knewave", cursive;
  letter-spacing: 3.5px;
  font-weight: 800;
}

.title {
  margin-top: 15px;
  font-size: 25px;
  font-weight: 800;
  text-align: center;
}

.subtitle {
  margin-top: 15px;
  width: 666px;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: rgb(69, 82, 87);
}

.text {
  text-align: center;
  margin-top: 40px;
  width: 666px;
  font-size: 16px;
  font-weight: 400;
}
</style>
