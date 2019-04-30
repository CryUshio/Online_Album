import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/Index.vue'
import userCenter from '@/pages/UserCenter'
import home from '@/pages/Home'
import albumList from '@/pages/AlbumList'
import photoList from '@/pages/PhotoList'
import collection from '@/pages/Collection'
import setting from '@/pages/Setting'


Vue.use(Router)

let routes = [{
    path: '/',
    redirect: '/Index',
  },{
    path: '/Index',
    name: 'Index',
    component: index
  },{
    path: '/UserCenter',
    // name: 'UserCenter',
    component: userCenter,
    children: [{
      path: '',
      name: 'Home',
      component: home,
    },{
      path: 'Album',
      name: 'Album',
      component: albumList
    },{
      path: 'Album/Photo',
      name: 'Photo',
      component: photoList,
    },{
      path: 'Collection',
      name: 'Collection',
      component: collection,
    },{
      path: 'Setting',
      name: 'Setting',
      component: setting,
    }]
  }
]

const router = new Router({
  // mode: ['history'],
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(to.name == 'Index' || from.name == 'Index')
      return { y: 0 }
  }
})

export default router
