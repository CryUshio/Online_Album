import MainHeader from './MainHeader.vue'
import Login from './Login.vue'
import waterfall from './waterfall.vue'
import Topbar from './Topbar.vue'

const components = {
    install: function(Vue){
      Vue.component('mainHeader', MainHeader);
      Vue.component('login', Login);
      Vue.component('waterfall', waterfall);
      Vue.component('topbar', Topbar);
    }
}

export default components
