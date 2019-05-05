<template lang="html">
  <div>
    <div class="photo-wrapper">
      <div class="title">
        <!-- <button class="upload" @click="showDialog('upload')">上传照片</button> -->
        <button class="back-album" @click="backList()">返回列表</button>
      </div>
      <div class="album-detail-wrapper">
        <div class="album-wrapper" :style="`background: url(${album.album_cover})`"></div>
        <div class="album-detail">
          <div class="detail-title-wrapper">
            <span class="detail-title" :title="album.album_name">{{ album.album_name }}</span>
            <span class="detail-num">{{ photoList.length }}张/{{ format(album.create_time) }}</span>
          </div>
          <div class="op-wrapper">
            <button class="btn upload" @click="showDialog('upload')">上传照片</button>
            <button class="btn btn-multi-edit" @click="multiManage(true)">批量管理</button>
            <button class="btn btn-settings" @click="showDialog('newAlbum')" title="相册设置"></button>
          </div>
          <div class="operation" v-if="multiMa">
            <button class="btn btn-wq" @click="multiManage(false)">完成</button>
            <button class="btn btn-mv" @click="">移动到</button>
            <button class="btn btn-rm" @click="deletePic"></button>
          </div>
        </div>
      </div>
      <div :class="['content-wrapper', {'no-photo': photoList.length == 0}]">
        <div class="photo-item-wrapper" v-for="(p,index) in photoList" :key="index">
          <div :class="['photo-item', {'photo-item-select': selectList.includes(p.pic_id) }]" @click="selected(p.pic_id)">
            <div class="cover-wrapper">
              <div class="cover" :style="`background: url(${p.pic_url})`"></div>
            </div>
            <!-- <div class="title-wrapper" :title="p.pname">{{p.pname}}</div> -->
          </div>
        </div>
      </div>
    </div>

    <shade @closeShade="closeDialog" v-if="uploadDialog || newAlbumDialog"></shade>
    <upload @closeDialog="closeDialog" @newAlbum="" @uploadSuc="getPhotoList()"
            :albumList="albumList" :isInAlbumList="false" v-if="uploadDialog"></upload>
    <newalbum @closeDialog="closeDialog" @suc="getAlbumInfo()" :isNew="false"
              v-if="newAlbumDialog"></newalbum>
  </div>
</template>

<script>
import format from '@/assets/js/dateFormat.js';
export default {
  data() {
    return {
      format,
      userInfo: this.$store.state.userInfo,
      multiMa: false,
      selectList: [],

      albumList: [],
      photoList: [],
      uploadDialog: false,
      newAlbumDialog: false
    }
  },
  created() {
    if (!this.$store.state.albumInfo) {
      this.$store.dispatch('getAlbumInfo', { album_id: this.$route.query.album })
      .then((data) => {
        this.albumList.push(data);
        this.getPhotoList();
      });
    } else {
      this.albumList.push(this.$store.state.albumInfo);
      this.getPhotoList();
    }
  },
  activated() {
    this.multiMa = false
    this.selectList = []
  },
  computed: {
    album() {
      const albumInfo = this.$store.state.albumInfo;
      return albumInfo;
    }
  },
  methods: {
    getAlbumInfo() {
      this.albumList = []
      this.album = { album_id: this.$route.query.album, album_name: this.$route.query.album_name };
      this.albumList.push(this.album)
      this.$store.commit('setPhotoList', { album: this.album })
    },
    getPhotoList() {
      tools.loading()

      this.$store.dispatch('getPicList', {
        albumid: this.album.album_id,
      }).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          this.newImg(i, data[i].pic_url);
          data[i].pic_url = 'static/img/loading.gif';
        }
        this.photoList = data;
      }).catch(() => {
        tools.info('获取图片失败，请刷新后重试', 'error');
      }).finally(() => {
        tools.loading(false);
      })
    },

    newImg(i, url) {
      let img = new Image()
      img.src = 'http://localhost:4200' + url
      // img.src = url
      img.onerror = () => {
        this.photoList[i].pic_url = 'static/img/error.jpg'
      }
      img.onload = () => {
        this.photoList[i].pic_url = img.src
      }
    },
    multiManage(bool) {
      if (!this.multiMa) {
        tools.info('点击图片进行管理', 'default')
      }
      if (this.multiMa && bool) {
        this.multiMa = false;
      } else {
        this.multiMa = bool
        this.selectList = [];
      }
    },
    selected(pic_id) {
      if (!this.multiMa) return
      if (!this.selectList.includes(pic_id)) {
        this.selectList.push(pic_id);
      } else {
        const index = this.selectList.indexOf(pic_id);
        this.selectList.splice(index, 1);
      }
    },
    deletePic() {
      const arr = Object.keys(this.selectList);
      if (arr.length === 0) return tools.info('你还没有选择图片呢', 'default')
      
      tools.loading()

      this.$store.dispatch('deletePic', {
        pid: arr,
      }).then(() => {
        tools.info('删除成功', 'success')
        this.selectList = {}
        this.getPhotoList()
      }).catch(() => {
        tools.info('删除出问题了，请稍后重试..(｡•ˇ‸ˇ•｡)…', 'error')
      });
    },
    showDialog(type) {
      tools.preventScorll()
      if (type == 'upload')
        this.uploadDialog = true
      if (type == 'newAlbum')
        this.newAlbumDialog = true
    },
    closeDialog() {
      tools.preventScorll(false)
      if (this.uploadDialog)
        this.uploadDialog = false
      if (this.newAlbumDialog)
        this.newAlbumDialog = false
    },
    backList() {
      this.multiMa = false
      this.selectList = {}
      this.photoList = []
      this.$router.push({ name: 'Album' })
    }
  }
}
</script>

