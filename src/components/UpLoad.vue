<template lang="html">
  <div>
    <div :class="['upload-wrapper', {'upload-wrapper-in': transIn}]">
      <div class="title"><span>上传图片</span><i class="iconfont icon-close" @click="closeDialog"></i></div>
      <div class="content">
        <div class="album-title">
          <span>选择相册</span>
          <i class="iconfont icon-add-circle-fill" title="新建相册" @click="newAlbum" v-if="isInAlbumList"></i>
        </div>
        <div class="album-list-wrapper">
          <div class="album-list">
            <div v-for="(i,index) in albumList" :class="['item', {'item-selected': i.aid == selected.aid }]"
                 @click="select(index)" :key="index" :title="i.aname"
                 >{{ i.aname }}
                 <div class="num">{{ i.picNum }}</div>
            </div>
          </div>
        </div>
        <div class="upload-area-title">
          <div v-if="albumList.length != 0">
            <span>上传{{ pic.length }}张图片到</span><span class="album-name" :title="selected.adescribe">{{ selected.aname }}</span>
            <span class="gray">创建日期：{{ selected.acreateTime }}</span>
          </div>
          <span v-else>还没有相册，先新建一个吧</span>
          <div class="upload-btn-wrapper">
            <button class="btn-choose" v-if="pic.length != 0" @click="choosePic"><span>继续选择</span></button>
            <button class="btn-upload" v-if="pic.length != 0" @click="uploadPic"><span>开始上传</span></button>
          </div>
        </div>
        <div class="upload-area">
          <input id="file" type="file" multiple="multiple" v-show="false"
                 accept="image/jpeg,image/gif,image/png,image/jpg" @change="selectedPic"/>
          <button class="upload" v-if="pic.length == 0" @click="choosePic"><span>选择图片</span></button>
          <div class="pic-border" v-for="(p,index) in pic" :key="index" v-show="!p.del">
            <div class="pic-wrapper">
              <div class="pic-item" @mouseover="showPicBar(true,index)" @mouseleave="showPicBar(false,index)">
                <img :src="p.url"/>
                <div :class="['mask', {'mask-in': showBar.show && index == showBar.index && !isInUpload}]">
                  <i class="iconfont icon-editor" @click="editPic(index)"></i>
                  <i class="iconfont icon-del" @click="delPic(index)"></i>
                </div>
              </div>
              <input class="pic-name" type="text" v-model="p.pname" :disabled="isInUpload"
              onkeyup="value=value.replace(/[^\w_\u4E00-\u9FA5]/g, '')"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['albumList', 'isInAlbumList'],
  data() {
    return {
      transIn: false,
      selected: '',  //选中的相册
      pic: [],  //待上传图片
      showBar: {   //图片菜单栏
        show: false,
        index: 0
      },
      isInUpload: false

    }
  },
  mounted() {
    setTimeout(()=>{
      this.transIn = true
    },100)
    this.selected = this.albumList[0]
  },
  computed: {

  },
  watch: {
    albumList(val) {
      this.selected = val[0]
    }
  },
  methods: {
    newAlbum() {
      this.$emit('newAlbum')
    },
    select(index) {
      this.selected = this.albumList[index]
    },
    choosePic() {
      $('#file').click()
    },
    selectedPic() {
      let obj = document.getElementById("file").files
      if(obj.length == 0) return
      for(let i=0;i<obj.length;i++) {
        if(this.checkPic(obj[i])){
          obj[i].url = this.getImgUrl(obj[i])
          obj[i].pname = obj[i].name.toLowerCase().replace(/(.jpg)|(.jpeg)|(.png)|(.gif)/g,'')
          this.pic.push(obj[i])
        }
      }
      tools.info('图片已添加','success')
    },
    getImgUrl(obj) {
      let imgURL = ""
      if(window.createObjectURL != undefined){
        imgURL = window.createObjectURL(obj)  //basic
      }else if(window.URL != undefined){
        imgURL = window.URL.createObjectURL(obj)
      }else if(window.webkitURL != undefined){
        imgURL = window.webkitURL.createObjectURL(obj)
      }
      return imgURL
    },
    checkPic(obj) {
      let pic = this.pic
      let bool = true
      if(pic.length == 0) return bool
      for(let i=0;i<pic.length;i++){
        if(pic[i].name == obj.name && pic[i].size == obj.size){
          bool = false
        }
      }
      return bool
    },
    showPicBar(type, i) {
      if(type){
        this.showBar.show = true
        this.showBar.index = i
      } else {
        this.showBar.show = false
      }
    },
    delPic(i) {
      this.pic.splice(i,1)
    },
    editPic(i) {

    },
    uploadPic(img) {
      this.isInUpload = true
      let count = this.pic.length
      let i = 0
      let vm = this
      console.log(vm.pic);
      push()

      function push() {
        console.log(i);
        let obj = {
          url: '/picture/uploadPicture',
          args: {
            pname: vm.pic[i].pname,
            img: vm.pic[i],
            aid: vm.selected.aid
          },
          success: function(res) {
            if(++i < count) {
              push()
            }
            else {
              vm.$emit('uploadSuc')
              tools.info('上传完成', 'success')
              vm.closeDialog()
            }
          },
          error: function(res) {
            tools.info(res.msg, 'error')
            console.log('error');
            if(++i < count) push()
            else {
              vm.closeDialog()
              tools.info('上传完成', 'success')
              vm.$emit('uploadSuc')
            }
          },
          asy: true
        }
        Ajax(obj)
      }
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  /* display: none; */
   width: 8px;
   height: 8px
}
::-webkit-scrollbar-track-piece {
   background-color: transparent
}
::-webkit-scrollbar-thumb {
   border-radius: 9px;
   background-color: rgba(195, 195, 195, 0.3)
}
::-webkit-scrollbar-thumb:hover {
   background-color: rgba(126, 126, 126, 0.6)
}

.upload-wrapper {
  position: fixed;
  top:45%;
  left:50%;
  min-width: 720px;
  min-height: 360px;
  width: 1366px;
  height: 768px;
  max-width: calc(100vw - 24px * 2);
  max-height: calc(100vh - 36px * 2);
  transform:translateX(-50%) translateY(-50%);
  font-family: 'PingFang MD';
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: all .3s ease;
  opacity: 0;
  z-index: 4;
}
.upload-wrapper-in {
  top:50%;
  opacity: 1;
}

/* title */
.title {
  position: relative;
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding: 0 15px;
  border-radius: 3px 3px 0 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;
  color: #4C4C4C;
  box-sizing: border-box;
}
.title i {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'iconfont';
  content: '\e625';
  font-size: 14px;
  color: #a3a2a2;
  cursor: pointer;
}

/* content */
.content {
  position: relative;
  display: grid;
  width: 100%;
  /* min-height: 280px; */
  /* height: 460px; */
  height: calc(100% - 40px);
  grid-template-columns: 160px auto;
  grid-template-rows: 50px calc(100% - 50px);
  grid-template-areas: 'choose info' 'list upload';
  font-size: 15px;
}

/* area-1 */
.album-title {
  position: relative;
  grid-area: choose;
  /* top: 0px; */
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #FFF;
  color: #999;
  font-size: 15px;
  box-sizing: border-box;
}
.album-title span {
  position: relative;
  top: -1px;
}
.album-title i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #b1b1b1;
  cursor: pointer;
}
.album-title i:hover {
  color: #9a9a9a;
}

