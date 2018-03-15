import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/Index.vue'
import userCenter from '@/view/UserCenter'
import home from '@/view/Home'
import albumList from '@/view/AlbumList'
import photoList from '@/view/PhotoList'
import collection from '@/view/Collection'
import setting from '@/view/Setting'


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
  routes : routes,
  scrollBehavior (to, from, savedPosition) {
    if(to.name == 'Index' || from.name == 'Index')
      return { y: 0 }
  }
})

export default router
