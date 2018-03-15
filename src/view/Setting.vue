<template lang="html">
  <div>
    <div class="setting-wrapper">
      <h3>个人设置</h3>
      <div class="input-wrapper">
        <span class="name">昵称</span>
        <input type="text" :value="userInfo.uname" disabled/>
      </div>
      <div class="input-wrapper">
        <span class="name">性别</span>
        <div class="gender-wrapper">
          <input class="gender-input" v-model="gender"/>
          <a class="gender-select" @click="showGender()"></a>
          <div class="gender-list" v-if="showgender">
            <a class="gender" @click="showGender(0)">男</a>
            <a class="gender" @click="showGender(1)">女</a>
          </div>
        </div>
      </div>
      <div class="input-wrapper">
        <span class="name">邮箱</span>
        <input v-model="uemail" onkeyup="value=value.replace(/[`$'']/g, '')"/>
      </div>
      <div class="input-wrapper">
        <span class="name">个性签名</span>
        <textarea v-model="usign" onkeyup="value=value.replace(/[`$'']/g, '')"></textarea>
        <span class="gray">{{ usignlen }}/100</span>
      </div>
      <div class="input-wrapper btn-wrapper">
        <button class="btn-submit" @click="editInfo">提交</button>
      </div>
      <div class="hr"></div>
      <h3>密码设置</h3>
      <div class="input-wrapper">
        <span class="name">原密码</span>
        <input type="password" v-model="upsd"/>
      </div>
      <div class="input-wrapper">
        <span class="name">新密码</span>
        <input type="password" v-model="newupsd"/>
      </div>
      <div class="input-wrapper">
        <span class="name">再次输入</span>
        <input type="password" v-model="newrupsd"/>
      </div>
      <div class="input-wrapper btn-wrapper">
        <button class="btn-submit" @click="changePsd">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      showgender: false,

      usign: '',
      usignlen: 0,
      uemail: '',
      ugender: 0,
      gender: '',

      upsd: '',
      newupsd: '',
      newrupsd: '',

    }
  },
  activated() {
    this.getUserInfo()
  },
  watch: {
    usign(val, old){
      this.usignlen = tools.strlen(val)
      if(tools.strlen(val)>100)
        this.usign = old
    }
  },
  methods: {
    getUserInfo() {
      this.usign = this.userInfo.usignature
      this.uemail = this.userInfo.uemail
      this.ugender = this.userInfo.ugender
      this.gender = this.ugender == 0 ? '男' : '女'
    },
    showGender(i) {
      if(typeof i != 'undefined'){
        this.ugender = i
        this.gender = i == 0 ? '男' : '女'
        this.showgender = false
      } else {
        this.showgender = !this.showgender
      }
    },
    editInfo() {
      if(!validate.ckEmail(this.uemail)) return tools.info('邮箱格式错误','error')

      tools.loading();
      let vm = this
      let obj = {
        url: '/user/setUserInfo',
        args: {
          ugender: vm.ugender,
          uemail: vm.uemail,
          usignature: vm.usign
        },
        success: function(res) {
          vm.$store.commit('setUserInfo',{
            uemail: vm.uemail,
            ugender: vm.ugender,
            usignature: vm.usign
          })
          tools.info('修改成功','success')
        },
        error: function(res) {
          tools.info('修改失败','error')
        },
        asy: true
      }
      Ajax(obj)
    },
    changePsd() {
      if(!this.upsd) return tools.info('原密码不能为空','error')
      if(this.newupsd !== this.newrupsd) return tools.info('新密码重复输入不一致','error')

      tools.loading();
      let vm = this
      let obj = {
        url: '/user/setUserPsd',
        args: {
          upsd: vm.upsd,
          newupsd: vm.newupsd
        },
        success: function(res) {
          tools.info('修改成功，请重新登录','success')
          localStorage.state = null
          setTimeout(()=>{
            window.location.reload()
          },100)
        },
        error: function(res) {
          tools.info('修改失败，请检查原密码是否正确','error')
        },
        asy: true
      }
      Ajax(obj)
    }
  }
}
</script>

<style scoped>
.setting-wrapper {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
h3 {
  font-family: 'PingFang MD';
  font-weight: 500;
  margin: 0;
  margin-bottom: 20px;
}
.input-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: 80px 200px 80px;
  width: 100%;
  min-height: 30px;
  line-height: 30px;
  margin-top: 10px;
  font-size: 14px;

}
.input-wrapper .name {
  text-align: left;
  padding-right: 10px;
}
.input-wrapper .gray {
  color: #a8a8a8;
  padding-left: 10px;
}
.input-wrapper input {
  padding: 0 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.input-wrapper textarea {
  height: 60px;
  line-height: 20px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  outline: none;
  resize: none;
}
.gender-wrapper {
  position: relative;
  width: 80px;
  box-sizing: border-box;
}
.gender-input {
  width: 80px;
  height: 30px;
  padding-left: 25px !important;
  box-sizing: border-box;
}
.gender-select {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 30px;
  box-sizing: border-box;
}
.gender-select::after {
  position: absolute;
  top: 0;
  right: 5px;
  font-family: 'iconfont';
  content: '\e74a'
}
.gender-list {
  position: absolute;
  top: 30px;
  left: 0;
  width: 80px;
  background: white;
  padding: 4px 0;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  z-index: 1
}
.gender {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 25px;
  box-sizing: border-box;
}
.gender:hover {
  background: rgba(0,0,0,.05)
}
.btn-wrapper {
  display: block;
  width: 280px;
  line-height: 30px;
  margin-top: 10px;
  font-size: 14px;
  text-align: right;
}
.btn-submit {
  font-family: 'PingFang';
  height: 26px;
  margin: 2px 0;
  width: 46px;
  border-radius: 3px;
  font-size: 14px;
  text-align: center;
  color: white;
  background: #3a8ee2;
  box-sizing: border-box;
}
.btn-submit:hover {
  background: #3583d0
}
.btn-submit:active {
  background: #2c6fb1
}
.hr {
  width: 100%;
  height: 0;
  margin: 10px 0 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
