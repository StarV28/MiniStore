import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated, isRouteAvailable } from './helper/authRouter'
import { useAuthStore } from '../stores/authStore'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: false,
      useInMenu: true,
    },
  },
  {
    path: '/shop',
    name: 'shop',
    meta: {
      requireAuth: false,
      useInMenu: true,
    },
    component: () => import('../views/ShopView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requireAuth: false,
      useInMenu: true,
    },
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    meta: {
      requireAuth: false,
      useInMenu: true,
    },
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      requireAuth: true,
      useInMenu: false,
    },
    component: () => import('../views/UserView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    meta: {
      requireAuth: true,
      useInMenu: false,
    },
    component: () => import('../views/CheckoutView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    meta: {
      requireAuth: false,
      useInMenu: false,
    },
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/cart/:id?',
    name: 'cart',
    meta: {
      requireAuth: false,
      useInMenu: false,
    },
    component: () => import('../views/CartView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (to.meta?.requireAuth) {
    if (!isAuthenticated()) {
      authStore.dialog = true
      localStorage.setItem('redirectTo', to.fullPath)
      return false
    }
    if (!isRouteAvailable(to)) {
      return {
        name: 'page-not-found',
      }
    }
  }
})

export default router
