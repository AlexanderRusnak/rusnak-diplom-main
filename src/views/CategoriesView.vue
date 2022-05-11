<template>
  <BaseContainer>
    <div>Categories View</div>
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
    router.push("/");
  }
});
onBeforeUnmount(() => {
  authListener();
});
</script>

<style lang="scss" scoped></style>
