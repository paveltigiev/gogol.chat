import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'

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
    },
    {
      name: 'settings',
      component: SettingsLayout,
      path: '/settings',
      redirect: '/settings/connections',
      children: [
        {
          path: '/settings/connections',
          name: 'connections',
          component: () => import('../views/settings/ConnectionsView.vue')
        },
        {
          path: '/settings/billing',
          name: 'billing',
          component: () => import('../views/settings/BillingView.vue')
        },
        {
          path: '/settings/agents',
          name: 'agents',
          component: () => import('../views/settings/AgentsView.vue')
        },
      ]
    }
  ]
})

export default router
