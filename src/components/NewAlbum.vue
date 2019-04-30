<template lang="html">
  <div>
    <div :class="['new-album-wrapper', {'new-album-wrapper-in': transIn}]">
      <div class="title"><span>{{ isNew ? '新建相册' : '修改相册'}}</span><i class="iconfont icon-close" @click="closeDialog"></i></div>
      <div class="content">
        <div class="input-wrapper">
          <span class="name">相册名称</span>
          <input type="text" v-model="aname" onkeyup="value=value.replace(/[`~!#$^&*()=|{}':;',\\\/\[\].<>?~#￥…]/g, '')"/>
          <span class="gray">{{ anamelen }}/30</span>
        </div>
        <div class="input-wrapper">
          <span class="name">相册描述</span>
          <textarea v-model="adescribe" onkeyup="value=value.replace(/[`~!#$^&*()=|{}':;',\\\/\[\].<>?~#￥…]/g, '')"></textarea>
          <span class="gray">{{ adescribelen }}/1000</span>
        </div>
        <div class="input-wrapper">
          <span class="name">标签</span>

          <!-- /* TODO */ -->
          <div class="gender-wrapper">
            <input class="gender-input" v-model="recTag"/>
            <a class="gender-select" @click="showGender()"></a>
            <div class="gender-list" v-if="showgender">
              <a class="gender" @click="showGender(index)" v-for="(t,index) in state.tag">{{ t.tname }}</a>
            </div>
          </div>
          <!-- <div class="label-wrapper">
            <div class="select-label" v-for="">

            </div>
            <div class="search-label">
              <input type="text" v-model="search" onkeyup="value=value.replace(/[`~!#$^&*()=|{}':;',\\\/\[\].<>?~#￥…]/g, '')"/>
              <div class="seach-result"></div>
            </div>
          </div> -->
          <span class="gray">{{ labellen }}/5</span>
        </div>
      </div>
      <div class="footer">
        <button class="submit" @click="newAlbum">新建</button>
        <button class="cancel" @click="closeDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isNew'],
  data() {
    const state = this.$store.state.albumList;
    return {
      state,
      transIn: false,
      aname: '',
      anamelen: 0,
      adescribe: '',
      adescribelen: 0,
      label: '2',
      labellen: 0,

      search: '',

      showgender: false,
      recTag: '',
      recTagId: '',
    }
  },
  mounted() {
    setTimeout(() => {
      this.transIn = true
      if (!this.isNew) {
        let album = this.$store.state.photoList.album
        console.log(this.$store.state.photoList.album);
        this.aname = album.aname
        this.adescribe = album.adescribe
      }
    }, 100)
    this.getTag()
  },
  watch: {
    aname(val, old) {
      this.anamelen = tools.strlen(val)
      if (tools.strlen(val) > 30)
        this.aname = old
    },
    adescribe(val, old) {
      this.adescribelen = tools.strlen(val)
      if (tools.strlen(val) > 1000)
        this.adescribe = old
    }
  },
  methods: {
    newAlbum() {
      if (!this.aname || !this.adescribe || !this.recTag) return tools.info('请将所有信息填写完整', 'error')
      console.log(this.recTag);

      this.$store.dispatch('createAlbum', {
        aname: this.aname,
        adescribe: this.adescribe,
        tags: this.recTagId
      }).then(() => {
        tools.info('创建成功', 'success')
        this.closeDialog()
        this.$emit('suc')
      }).catch(() => {
        tools.info('创建失败', 'error')
      })
    },
    getTag() {
      this.$store.dispatch('getPicTag').catch(() => {
        tools.info('获取标签列表失败，请刷新后重试', 'error');
      });
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    showGender(i) {
      if (typeof i != 'undefined') {
        this.recTag = this.state.tag[i].tname
        this.recTagId = this.state.tag[i].tagId
        this.showgender = false
      } else {
        this.showgender = !this.showgender
      }
    },
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 9px;
  background-color: rgba(195, 195, 195, 0.3);
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(126, 126, 126, 0.6);
}

.new-album-wrapper {
  position: fixed;
  top: 45%;
  left: 50%;
  min-width: 380px;
  min-height: 260px;
  width: 360px;
  /* height: 320px; */
  transform: translateX(-50%) translateY(-50%);

  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  overflow: none;
  transition: all 0.3s ease;
  opacity: 0;
  z-index: 6;
}
.new-album-wrapper-in {
  top: 50%;
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
  color: #4c4c4c;
  box-sizing: border-box;
}
.title i {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  font-family: "iconfont";
  content: "\e625";
  font-size: 14px;
  color: #a3a2a2;
  cursor: pointer;
}

/* content */
.content {
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
  padding: 20px 40px;
  overflow: none;
  box-sizing: border-box;
}
.input-wrapper {
  display: grid;
  grid-template-columns: 22% 56% 22%;
  width: 100%;
  /* height: 30px; */
  min-height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  font-size: 14px;
}
.input-wrapper .name {
  text-align: right;
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
.label-wrapper {
  min-height: 30px;
  line-height: 30px;
  height: 30px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 0 5px;
  box-sizing: border-box;
}
.label-wrapper input {
  position: relative;
  top: -1px;
  min-width: 33%;
  width: 100%;
  height: 28px;
  border: none;
  padding: 0;
  background: transparent;
}

/* TODO */
.gender-wrapper {
  position: relative;
  width: 80px;
  box-sizing: border-box;
}
.gender-input {
  width: 80px;
  height: 30px;
  padding-left: 10px !important;
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
  font-family: "iconfont";
  content: "\e74a";
}
.gender-list {
  position: absolute;
  top: 30px;
  left: 0;
  width: 80px;
  max-height: 90px;
  background: white;
  padding: 4px 0;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  overflow: auto;
  z-index: 11;
}
.gender {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  box-sizing: border-box;
}
.gender:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* footer */
.footer {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  font-size: 14px;
  text-align: right;
  box-sizing: border-box;
}
.submit,
.cancel {
  height: 25px;
  /* width: 40px; */
  border-radius: 2px;
  font-size: 13px;
  text-align: center;
  padding: 0 10px;
}
.submit {
  background: #3a8ee2;
  color: white;
}
.submit:hover {
  background: #3583d0;
}
.cancel {
  background: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.cancel:hover {
  background: rgb(245, 245, 245);
}
</style>
