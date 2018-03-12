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
      uemail: ''
    },
  },
  mutations: {
    setUserInfo(state, obj) {
      for(let key in obj){
        state.userInfo[key] = obj[key]
      }
    },

    setLocalStorage(state) {
      localStorage.state = JSON.stringify(state);
    },
    getLocalStorage(state) {
      if(localStorage.state == 'null') return
      let store = JSON.parse(localStorage.state)

      // for(let key in store['userInfo']){
      //   state.userInfo[key] = store['userInfo'][key]
      // }
      var s = state
      setState(s, store)

      function setState(s, store){
        for(let key in store) {
          if(typeof store[key] == 'object'){
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
