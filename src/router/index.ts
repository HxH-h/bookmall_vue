import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from "vuex"
import Login from '../views/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/adminlogin',
    name: 'adminlogin',
    component: Login
  },
  {
    path: '/test',
    name: 'test',
    meta: { isAuth: true},
    component: () => import('../views/test.vue')
  },
  {
    path: '/adminbook',
    name: 'adminbook',
    meta: { isAuth: true},
    component: () => import('../views/book.vue')
  },
  {
    path: '/adminaddbook',
    name: 'adminaddbook',
    meta: { isAuth: true},
    component: () => import('../views/addbook.vue')
  },
  {
    path: '/adminorder',
    name: 'adminorder',
    meta: { isAuth: true},
    component: () => import('../views/order.vue')
  },
  {
    path: '/adminconfirmOrder',
    name: 'adminconfirmOrder',
    meta: { isAuth: true},
    component: () => import('../views/confirmOrder.vue')
  },
  {
    path: '/admindata',
    name: 'admindata',
    meta: { isAuth: true},
    component: () => import('../views/data.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  

  //如果路由需要跳转
  if (to.meta.isAuth) {
    if (store.state.token != '') {
      next()  //放行
    } else {
      alert('抱歉，您无权限查看！')
      next('/login')
    }
  } else {
    // 否则，放行
    next()
  }
})



export default router
