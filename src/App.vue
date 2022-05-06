<template>
  <nav>
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
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
