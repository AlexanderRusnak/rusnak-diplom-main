<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/sign-up">SignUp</router-link> |
    <router-link to="/sign-in">SignIn</router-link> |
    <router-link to="/password-forget">PasswordForget</router-link> |
    <router-link to="/account">Account</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/positions">Positions</router-link> |
    <router-link to="/waiters">Waiters</router-link> |
    <router-link to="/orders">Orders</router-link> |
    <router-link to="/404">NotFoundView</router-link> |
    <button @click="signOut">Exit from account</button>
  </nav>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FirebaseService from "@/services/FirebaseService";

const router = useRouter();

const isLoggedIn = ref(true);

FirebaseService.checkAuthStateChanged(function (user) {
  if (user) {
    isLoggedIn.value = true; // if we have a user
  } else {
    isLoggedIn.value = false; // if we do not
  }
});

const signOut = () => {
  FirebaseService.doSignOut();
  router.push("/");
};
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
