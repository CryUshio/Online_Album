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
@font-face {
  font-family: 'PingFang MD';
  src: url(./assets/fonts/PingFang-Medium.ttf);
}
@font-face {
  font-family: 'PingFang BD';
  src: url(./assets/fonts/PingFang-Bold.ttf);
}
@font-face {
  font-family: 'MILT RG';
  src: url(./assets/fonts/MILT_RG.ttf);
}
@font-face {
  font-family: 'MILT BD';
  src: url(./assets/fonts/MILT_BD.ttf);
}
#app {
  font-family: 'PingFang MD', 'PingFang','MILT_RG','Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body {
  position: relative;
  min-width: 540px;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: #f5f4f5;
}
a {
  text-decoration: none;
  cursor: pointer;
}
button {
  font-family: 'PingFang MD', 'PingFang','MILT_RG','Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  border: none;
  outline: none;
  /* border-radius: 3px; */
  cursor: pointer;
}
input, textarea{
  font-family: 'PingFang MD', 'PingFang','MILT_RG','Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  outline: none;
}
::-webkit-scrollbar {
   /* display: none; */
}

</style>
