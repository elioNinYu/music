import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/discovery'
  },
  {
    path: '/top',
    name: 'Top',
    component: () => import('../views/01.top.vue')
  },
  {
    path: 'index',
    name: 'Index',
    component: () => import('../views/02.index.vue')
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: () => import('../views/Discovery.vue')
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import('../views/PlayLists.vue')
  },
  {
    path: '/songs',
    name: 'Songs',
    component: () => import('../views/Songs.vue')
  },
  {
    path: '/mvs',
    name: 'MVs',
    component: () => import('../views/MVs.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue')
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import('../views/playlist.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('../views/mv.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
