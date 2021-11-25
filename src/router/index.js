import { createRouter, createWebHistory } from 'vue-router'

// View Components
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import FarmInfo from '../views/FarmInfo.vue'

// Firebase Imports
import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login 
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // beforeEnter: requireAuth
  },
  {
    path: '/farminfo',
    name: 'FarmInfo',
    component: FarmInfo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
