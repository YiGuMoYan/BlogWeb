import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogView from '@/views/BlogView.vue'
import ContentMainComponent from '@/views/IndexView.vue'
import TimelineView from '@/views/TimelineView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ContentMainComponent
  },
  {
    path: '/blog/:id',
    component: BlogView
  },
  {
    path: '/timeline',
    component: TimelineView
  }
]

const router = new VueRouter({
  routes
})

export default router
