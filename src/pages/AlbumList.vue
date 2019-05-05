<template lang="html">
  <div>
    <div class="album-wrapper">
      <div class="title">
        <button class="upload" @click="showDialog('upload')">上传照片</button>
        <button class="new-album" @click="showDialog('newAlbum')">新建相册</button>
      </div>
      <div :class="['content-wrapper', {'no-album': albumList.length == 0}]">
        <div class="album-item-wrapper" v-for="(a,index) in albumList" :key="index">
          <div class="album-item" @click="toPicList(index)">
            <div class="cover-wrapper">
              <div class="cover" :style="`background: url(${a.album_cover})`"></div>
            </div>
            <div class="title-wrapper" :title="a.album_name">{{a.album_name}}</div>
          </div>
        </div>
      </div>
    </div>

    <shade @closeShade="closeDialog" v-if="uploadDialog || newAlbumDialog"></shade>
    <upload @closeDialog="closeDialog" @newAlbum="showDialog('newAlbum')" @uploadSuc="" :albumList="albumList" :isInAlbumList="true" v-if="uploadDialog"></upload>
    <newalbum @closeDialog="closeDialog" @suc="getAlbumList()" :isNew="true"
              v-if="newAlbumDialog"></newalbum>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: this.$store.state.userInfo,

      albumList: [],
      uploadDialog: false,
      newAlbumDialog: false
    }
  },
  mounted() {
    // this.getAlbumList()
  },
  activated() {
    this.getAlbumList()
  },
  methods: {
    getAlbumList() {
      tools.loading()
      this.$store.dispatch('getAlbumList').then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          this.newImg(i, data[i].album_cover)
          data[i].album_cover = 'static/img/loading.gif'
        }
        this.albumList = data
        console.log(data);
      }).catch(() => {
        tools.info('获取相册失败，请刷新后重试', 'error');
      }).finally(() => {
        tools.loading(false);
      });
    },

    newImg(i, url) {
      let img = new Image()
      img.src = url ? 'http://localhost:4200' + url : 'static/img/default.jpg'
      // img.src = url || 'static/img/default.jpg'
      img.onerror = () => {
        this.albumList[i].album_cover = 'static/img/error.jpg'
      }
      img.onload = () => {
        this.albumList[i].album_cover = img.src
      }
    },
    toPicList(i) {
      this.$store.commit('setPhotoList', { album: this.albumList[i] });
      this.$router.push({ name: 'Photo', query: { album: this.albumList[i].album_id } });
    },
    showDialog(type) {
      tools.preventScorll()
      if (type == 'upload')
        this.uploadDialog = true
      if (type == 'newAlbum')
        this.newAlbumDialog = true
    },
    closeDialog() {
      if (this.uploadDialog && this.newAlbumDialog) {
        this.newAlbumDialog = false
      } else {
        tools.preventScorll(false)
        if (this.uploadDialog)
          this.uploadDialog = false
        if (this.newAlbumDialog)
          this.newAlbumDialog = false
      }
    },
  }
}
</script>

<style lang="css" scoped>
.album-wrapper {
  height: 100%;
  width: 100%;
  /* border-bottom: 1px solid #999; */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* title */
.title {
  height: 60px;
  width: 100%;
  line-height: 60px;
  padding: 0 20px;
  /* border-top: 1px solid rgba(0,0,0,.1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* background: rgba(0,0,0,.03); */
  box-sizing: border-box;
}
.new-album,
.upload {
  position: relative;
  top: -2px;
  height: 38px;
  width: 110px;
  margin-right: 5px;
  border: 0;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}
.upload {
  color: white;
  background: #3a8ee2;
}
.upload:hover {
  background: #3583d0;
}
.upload:active {
  background: #2c6fb1;
}
.new-album {
  font-family: "PingFang BD";
  /* font-weight: bold; */
  color: #3a8ee2;
  border: 1px solid #e0e0e0;
  background: rgb(255, 255, 255);
}
.new-album:hover {
  background: rgb(251, 251, 251);
}
.new-album:active {
  background: rgb(245, 245, 245);
}
.upload::before,
.new-album::before {
  position: relative;
  top: 1px;
  font-family: "iconfont";
  font-size: 16px;
  margin-right: 4px;
}
.upload::before {
  content: "\e665";
}
.new-album::before {
  content: "\e623";
}

/* content */
.content-wrapper {
  position: relative;
  width: 100%;
  min-height: 480px;
  padding: 5px 10px 10px 10px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.02);
  color: #aaaaaa;
}
.content-wrapper::after {
  display: block;
  height: 0;
  content: " ";
  visibility: hidden;
  clear: both;
}
.no-album::before {
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: "PingFang";
  content: "你还没有相册，赶紧创建一个吧！";
  font-size: 30px;
  color: #c6c6c6;
  transform: translateX(-50%) translateY(-70%);
}
.album-item-wrapper {
  position: relative;
  float: left;
  border: 10px solid transparent;
  box-sizing: border-box;
}
.album-item-wrapper::after {
  content: "";
  height: 0;
  display: block;
  margin-top: 100%;
}
.album-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  cursor: pointer;
}
@media screen and (min-width: 1366px) {
  .album-item-wrapper {
    width: 25%;
  }
}
@media screen and (max-width: 1365px) {
  .album-item-wrapper {
    width: 33.3333%;
  }
}
.cover-wrapper {
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 50px);
  max-width: calc(100% - 10px);
  max-height: calc(100% - 50px);
  text-align: center;
}
.cover {
  height: 100%;
  width: 100%;
  background-position: center center !important;
  background-size: cover !important;
}
.title-wrapper {
  position: absolute;
  bottom: 3px;
  left: 5px;
  height: 40px;
  width: calc(100% - 10px);
  padding: 0 20px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}
</style>
