import { createRouter, createWebHistory } from 'vue-router'

// View Components
import Welcome from '../views/Welcome.vue'
import Dashboard from '../views/Dashboard.vue'

// Firebase Imports
import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
