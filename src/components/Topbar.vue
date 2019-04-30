<template lang="html">
  <div id="topbar">
    <div class="wrapper-topbar">
      <router-link :to="{ name: 'Index'}"><div class="logo"></div></router-link>
      <div class="avatar-wrapper" v-if="userInfo.isLogin"><img class="user-avatar" :src="userInfo.avatar"></div>
      <div class="wrapper-topbar-user">
        <a @click="goHome" v-if="userInfo.isLogin">
          <router-link :to="{ name: 'Home'}" style="color: black">{{ userInfo.uname }}，欢迎你！</router-link>
        </a>
        <a @click="login" v-if="!userInfo.isLogin">登录</a>
        <a @click="register" v-if="!userInfo.isLogin">注册</a>
        <a @click="logout" v-if="userInfo.isLogin">退出</a>
      </div>
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
  mounted() {
    this.$store.commit('getLocalStorage')
  },
  activated() {
    // if(!this.userInfo.uid){
    //   this.$router.push({name: 'Index'})
    // }
  },
  methods: {
    goHome() {
      this.$store.commit('setUserCenter', { recNavId: 0 })
      this.$store.commit('setLocalStorage')
    },
    login() {
      this.$emit('login')
    },
    register() {
      this.$emit('register')
    },
    logout() {
      tools.loading()
      this.$store.dispatch('userLogout')
        .then(() => {
          tools.info('退出成功，即将跳转到首页', 'success');
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        });
    },
  }
}
</script>

<style scoped>
#topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1110px;
  height: 60px;
  z-index: 2;
  box-sizing: border-box;
}
.wrapper-topbar {
  position: relative;
  width: 100%;
  min-width: 1110px;
  height: 60px;
  line-height: 60px;
  padding: 0 7%;
  background: #f5f4f5;
  color: #999;
  text-align: right;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
.wrapper-topbar-user {
  float: right;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  width: auto;
  margin-right: 10px;
  font-family: "PingFang MD";
}
.avatar-wrapper {
  display: inline-block;
  /* float: right; */
  height: 40px;
  width: 40px;
  margin: 10px;
  margin-right: 5px;
  border-radius: 30px;
  overflow: hidden;
  box-sizing: border-box;
}
.user-avatar {
  width: 100%;
}
.wrapper-topbar-user a {
  /* color: #999; */
  max-width: 160px;
  margin: 0 10px;
  white-space: normal;
  text-overflow: ellipsis;
  transition: color 0.3s ease-in-out;
}
.wrapper-topbar-user a:hover {
  color: black;
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
