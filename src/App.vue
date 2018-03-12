<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLogin: false
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'PingFang';
  src: url(./assets/fonts/PingFang-Regular.ttf);
}
#app {
  font-family: 'Microsoft YaHei', 'PingFang', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body {
  min-width: 360px;
  margin: 0;
  padding: 0;
  background: #f5f4f5;
}
a {
  text-decoration: none;
  cursor: pointer;
}
::-webkit-scrollbar {
   /* display: none; */
}

</style>
