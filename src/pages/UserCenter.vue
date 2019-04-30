<template lang="html">
  <div class="user-center-wrapper">
    <topbar @login="login" @register="register"></topbar>
    <div class="head">
      <div class="head-bg">
        <div class="user-bar-wrapper">
          <div class="avatar-wrapper"><img class="avatar" :src="userInfo.avatar || 'static/img/default_avatar.gif'"></div>
          <div class="user-info">
            <div class="user-info-line"><span class="user-name">{{ userInfo.uname }}</span></div>
            <div class="user-info-line"><span class="user-sign">{{ userInfo.usignature || '暂无签名'}}</span></div>
          </div>
        </div>
      </div>
      <div class="nav-wrapper">
        <a @click="changeNav(n.id)" v-for="(n,index) in nav" :key="index">
          <router-link :to="{ name: n.path}" style="color: black">
            <div :class="['nav', {'nav-active': n.id == userCenter.recNavId}]">
              <span :class="n.class"></span>
              <span :class="['text', {'text-active': n.id == userCenter.recNavId}]">{{ n.name }}</span>
            </div>
          </router-link>
        </a>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <footer>
      <div class="wrapper-text"><span>Copyright © 2018 OA.All Rights Reserved.</span></div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCenter: this.$store.state.userCenter,

      nav: [{
        id: 0,
        name: '主页',
        class: 'nav-home',
        path: 'Home',
        select: true,
      }, {
        id: 1,
        name: '相册',
        class: 'nav-pic',
        path: 'Album',
        select: false
      }, {
        id: 2,
        name: '收藏',
        class: 'nav-clt',
        path: 'Collection',
        select: false
      }, {
        id: 3,
        name: '设置',
        class: 'nav-set',
        path: 'Setting',
        select: false
      }],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    changeNav(index) {
      let arr = this.nav
      if (arr[index].selected) return

      for (let i = 0; i < arr.length; i++)
        arr[i].selected = false
      arr[index].selected = true

      this.$store.commit('setUserCenter', { recNavId: arr[index].id })
      this.$store.commit('setLocalStorage')
    },





    login() {

    },
    register() {

    }
  }
}
</script>

<style lang="css" scoped>
.user-center-wrapper {
  height: 100%;
  width: 100%;
  min-width: 360px;
  padding: 60px 7% 10px 7%;
  background: #f5f4f5;
  box-sizing: border-box;
}

/* head */
.head {
  width: 100%;
  min-width: 960px;
  height: 300px;
  background: white;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.head-bg {
  position: relative;
  width: 100%;
  height: 240px;
  background: url(../assets/imgs/usercenter_bg.png) center center no-repeat;
  background-size: cover;
}
.user-bar-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 86px;
  width: 100%;
  padding: 0 20px 16px 20px;
  background: url(../assets/imgs/user_mask.png);
  box-sizing: border-box;
}
.avatar-wrapper {
  float: left;
  width: 70px;
  height: 70px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 35px;
  box-sizing: border-box;
  overflow: hidden;
}
.avatar {
  width: 100%;
}
.user-info {
  float: left;
  height: 54px;
  width: 65%;
  margin: 8px 0 8px 20px;
  box-sizing: border-box;
}
.user-info-line {
  height: 27px;
  line-height: 27px;
  width: 100%;
  box-sizing: border-box;
}
.user-name {
  font-family: "PingFang BD";
  color: white;
  font-size: 20px;
  vertical-align: top;
}
.user-sign {
  font-family: "PingFang";
  color: #d6d6d6;
  font-size: 13px;
  vertical-align: baseline;
}

.nav-wrapper {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 14px;
  box-sizing: border-box;
}
.nav {
  display: inline-block;
  height: 100%;
  line-height: 60px;
  margin-right: 30px;
  box-sizing: border-box;
}
.nav-active {
  border-bottom: 3px solid #00a1d6;
}
.nav .text {
  vertical-align: middle;
  transition: color 0.2s linear;
}
.nav .text:hover {
  color: #00a1d6;
}
.nav .text-active {
  color: #00a1d6;
}
.nav-home::before,
.nav-pic::before,
.nav-clt::before,
.nav-set::before {
  font-family: "iconfont";
  margin-right: 5px;
  font-size: 20px;
  vertical-align: middle;
}
.nav-home::before {
  content: "\e63f";
  color: #00c091;
}
.nav-pic::before {
  content: "\e6b2";
  color: #fb7299;
}
.nav-clt::before {
  content: "\e612";
  color: #f3a034;
}
.nav-set::before {
  content: "\e604";
  color: #23c9ed;
}

/* body */
.content {
  width: 100%;
  min-width: 960px;
  min-height: 540px;
  margin: 10px 0;
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* footer */
footer {
  font-size: 14px;
  color: rgb(156, 153, 154);
  background: #f5f4f5;
}
footer .wrapper-text {
  margin: 0 50px;
  padding: 20px 0;
  /* border-top: 1px solid rgb(210, 210, 210); */
  text-align: center;
}
</style>
