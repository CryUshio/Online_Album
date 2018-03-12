import Index from './Index.vue'
import UserCenter from './UserCenter.vue'
import AlbumList from './AlbumList.vue'
import PhotoList from './PhotoList.vue'

const view = {
    install: function(Vue){
        Vue.component('index', Index);
        Vue.component('userCenter', UserCenter);
        Vue.component('albumList', AlbumList);
        Vue.component('photoList', PhotoList);
    }
}

export default view
