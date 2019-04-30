import Vue from 'vue'
import Vuex from 'vuex'
import * as service from './service';
import Cookies from 'js-cookie';

Vue.use(Vuex)

const defaultUserInfo = {
  uid: '',
  uname: '',
  avatar: '',
  uemail: '',
  usignature: '',
  ugender: 0
};

const store = new Vuex.Store({
  state: {
    userInfo: {
      ...defaultUserInfo,
    },
    userCenter: {
      recNavId: 0
    },
    albumList: {
      tagList: []
    },
    photoList: {
      album: ''
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = { ...state.userInfo, ...payload };
    },
    setUserCenter(state, obj) {
      for (let key in obj) {
        state.userCenter[key] = obj[key]
      }
    },
    setPhotoList(state, obj) {
      for (let key in obj) {
        state.photoList[key] = obj[key]
      }
    },
    setTag(state, payload) {
      state.albumList.tagList = payload;
    },

    setLocalStorage(state) {
      localStorage.state = JSON.stringify(state);
    },
    getLocalStorage(state) {
      if (localStorage.state == 'null' || !localStorage.state) return
      let store = JSON.parse(localStorage.state)

      var s = state
      setState(s, store)

      function setState(s, store) {
        for (let key in store) {
          if (typeof store[key] == 'object' && typeof s[key] == 'object') {
            setState(s[key], store[key])
          } else {
            s[key] = store[key]
          }
        }
      }

    }

  },
  actions: {
    getUserInfo: (ctx) => {
      return service.getUserInfo().then((res) => {
        ctx.commit('setUserInfo', res.data);
      }).catch(() => {
        Cookies.remove('x-token');
        ctx.commit('setUserInfo', defaultUserInfo);
      });
    },
    userLogin: (ctx, payload) => {
      return service.login(payload).then((res) => {
        ctx.commit('setUserInfo', res.data);
        return Promise.resolve(res.data);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    userRegister: (ctx, payload) => {
      return service.register(payload).then((res) => {
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    userLogout: (ctx) => {
      return service.logout().then((res) => {
        ctx.commit('setUserInfo', defaultUserInfo);
        return Promise.resolve();
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    userEdit: (ctx, payload) => {
      return service.editInfo(payload).then(() => {
        ctx.commit('setUserInfo', payload);
        return Promise.resolve();
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    userChangePwd: (ctx, payload) => {
      return service.changePwd(payload).then(() => {
        return Promise.resolve();
      }).catch(() => {
        return Promise.reject();
      });
    },
    getPicTag: (ctx, payload) => {
      return service.getPicTag(payload).then((res) => {
        ctx.commit('setTag', res.data);
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    getPicList: (ctx, payload) => {
      return service.getPicList(payload).then((res) => {
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    deletePic: (ctx, payload) => {
      return service.deletePic(payload).then((res) => {
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    getAlbumList: (ctx, payload) => {
      return service.getAlbumList(payload).then((res) => {
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    createAlbum: (ctx, payload) => {
      return service.createAlbum(payload).then((res) => {
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
    upload: (ctx, payload) => {
      return service.upload(payload).then((res) => {
        return Promise.resolve(res);
      }).catch((res) => {
        return Promise.reject(res);
      });
    },
  }
})

export default store