import Index from './Index.vue'
import UserCenter from './UserCenter.vue'
import Home from './Home.vue'
import AlbumList from './AlbumList.vue'
import PhotoList from './PhotoList.vue'
import Collection from './Collection.vue'
import Setting from './Setting.vue'

const pages = {
  install: function (Vue) {
    Vue.component('index', Index);
    Vue.component('userCenter', UserCenter);
    Vue.component('home', Home);
    Vue.component('albumList', AlbumList);
    Vue.component('photoList', PhotoList);
    Vue.component('collection', Collection);
    Vue.component('setting', Setting);
  }
}

export default pages