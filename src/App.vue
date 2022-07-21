<template>
  <div class="h1-name">
    <router-link to="/home" class="h1-router"><h1>Social Network App</h1></router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('autoLogin');
  }
}
</script>

<style>
body {
  background-color: black;
  font-family: Comic Sans MS, Comic Sans, cursive;
}

.h1-name {
  color: white;
  text-align: center;
  font-size: 30px;
}

.h1-router {
  color: white;
  text-decoration: none;
}
</style>