/* area-3 */
.album-list-wrapper {
  grid-area: list;
  width: 100%;
  height: 100%;
  /* min-height: 280px; */
  max-height: 678px;
  /* padding: 0  */
  /* background: rgba(0, 0, 0, 0.03); */
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow-y: auto;
}

.album-list {
  width: 100%;
  /* height: 100%; */
}
.album-list .item {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 45px 0 15px;
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  cursor: pointer;
}
.album-list .item:hover {
  background: rgba(0,0,0,.03)
}
.album-list .item-selected,
.album-list .item-selected:hover {
  color: white;
  background: #3a8ee2
}
.album-list .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 100%;
  padding-right: 5px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* area-2 */
.upload-area-title {
  position: relative;
  grid-area: info;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  white-space: nowrap;
}
.upload-area-title span {
  display: inline-block;
  vertical-align: top;
}
.upload-area-title .album-name {
  color: #3a8ee2;
  white-space: nowrap;
  max-width: 14%;
  text-overflow: ellipsis;
  overflow: hidden;
  /* cursor: pointer; */
}
.upload-area-title .gray {
  color: #bfbfbf
}
.upload-btn-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 0 10px;
}
.btn-choose,
.btn-upload {
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-left: 5px;
  border-radius: 3px;
  /* font-size: 18px; */
  box-sizing: border-box;
}
.btn-choose {
  border: 1px solid #e0e0e0;
  background: rgb(255,255,255)
}
.btn-choose:hover {
  background: rgb(245,245,245)
}
.btn-upload {
  border: 1px solid #5caae6;
  background: #5caae6;
  color: white;
}
.btn-upload:hover {
  background: #559cd4;
}


/* area-4 */
.upload-area {
  position: relative;
  grid-area: upload;
  width: 100%;
  height: 100%;
  /* min-height: 280px; */
  max-height: 678px;
  padding: 5px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow: auto;
}
.upload-area::after {
  content: ' ';
  display: block;
  visibility:hidden;
  height: 0;
  line-height: 0;
  clear: both;
}
.upload {
  position: absolute;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
  height: 50px;
  padding: 0 40px;
  border-radius: 2px;
  background: #5caae6;
  font-size: 18px;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.upload:hover {
  background: #559cd4;
}
.upload::before {
  position: relative;
  top: 2px;
  font-family: 'iconfont';
  content: '\e639';
  font-size: 30px;
  margin-right: 10px;
}
.upload span {
  position: relative;
  top: -3px;
}


.pic-border {
  float: left;
  min-width: 200px;
  border: 5px solid transparent;
  box-sizing: border-box;
}
@media screen and (min-width: 1280px) { /* vw >= 1080px */
  .pic-border {
    width: 25%;
    height: 200px
  }
}
@media screen and (min-width: 960px) and (max-width: 1279px) {
  .pic-border {
    width: 33.33333%;
    height: 180px
  }
}
@media screen and (max-width: 959px) {
  .pic-border {
    width: 50%;
    height: 200px
  }
}
.pic-wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
}
.pic-wrapper .pic-item {
  position: relative;
  width: 100%;
  height: calc(100% - 30px);
  text-align: center;
}
.pic-wrapper .mask {
  position: absolute;
  top: -31px;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  color: white;
  text-align: right;
  background: rgba(0,0,0,.3);
  transition: top .1s ease-in;
  box-sizing: border-box;
  /* z-index: 6 */
}
.pic-wrapper .mask-in {
  top: 0;
}
.icon-editor {
  position: relative;
  top: 1px;
  font-size: 18px
}
.icon-editor,
.icon-del {
  cursor: pointer;
}
.pic-wrapper img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100%;
  max-width: 100%;
  background-size: contain;
}
.pic-wrapper .pic-name {
  height: 30px;
  width: 100%;
  padding: 0 5px;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

</style>
