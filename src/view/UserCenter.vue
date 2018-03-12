<template lang="html">
  <div class="user-center-wrapper">
    <topbar @login="login" @register="register"></topbar>
    <div class="head">
      <div class="head-bg"></div>
      <div class="nav-wrapper">
        <a @click="changeNav(n.id)" v-for="(n,index) in nav" :key="index">
          <div :class="['nav', {'nav-active': n.id == recNavId}]">
            <span :class="n.class"></span>
            <span :class="['text', {'text-active': n.id == recNavId}]">{{ n.name }}</span>
          </div>
        </a>
      </div>
    </div>
    <div class="content">

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
      userInfo: this.$store.state.userInfo,

      nav: [{
          id: 0,
          name: '主页',
          class: 'nav-home',
          select: true,
        },{
          id: 1,
          name: '相册',
          class: 'nav-pic',
          select: false
        },{
          id: 2,
          name: '收藏',
          class: 'nav-clt',
          select: false
        },{
          id: 3,
          name: '设置',
          class: 'nav-set',
          select: false
        }],
      recNavId: 0,
    }
  },
  activated() {
    this.$store.commit('getLocalStorage')
  },
  methods: {
    changeNav(index) {
      let arr = this.nav
      if(arr[index].selected) return

      for(let i=0;i<arr.length;i++)
        arr[i].selected = false
      arr[index].selected = true

      this.recNavId = arr[index].id

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
  height: 340px;
  background: white;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.head-bg {
  width: 100%;
  height: 280px;
  background: url(../assets/imgs/usercenter_bg.png) center center no-repeat;
  background-size: cover;
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
  transition: color .2s linear;
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
  font-family: 'iconfont';
  margin-right: 5px;
  font-size: 20px;
  vertical-align: middle;
}
.nav-home::before {
  content: '\e63f';
  color: #00c091;
}
.nav-pic::before {
  content: '\e6b2';
  color: #fb7299;
}
.nav-clt::before {
  content: '\e612';
  color: #f3a034;
}
.nav-set::before {
  content: '\e604';
  color: #23c9ed;
}

/* body */
.content {
  width: 100%;
  min-height: 600px;
  margin: 10px 0;
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
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
