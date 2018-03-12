import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/Index.vue'
import userCenter from '@/view/UserCenter'
import photoList from '@/view/PhotoList'
import albumList from '@/view/AlbumList'

Vue.use(Router)

let routes = [{
    path: '/',
    redirect: '/Index',
    component: index
  },{
    path: '/Index',
    name: 'Index',
    component: index
  },{
    path: '/UserCenter',
    name: 'UserCenter',
    component: userCenter,
    children: [{
      path: 'Album',
      name: 'Album',
      component: albumList,
      children: [{
        path: 'Photo',
        name: 'Photo',
        component: photoList,
      }]
    }]
  }
]

const router = new Router({
  // mode: ['history'],
  routes : routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
