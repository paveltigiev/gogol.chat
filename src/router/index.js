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
        },
        {
          path: '/templates',
          name: 'Templates',
          component: () => import('../templates/Templates.vue')
        },
        {
          path: '/tpl1',
          name: 'tpl1',
          component: () => import('../templates/Tpl1.vue')
        },
        {
          path: '/tpl2',
          name: 'tpl2',
          component: () => import('../templates/Tpl2.vue')
        },
        {
          path: '/tpl3',
          name: 'tpl3',
          component: () => import('../templates/Tpl3.vue')
        },
        {
          path: '/tpl4',
          name: 'tpl4',
          component: () => import('../templates/Tpl4.vue')
        },
        {
          path: '/tpl5',
          name: 'tpl5',
          component: () => import('../templates/Tpl5.vue')
        },
        {
          path: '/tpl6',
          name: 'tpl6',
          component: () => import('../templates/Tpl6.vue')
        },
        {
          path: '/tpl7',
          name: 'tpl7',
          component: () => import('../templates/Tpl7.vue')
        },
      ]
    }
  ]
})

export default router
