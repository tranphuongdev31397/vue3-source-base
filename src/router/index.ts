import { createRouter, createWebHistory } from 'vue-router'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'
import { authRoutes } from './authRoutes'
import { requiresAuth } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
    ...privateRoutes,
    ...authRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'Page Not Found',
      component: () => import('@/views/NotFound.vue')
    },

    {
      path: '/error',
      name: 'Error',
      component: () => import('@/views/Error.vue')
    }
  ]
})

router.beforeEach(requiresAuth)

export default router
