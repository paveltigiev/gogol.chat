import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      component: MainLayout,
      redirect: '/chat',
      children: [
        {
          path: '/chat',
          name: 'chat',
          component: () => import('../views/ChatView.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../views/SettingsView.vue')
        }
      ]
    }
  ]
})

export default router
