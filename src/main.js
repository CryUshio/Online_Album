import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import view from './view'
import components from './components'

Vue.use(view)
Vue.use(components)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
