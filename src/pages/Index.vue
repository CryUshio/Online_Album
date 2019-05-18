<template>
  <div>
    <div class="background">
      <topbar
        :class="['topbar',{'topbar-hidden': topbarHide}]"
        @login="login"
        @register="register"
      ></topbar>
      <div class="head"></div>
      <div :class="['content', {'content-loading': isloading }]">
        <div class="content-title">
          <span>所有图片</span>
          <div class="wrapper-nav">
            <a
              :class="['wrapper-nav-normal', {'wrapper-nav-selected': item.selected}]"
              :key="index"
              @click="changeClassification(index)"
              v-for="(item,index) in classification"
            >{{ item.name }}</a>
          </div>
        </div>
        <div class="waterfall-wrapper">
          <waterfall
            :key="index"
            :lid="n.id"
            :ref="`waterfall_${index}`"
            v-for="(n,index) in classification"
            v-if="n.id == recClassId"
          ></waterfall>
        </div>
      </div>
      <div
        :class="['backTop-wrapper', {'backTop-wrapper-in': showBackTop}]"
        @click="backTop"
      >
        <div class="backTop"></div>
      </div>
      <footer>
        <div class="wrapper-text">
          <span>Copyright © 2018 OA.All Rights Reserved.</span>
        </div>
      </footer>
    </div>

    <login :prop="dialogType" @closeDialog="closeDialog" v-if="dialog"></login>
  </div>
</template>

<script>
import RE_REPORT from 'report';
export default {
  data() {
    return {
      topbarHide: false,
      scrollTopOld: 0,
      showBackTop: false,
      isloading: false,

      classification: [{
        id: -1,
        name: '全部',
        selected: true
      }, {
        id: 1001,
        name: '自然',
        selected: false
      }, {
        id: 1002,
        name: '人物',
        selected: false
      }, {
        id: 1003,
        name: '动漫',
        selected: false
      }, {
        id: 1004,
        name: '美食',
        selected: false
      }],
      recClassId: -1,

      dialog: false,
      dialogType: 0,

      imgsArr: [],
      len: 0,

      scrollTrigger: true
    }
  },
  mounted() {
    RE_REPORT.init({
      appId: 10013,
      delay: 2000,
      repeat_timeout: 0,
      reportUrl: 'http://127.0.0.1:3600/interface/report'
    });
    RE_REPORT.report({
      actionId: 'uv',
    });
    for(let i = 0; i < 5; i++) {
      RE_REPORT.report({
        actionId: 'index_home_click',
      });
    }
    for(let i = 0; i < 12; i++) {
      RE_REPORT.report({
        actionId: 'pic_pv',
      });
    }
    for(let i = 0; i < 3; i++) {
      RE_REPORT.report({
        actionId: 'home_pv',
      });
    }
    for(let i = 0; i < 7; i++) {
      RE_REPORT.report({
        actionId: 'index_pv',
      });
    }
    for(let i = 0; i < 3; i++) {
      RE_REPORT.report({
        actionId: 'album_pv',
      });
    }

    this.initPicBox()
  },
  activated() {
    this.scrollLoad()
    this.$store.commit('setUserCenter', { recNavId: 0 })
  },
  beforeDestory() {
    window.removeEventListener('scroll', ()=>{
      this.scorllLoading()
    });
  },
  methods: {
    initPicBox() {
      window.addEventListener('scroll', () => {
        this.scorllLoading()
      });
    },
    addpic() {
      this.len += this.imgsArr.length
      switch (this.recClassId) {
        case -1:
          this.$refs.waterfall_0[0].addPicBox(this.imgsArr)
          break
        case 1001:
          this.$refs.waterfall_1[0].addPicBox(this.imgsArr)
          break
        case 1002:
          this.$refs.waterfall_2[0].addPicBox(this.imgsArr)
          break
        case 1003:
          this.$refs.waterfall_3[0].addPicBox(this.imgsArr)
          break
        case 1004:
          this.$refs.waterfall_4[0].addPicBox(this.imgsArr)
          break
      }
      this.imgsArr = []
    },
    changeClassification(index) {
      let arr = this.classification
      if (arr[index].selected) return

      for (let i = 0; i < arr.length; i++)
        arr[i].selected = false
      arr[index].selected = true

      this.len = 0
      this.recClassId = arr[index].id
      setTimeout(() => {
        this.scrollLoad()
      }, 100)
    },
    scorllLoading() {
      const scrollTop = $(window).scrollTop();

      const height = $(window).height();
      if ((scrollTop + height * 1.5) >= $(document).height()) {
        if (this.scrollTrigger && this.scrollTopOld < scrollTop) {
          this.scrollLoad()
        }
      }

      if (scrollTop - this.scrollTopOld > 0) {
        this.topbarHide = true
      } else {
        this.topbarHide = false
      }

      this.scrollTopOld = scrollTop;


      if (scrollTop > height * 2) {
        this.showBackTop = true
      } else {
        this.showBackTop = false
      }
    },
    scrollLoad() {
      this.imgsArr = []
      this.isloading = true

      this.scrollTrigger = false
      this.$store.dispatch('getPicList', {
        'label': this.recClassId,
        'len': this.len
      })
        .then((res) => {
          setTimeout(() => {
            this.scrollTrigger = true
          }, 600);
          if (res.data.length == 0) return;
          this.imgsArr = res.data;
          this.addpic()
        })
        .catch(() => { })
        .finally(() => {
          this.isloading = false
        })
    },
    backTop(time) {
      $('html').animate({ scrollTop: 0 }, 500);
    },

    //function funcs
    login() {
      this.dialog = true;
      this.dialogType = 0;
      tools.preventScorll();
    },

    register() {
      this.dialog = true;
      this.dialogType = 1;
      tools.preventScorll();
    },


    closeDialog() {
      this.dialog = false;
      tools.preventScorll(false);
    },

    getPhotoList() {

    }

  }
}
</script>

