import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      isLogin: false,
      uid: '',
      uname: '',
      avartar: '',
      uemail: '',
      usignature: '',
      ugender: 0
    },
    userCenter: {
      recNavId: 0
    },
    photoList: {
      album: ''
    }
  },
  mutations: {
    setUserInfo(state, obj) {
      for(let key in obj){
        state.userInfo[key] = obj[key]
      }
    },
    setUserCenter(state, obj) {
      for(let key in obj){
        state.userCenter[key] = obj[key]
      }
    },
    setPhotoList(state, obj) {
      for(let key in obj){
        state.photoList[key] = obj[key]
      }
    },

    setLocalStorage(state) {
      localStorage.state = JSON.stringify(state);
    },
    getLocalStorage(state) {
      if(localStorage.state == 'null' || !localStorage.state) return
      let store = JSON.parse(localStorage.state)

      var s = state
      setState(s, store)

      function setState(s, store){
        for(let key in store) {
          if(typeof store[key] == 'object' && typeof s[key] == 'object'){
            setState(s[key], store[key])
          } else {
            s[key] = store[key]
          }
        }
      }

    }

  },
  actions: {

  }
})

export default store
