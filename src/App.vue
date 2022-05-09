<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/sign-up">SignUp</router-link> |
    <router-link to="/sign-in">SignIp</router-link> |
    <router-link to="/password-forget">PasswordForget</router-link> |
    <router-link to="/account">Account</router-link> |
    <router-link to="/categories">Categories</router-link> |
    <router-link to="/positions">Positions</router-link> |
    <router-link to="/waiters">Waiters</router-link> |
    <router-link to="/orders">Orders</router-link> |
    <router-link to="/404">NotFoundView</router-link> |
  </nav> -->
  <router-view />
</template>

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
