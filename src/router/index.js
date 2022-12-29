import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import BlogView from '@/views/BlogView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexView',
    component: IndexView
  },
  {
    path: '/blog/:id',
    name: 'blogView',
    component: BlogView
  }
]

const router = new VueRouter({
  routes
})

export default router