<style scoped>
.background {
  height: 100%;
  width: 100%;
  min-width: 1100px;
  background: url(../assets/imgs/bg.jpg) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

/* head */
.head {
  position: relative;
  height: 600px;
  width: 100%;
  min-width: 360px;
  border: 0;
  text-align: center;
  /* background: transparent; */
  background: url(../assets/imgs/logo.png) center center no-repeat;
  background-size: 300px;

  box-sizing: border-box;
  -webkit-user-select: none;
  user-select: none;
}
.topbar {
  top: 0;
  transition: top 0.3s ease-out;
}
.topbar-hidden {
  top: -63px !important;
}
/* .wrapper-topbar {
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
  background: transparent;
  color: white;
}
.wrapper-topbar-user {
  position: absolute;
  display: inline-block;
  right: 10px;
  width: auto;
  margin-right: 10px;
  font-family: 'PingFang';
  list-style: none;
}
.wrapper-topbar-user a {
  margin: 0 5px;
} */

/* body */
.content {
  position: relative;
  width: 100%;
  min-width: 1100px;
  min-height: calc(100vh);
  padding: 0 7% 30px 7%;
  background: #f5f4f5;
  box-sizing: border-box;
}
.content::after,
.content-loading::after {
  display: block;
  font-family: "PingFang";
  content: "暂无更多";
  width: 100%;
  color: rgb(167, 167, 167);
  text-align: center;
  clear: both;
}
.content-loading::after {
  content: "加载中...";
}
.content-title {
  position: relative;
  height: 90px;
  padding: 30px 20px;
  line-height: 30px;
  font-size: 22px;
  box-sizing: border-box;
}
.wrapper-nav {
  position: absolute;
  top: 30px;
  right: 20px;
  width: auto;
  height: 30px;
  margin: 0;
  font-size: 18px;
}
.wrapper-nav-normal {
  display: inline-block;
  height: 100%;
  padding-bottom: 10px;
  margin-left: 30px;
  color: #bbbbbb;
}
.wrapper-nav-selected {
  color: black;
  border-bottom: 2px solid black;
}
.waterfall-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 10px;
}

.backTop-wrapper {
  position: fixed;
  bottom: 100px;
  right: -55px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  background: #ffffff;
  font-size: 25px;
  text-align: center;
  color: #999;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s linear;
  cursor: pointer;
}
.backTop-wrapper:hover {
  background: rgb(240, 240, 240);
}
.backTop-wrapper-in {
  right: 1%;
}
.backTop {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: 5px;
  border: 1px solid #999;
  border-radius: 20px;
  text-align: center;
  box-sizing: border-box;
}
.backTop::before {
  font-family: "iconfont";
  content: "\e64a";
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
  border-top: 1px solid rgb(210, 210, 210);
  text-align: center;
}
</style>
