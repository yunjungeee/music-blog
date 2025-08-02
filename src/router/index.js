import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetailView from '../views/PostDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/post/:id',
    name: 'postDetail',
    component: PostDetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