<style lang="css" scoped>
.photo-wrapper {
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
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* background: rgba(0,0,0,.03); */
  box-sizing: border-box;
}
.back-album {
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
.back-album {
  font-family: "PingFang BD";
  /* font-weight: bold; */
  color: #3a8ee2;
  border: 1px solid #e0e0e0;
  background: rgb(255, 255, 255);
}
.back-album:hover {
  background: rgb(251, 251, 251);
}
.back-album:active {
  background: rgb(245, 245, 245);
}
.back-album::before {
  position: relative;
  top: 1px;
  font-family: "iconfont";
  font-size: 16px;
  margin-right: 4px;
}
.back-album::before {
  content: "\e624";
}

/* detail */
.album-detail-wrapper {
  position: relative;
  height: 110px;
  width: 100%;
  min-width: 960px;
  line-height: 110px;
  padding: 20px 20px 10px 20px;
  background: rgba(0, 0, 0, 0.02);
  /* border-bottom: 1px solid rgba(0,0,0,.1); */
  box-sizing: border-box;
}
.album-wrapper {
  display: inline-block;
  height: 80px;
  width: 80px;
  border: 3px solid white;
  border-radius: 3px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  background-position: center center !important;
  background-size: cover !important;
}
.album-detail {
  position: absolute;
  top: 20px;
  height: 79px;
  width: 100%;
  padding-right: 130px;
  display: inline-grid;
  grid-template-rows: 50% 50%;
  grid-template-areas: "title title" "op vi";
  margin-left: 10px;
  box-sizing: border-box;
  /* align-items: end; */
}
.detail-title-wrapper {
  grid-area: title;
  height: 100%;
  line-height: 40px;
}
.detail-title {
  display: inline-block;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 22px;
  color: black;
}
.detail-num {
  display: inline-block;
  max-width: 240px;
  position: relative;
  top: 4px;
  padding-left: 2px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #6b6b6b;
}
.op-wrapper {
  grid-area: op;
  height: 100%;
  line-height: 40px;
}
.btn {
  height: 30px;
  /* width: 95px; */
  padding: 0 6px;
  margin-right: 5px;
  border: 0;
  border-radius: 3px;
  vertical-align: bottom;
  font-size: 15px;
  color: black;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.btn:hover {
  color: black;
  background: #f8f8f8;
}
.upload {
  color: white;
  background: #3a8ee2;
}
.upload:hover {
  color: white;
  background: #3583d0;
}
.upload:active {
  color: white;
  background: #2c6fb1;
}
.btn::before {
  position: relative;
  top: 1px;
  font-family: "iconfont";
  font-size: 16px;
  margin-right: 4px;
}
.upload::before {
  content: "\e665";
}
.btn-settings {
  /* width: 30px; */
  transition: all 0.2s linear;
}
.btn-multi-edit {
  font-family: "PingFang MD";
  color: black;
}
.btn-settings::before {
  position: relative;
  left: 2px;
  content: "\e604";
}
.btn-multi-edit::before {
  margin-left: -2px;
  margin-right: 1px;
  content: "\e66f";
}

.operation {
  grid-area: vi;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
}
.btn-wq,
.btn-mv {
}
.btn-rm {
  color: white;
  background: #ff4e2f;
}
.btn-rm:hover {
  color: white;
  background: #ed492c;
}
.btn-rm:active {
  color: white;
  background: #de4429;
}
.btn-rm::before {
  position: relative;
  left: 2px;
  content: "\e609";
}

/* content */
.content-wrapper {
  position: relative;
  width: 100%;
  min-height: 420px;
  min-width: 960px;
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
.no-photo::before {
  position: absolute;
  top: 40%;
  left: 50%;
  font-family: "PingFang";
  content: "你还没有照片，赶紧上传吧！";
  font-size: 30px;
  color: #c6c6c6;
  transform: translateX(-50%) translateY(-70%);
}

.photo-item-wrapper {
  position: relative;
  float: left;
  border: 10px solid transparent;
  box-sizing: border-box;
}
.photo-item-wrapper::after {
  content: "";
  height: 0;
  display: block;
  margin-top: 75%;
}
.photo-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: white;
  overflow: hidden;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  cursor: pointer;
}
.photo-item-select {
  top: -3px;
  left: -3px;
  box-shadow: 1px 1px 10px 3px rgba(92, 170, 230, 1);
}
@media screen and (min-width: 1366px) {
  .photo-item-wrapper {
    width: 25%;
  }
}
@media screen and (max-width: 1365px) {
  .photo-item-wrapper {
    width: 33.3333%;
  }
}
.cover-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: 2px solid rgba(0, 0, 0, 0);
  box-sizing: border-box;
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
  bottom: 5px;
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
