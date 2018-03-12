<template lang="html">
  <div class="wrapper-topbar">
    <router-link :to="{ name: 'Index'}"><div class="logo"></div></router-link>
    <div class="avartar-wrapper"><img class="user-avartar" :src="userInfo.avartar"></div>
    <div class="wrapper-topbar-user">
      <router-link :to="{ name: 'UserCenter'}"
                   v-if="userInfo.isLogin">{{ userInfo.uname }}，欢迎你！</router-link>
      <a @click="login" v-if="!userInfo.isLogin">登录</a>
      <a @click="register" v-if="!userInfo.isLogin">注册</a>
      <a @click="logout" v-if="userInfo.isLogin">退出</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: this.$store.state.userInfo,
    }
  },
  mounted(){

  },
  methods: {
    login() {
      this.$emit('login')
    },
    register() {
      this.$emit('register')
    },
    logout() {
      let vm = this;
      let obj = {
        url: '/logout',
        args: {},
        success: function() {
          localStorage.state = null
          vm.$router.push({name: 'Index'})
          window.location.reload()
        },
        asy: true
      }
      Ajax(obj)
    },
  }
}
</script>

<style scoped>
.wrapper-topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 7%;
  background: #f5f4f5;
  color: #999;
  text-align: right;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 2;
}
.wrapper-topbar-user {
  float: right;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  width: auto;
  margin-right: 10px;
  font-family: 'PingFang';
}
.avartar-wrapper {
  display: inline-block;
  /* float: right; */
  height: 40px;
  width: 40px;
  margin: 10px;
  margin-right: 20px;
  border-radius: 30px;
  overflow: hidden;
  box-sizing: border-box;
}
.user-avartar {
  width: 100%;
}
.wrapper-topbar-user a {
  /* color: #999; */
  max-width: 160px;
  margin: 0 5px;
  white-space: normal;
  text-overflow: ellipsis;
  transition: color .3s ease-in-out;
}
.wrapper-topbar-user a:hover {
  color: black
}
.logo {
  position: absolute;
  left: 7%;
  height: 60px;
  width: 120px;
  background: url(../assets/imgs/logo2.png) center center no-repeat;
  background-size: 110px;
}
</style>
