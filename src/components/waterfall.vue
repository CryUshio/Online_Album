<template lang="html">
  <div class="waterfall-container">
    <div :class='`picture-box-wrapper classification-${lid}`'></div>
  </div>
</template>

<script>
export default {
  props: ['lid'],
  data() {
    return {
      init: false,
    }
  },
  mounted(){

  },
  activated(){

  },
  watch: {

  },
  methods: {
    //模拟滚动条滚动时随机添加内容
    isInit(){
      if(!this.init){
        $(".classification-" + this.lid).gridalicious({
          selector: '.picture-box',
          width: 480,
          gutter: 20,
          animate: true,
          animationOptions: {
            speed: 200,
            duration: 300,
            effect: 'fadeInOnAppear',
            queue: true,
            complete: function () {}
          }
        });
        this.init = true
      }
    },
    addPicBox(imgsArr) {
      this.isInit()

      setTimeout(()=>{
        let box = [];
        // console.log(arr);
        for(let i=0;i < imgsArr.length;i++){
          let $div = $('<div class="picture-box"></div>');
          let url = this.avartar(imgsArr[i].avartar)
          let content = `
          <img id="`+ imgsArr[i].pid +`" src="static/img/loading.gif" onerror="this.src='static/img/error.jpg'">
          <div class="pic-info-2-wrapper-2" data-pic-info-2="`+ imgsArr[i].uid +`">
            <div class="pic-info-2">
              <div class="avartar-wrapper-2"><img class="user-avartar-2" src="`+ url +`"/></div>
              <div class="user-info-2">
                <div class="user-info-2-line"><span class="user-name-2">`+ imgsArr[i].uname +`</span></div>
                <div class="user-info-2-line"><span class="user-sign-2">上传时间：`+ imgsArr[i].updateTime +`</span></div>
              </div>
            </div>
          </div>`;
          $div.append(content);
          box.push($div);
          this.newImg(imgsArr[i].pid, imgsArr[i].purl)
        }
        $(".classification-" + this.lid).gridalicious('append', box);
      },100)
    },
    newImg(pid, url) {
      let img = new Image()
      img.src = url ? 'http://localhost:6705' + url : 'static/img/default.jpg'
      // img.src = url
      img.onerror = () => {
        $('#' + pid).attr('src','static/img/error.jpg')
      }
      img.onload = () => {
        $('#' + pid).attr('src',img.src)
      }
    },
    avartar(url) {
      if(!url) return 'static/img/default_avartar.gif'
      else return ('http://localhost:6705' + url)
    },
    showInfo(bool){
      if(bool){

      }
      this.showPicInfo = bool
    }
  }
}
</script>

<style>
.picture-box-wrapper {
  width: 100%;
}
.picture-box {
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  /* background: white; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  /* padding: 10px; */
}
.pic-info-2-wrapper-2 {
  position: absolute;
  bottom: -70px;
  left: 0;
  height: calc(100% + 70px);
  width: 100%;
  box-sizing: border-box;
  transition: all .25s linear;
}
.pic-info-2-wrapper-2:hover {
  bottom: 0;
}
.pic-info-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 70px;
  line-height: 70px;
  padding-top: 20px;
  width: 100%;
  color: white;
  background: url(../assets/imgs/pic_mask.png) no-repeat;
  background-size: 100%;
  box-sizing: border-box;
}
.avartar-wrapper-2 {
  display: inline-block;
  float: left;
  height: 40px;
  width: 40px;
  margin: 0 5px 10px 10px;
  border-radius: 30px;
  overflow: hidden;
  box-sizing: border-box;
}
.user-avartar-2 {
  width: 100%;
}
.user-info-2 {
  float: left;
  height: 40px;
  width: calc(100% - 55px);
  /* margin: 8px 0 8px 20px; */
  box-sizing: border-box;
}
.user-info-2-line {
  height: 20px;
  line-height: 20px;
  width: 100%;
  box-sizing: border-box;
}
.user-name-2 {
  font-family: 'PingFang BD';
  color: white;
  font-size: 20px;
  vertical-align: top;
}
.user-sign-2 {
  font-family: 'PingFang';
  color: #d6d6d6;
  font-size: 13px;
  vertical-align: baseline;
}
</style>
