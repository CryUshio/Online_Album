import MainHeader from './MainHeader.vue'
import Login from './Login.vue'
import waterfall from './waterfall.vue'
import Topbar from './Topbar.vue'
import UpLoad from './UpLoad.vue'
import NewAlbum from './NewAlbum.vue'
import Shade from './Shade.vue'

const components = {
    install: function(Vue){
      Vue.component('mainHeader', MainHeader);
      Vue.component('login', Login);
      Vue.component('waterfall', waterfall);
      Vue.component('topbar', Topbar);
      Vue.component('upload', UpLoad);
      Vue.component('newalbum', NewAlbum);
      Vue.component('shade', Shade);
    }
}

export default components
