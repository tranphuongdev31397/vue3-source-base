import MainLayout from '@/layouts/MainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          requiresAuth: true, //
          headerTitle: 'SeeR | Real estate',
          searchConfig: {},
          storeConfig: {}
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: {
          headerTitle: 'About | SeeR',
          searchConfig: {},
          storeConfig: {}
        }
      }
    ]
  },
  {
    path: '/about',
    component: MainLayout,
    children: []
  },
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

export default routes
