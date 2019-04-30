<template lang="html">
  <div>
    <shade @closeShade="closeDialog" v-if="transIn"></shade>
    <!-- <div :class="['dialog-mask', {'dialog-mask-in': transIn}]" @click="closeDialog"></div> -->
    <div :class="['dialog', {'dialog-in': transIn}]">
      <div class="wrapper-content">
        <div class="content-head">
          <div class="close-wrapper" @click="closeDialog"><i class="iconfont icon-close"></i></div>
          <div class="logo"></div>
          <div class="slogan">
            <span>{{ info[recent].slogan }}</span>
          </div>
        </div>
        <div class="content-body">
          <div class="model-wrapper">
            <div id="uname" class="input-hint">{{ info[recent].unameHint }}</div>
            <input class="input-normal" type="text" v-model="uname"
                   @focus="onInput('name')" @keydown="keydown('name')"/>
          </div>
          <div class="model-wrapper">
            <div id="upsd" class="input-hint">{{ info[recent].upsdHint }}</div>
            <input class="input-normal" type="password" v-model="upsd"
                   @focus="onInput('psd')" @keyup.enter="recent == 0 && submit()"/>
          </div>
          <div :class="['model-wrapper', {'model-wrapper-hidden': recent == 0}]">
            <div id="urpsd" class="input-hint">确认密码</div>
            <input class="input-normal" type="password" v-model="urpsd"
                   @focus="onInput('rpsd')"/>
          </div>
          <div :class="['model-wrapper', {'model-wrapper-hidden': recent == 0}]">
            <div id="uemail" class="input-hint">邮箱</div>
            <input class="input-normal" type="text" v-model="uemail"
                   @focus="onInput('email')" @keydown="keydown('email')"/>
          </div>
          <div class="model-wrapper find-psd-warpper">
            <a :class="['find-psd', {'find-psd-hidden': recent == 1}]" @click="">忘记密码？</a>
          </div>
          <div class="model-wrapper button-wrapper"><button class="button-type" :disabled="inLogin"
               @click="submit">{{ info[recent].submit }}</button></div>
        </div>
        <div class="content-footer">
            <span>{{ info[recent].tip }}</span>
            <a @click="funcTrans(recent)">{{ info[recent].to }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      transIn: false,

      recent: this.prop, //0-login, 1-register
      info: [{
        slogan: '登录OA，管理和分享图片',
        unameHint: '用户名或邮箱',
        upsdHint: '密码',
        submit: '登录',
        tip: '没有账号？',
        to: '注册',
      }, {
        slogan: '注册OA，管理和分享图片',
        unameHint: '用户名',
        upsdHint: '密码（字母开头，长度在6~18之间）',
        submit: '注册',
        tip: '已有账号？',
        to: '登录',
      }],

      uname: '',
      upsd: '',
      urpsd: '',
      //ugender: 0,
      //usign: '',
      uemail: '',

      inLogin: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.transIn = true
    }, 100)
  },
  watch: {
    uname(val) {
      let uname = $('#uname')
      if (val == '') {
        uname.removeClass('input-error')
        uname.text(this.info[this.recent].unameHint)
      } else {
        uname.text('')
      }
    },
    upsd(val) {
      let upsd = $('#upsd')
      if (val == '') {
        upsd.removeClass('input-error')
        upsd.text(this.info[this.recent].upsdHint)
      } else {
        upsd.text('')
      }
    },
    urpsd(val) {
      let urpsd = $('#urpsd')
      if (val == '') {
        urpsd.removeClass('input-error')
        urpsd.text('确认密码')
      } else {
        urpsd.text('')
      }
    },
    uemail(val) {
      let uemail = $('#uemail')
      if (val == '') {
        uemail.removeClass('input-error')
        uemail.text('邮箱')
      } else {
        uemail.text('')
      }
    },
  },
  methods: {
    onInput(type) {
      if (type == 'name') {
        let name = $('#uname')
        name.next().removeClass('input-error-line')
        if (!this.uname) {
          name.attr('class', 'input-hint')
          name.text(this.info[this.recent].unameHint)
        }
      }
      if (type == 'psd') {
        let psd = $('#upsd')
        psd.next().removeClass('input-error-line')
        if (!this.upsd) {
          psd.attr('class', 'input-hint')
          psd.text(this.info[this.recent].upsdHint)
        }
      }
      if (type == 'rpsd') {
        let rpsd = $('#urpsd')
        rpsd.next().removeClass('input-error-line')
        if (!this.urpsd) {
          rpsd.attr('class', 'input-hint')
          rpsd.text('确认密码')
        }
      }
      if (type == 'email') {
        let email = $('#uemail')
        email.next().removeClass('input-error-line')
        if (!this.uemail) {
          email.attr('class', 'input-hint')
          email.text('邮箱')
        }
      }
    },
    keydown(type) {
      if (event.keyCode == 229) {
        if (type == 'name' && !this.uname) {
          $('#uname').text('')
        }
        if (type == 'email' && !this.uemail)
          $('#uemail').text('')
      }
    },
    onsubmit(type) {
      let bool = true
      if (!this.uname) {
        let uname = $('#uname')
        uname.addClass('input-error')
        uname.text('请输入' + this.info[this.recent].unameHint)
        bool = false
      }
      if (!this.upsd) {
        let upsd = $('#upsd')
        upsd.addClass('input-error')
        upsd.text('请输入密码')
        bool = false
      }
      if (!this.urpsd && type == 'register') {
        let urpsd = $('#urpsd')
        urpsd.addClass('input-error')
        urpsd.text('请输入确认密码')
        bool = false
      }
      if (!this.uemail && type == 'register') {
        let uemail = $('#uemail')
        uemail.addClass('input-error')
        uemail.text('请输入邮箱')
        bool = false
      }
      return bool;
    },
    funcTrans(to) {
      let uname = $('#uname')
      let upsd = $('#upsd')
      let urpsd = $('#urpsd')
      let uemail = $('#uemail')
      if (to == 0) {
        this.recent = 1
        uname.removeClass('input-error')
        uname.text(this.info[this.recent].unameHint)
        uname.next().removeClass('input-error-line')
        upsd.removeClass('input-error')
        upsd.text('密码')
        upsd.next().removeClass('input-error-line')
        this.uname = ''
        this.upsd = ''
      }
      if (to == 1) {
        this.recent = 0;
        uname.removeClass('input-error')
        uname.text(this.info[this.recent].unameHint)
        uname.next().removeClass('input-error-line')
        upsd.removeClass('input-error')
        upsd.text('密码')
        upsd.next().removeClass('input-error-line')
        urpsd.removeClass('input-error')
        urpsd.text('确认密码')
        urpsd.next().removeClass('input-error-line')
        uemail.removeClass('input-error')
        uemail.text('邮箱')
        uemail.next().removeClass('input-error-line')
        this.uname = ''
        this.upsd = ''
      }
    },


    // function funcs
    closeDialog() {
      this.$emit('closeDialog')
    },
    submit() {
      if (this.recent == 0) {
        this.login()
      } else {
        this.register()
      }
    },

    login() {
      if (!this.onsubmit()) return
      if (!(validate.ckName(this.uname) || validate.ckEmail(this.uname))) {
        $('#uname').next().addClass('input-error-line')
        return tools.info('用户名或邮箱格式错误', 'error')
      }

      tools.loading();
      this.inLogin = true
      setTimeout(() => { this.inLogin = false }, 10000)

      this.$store.dispatch('userLogin', {
        uname: this.uname,
        upsd: this.upsd
      }).then(() => {
        this.closeDialog();
        tools.info('登录成功', 'success');
      }).catch(() => {
        this.inLogin = false;
        tools.info('用户名或密码错误', 'error')
        $('#uname').next().addClass('input-error-line')
        $('#upsd').next().addClass('input-error-line')
      }).finally(() => {
        tools.loading(false);
      });
    },
    register() {
      if (!this.onsubmit('register')) return
      if (this.upsd != this.urpsd) return

      tools.loading();
      this.inLogin = true
      setTimeout(() => { this.inLogin = false }, 10000)

      this.$store.dispatch('userRegister', {
        uname: this.uname,
        upsd: this.upsd,
        uemail: this.uemail
      }).then(() => {
        tools.info('注册成功！请登录', 'success');
        this.closeDialog();
      }).catch((res) => {
        this.inLogin = false;
        tools.info(res.msg, 'error');
      }).finally(() => {
        tools.loading(false);
      });

    }
  }
}
</script>

