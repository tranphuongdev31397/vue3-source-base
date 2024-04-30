import { APP_ROUTES } from '@/constants/route'
import MainLayout from '@/layouts/MainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

export const privateRoutes: RouteRecordRaw[] = [
  {
    path: APP_ROUTES.ABOUT.path,
    component: MainLayout,
    children: [
      {
        path: APP_ROUTES.ABOUT.path,
        name: APP_ROUTES.ABOUT.name,
        meta: {
          requiresAuth: true, // This field is required all of private routes
          headerTitle: 'About | SeeR',
          searchConfig: {},
          storeConfig: {}
        },
        component: () => import('@/views/AboutView.vue')
      }
    ]
  }
]
