import { createRouter, createWebHashHistory } from 'vue-router'

// 前後台分離
const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        // 跟上層路由合併
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/Products.vue'),
      },
      {
        path: '/product/:id',
        name: '產品頁面',
        component: () => import('../views/Product.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/Cart.vue'),
      },
    ],
  },
  // 登入
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  // 巢狀路由
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Dashboard/Orders.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
