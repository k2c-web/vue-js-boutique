import { createWebHistory, createRouter } from 'vue-router'
import App from '../components/HelloWorld.vue'
import SandBox from '../components/SandBox.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/sandbox',
    name: 'SandBox',
    component: SandBox,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
