import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store.js'
import pages from './pages'
import components from './components'

import './assets/js/axios';

Vue.use(pages)
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
