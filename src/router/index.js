import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogView from '@/views/BlogView.vue'
import ContentMainComponent from '@/views/IndexView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ContentMainComponent
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