<style lang="css" scoped>
::-webkit-scrollbar {
  display: none;
}

.dialog {
  position: fixed;
  top: 45%;
  left: 50%;
  width: 420px;
  max-height: calc(100vh - 24px * 2);
  background: #fff;
  border-radius: 3px;
  overflow-y: auto;
  transform: translateX(-50%) translateY(-50%);
  transition: all 0.3s ease;
  opacity: 0;
  z-index: 4;
}
.dialog-in {
  top: 50%;
  opacity: 1;
}
.close-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  margin: 8px;
  line-height: 16px;
  color: rgb(157, 157, 157);
  cursor: pointer;
}
.icon-guanbi {
  font-size: 16px;
}
.wrapper-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

/* head */
.content-head {
  width: 100%;
  height: 160px;
  text-align: center;
}
.logo {
  width: 100%;
  height: 120px;
  background: url(../assets/imgs/logo2.png) center center no-repeat;
  background-size: 200px;
}
.slogan {
  font-size: 22px;
  color: #0084ff;
}

/* body */
.content-body {
  width: 100%;
  padding: 0 40px 40px 40px;
  box-sizing: border-box;
  transition: all 0.2s linear;
}
.model-wrapper {
  position: relative;
  width: 100%;
  height: 45px;
  margin-top: 12px;
  font-size: 14px;
  transition: all 0.2s linear;
}
.model-wrapper-hidden {
  overflow: hidden;
  height: 0;
  margin: 0;
}
.button-wrapper {
  height: 40px;
}
.input-normal,
.button-type {
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  outline: none;
  background: transparent;
}
.input-hint {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 45px;
  text-align: left;
  color: #a1a1a1;
  transition: all 0.3s ease;
  z-index: -1;
}
.input-error {
  color: red;
}
.button-type {
  border-radius: 3px;
  cursor: pointer;
  color: white;
  background: #0084ff;
  font-size: 14px;
}
.button-type:hover {
  background: rgba(0, 126, 243, 1);
}
.button-type:active {
  background: rgba(0, 116, 224, 1);
}
.input-error-line {
  border-bottom: 1px solid red;
}
.find-psd-warpper {
  padding-top: 5px;
  height: 35px;
  text-align: right;
  color: rgb(161, 161, 161);
}
.find-psd:hover {
  color: rgb(121, 121, 121);
}
.find-psd-hidden {
  visibility: hidden;
}

/* footer */
.content-footer {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #ebebeb;
  text-align: center;
  font-size: 16px;
  background: #f6f6f6;
}
.content-footer a {
  color: #0084ff;
}
</style>
