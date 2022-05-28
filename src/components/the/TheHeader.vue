<template>
  <div class="header">
    <BaseContainer>
      <div class="header__wrapper">
        <div class="logo" @click="redirect('')">Restik</div>
        <div class="auth">
          <BaseButton
            style="border: 1px solid white"
            @click="signOut"
            :size="'small-adaptive'"
            >выйти из аккаунта</BaseButton
          >
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import FirebaseService from "@/services/FirebaseService";
import BaseContainer from "@/components/base/BaseContainer.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const router = useRouter();

const redirect = (route) => {
  router.push(`/${route}`);
};

const signOut = () => {
  FirebaseService.doSignOut();
  router.push("/sign-in");
};
</script>

<style lang="scss" scoped>
.header {
  background-color: black;
  color: white;
  &__wrapper {
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.logo {
  width: 182px;
  font-weight: 700;
  cursor: pointer;
}
</style>
