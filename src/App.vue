<template>
  <div>
    <TheHeader v-if="isLoggedIn" />
    <TheNavigation v-if="isLoggedIn" />

    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FirebaseService from "@/services/FirebaseService";
import TheHeader from "@/components/the/TheHeader.vue";
import TheNavigation from "@/components/the/TheNavigation.vue";

const isLoggedIn = ref(true);

FirebaseService.checkAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}
#app {
  color: black;
}

nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
