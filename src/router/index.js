import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

const routes = [
  { path: '/login', name: 'Login', component: Login},
  { path: '/', component: Dashboard, children: [
      { path: '/', redirect: 'home'},
      { path: 'home', name: 'DashboardHome', component: () => import('@/components/Home') },
      { path: '/account', name: 'Settings', component: () => import('@/components/Account') },
      { path: '/cart', name: 'UserCart', component: () => import('@/components/Cart') },
      { path: '/orders', name: 'UserOrders', component: () => import('@/components/Orders') },
    ],
    meta: {
        requiresAuth: true
    }
  },
  { 
    path: '/menu', 
    component: () => 
        import('@/components/Menu'), 
    meta: {requiresAuth: true}
  }

]

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => 
        record.meta.requiresAuth)
    const signedIn = window.localStorage.getItem('signedIn') == 'True'   
    if(requiresAuth && !signedIn) {
        next('/login')
    }
    else {
        next()
    }
})

export default router;