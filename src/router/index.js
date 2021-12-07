import { createRouter, createWebHistory } from 'vue-router'

// View Components
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import FarmInfo from '../views/FarmInfo.vue'
import CommodityInfo from '../views/Commodities/CommodityInfo.vue'
import CropInfo from '../views/Commodities/CropInfo.vue'
import LivestockInfo from '../views/Commodities/LivestockInfo.vue'
import PoultryInfo from '../views/Commodities/PoultryInfo.vue'
import FisheryInfo from '../views/Commodities/FisheryInfo.vue'
import TreeInfo from '../views/Commodities/TreeInfo.vue'
import Test from '../views/Test.vue'

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
  },
  {
    path: '/commodity',
    name: 'CommodityInfo',
    component: CommodityInfo
  },
  {
    path: '/crops',
    name: 'CropInfo',
    component: CropInfo
  },
  {
    path: '/livestock',
    name: 'LivestockInfo',
    component: LivestockInfo 
  },
  {
    path: '/poultry',
    name: 'PoultryInfo',
    component: PoultryInfo 
  },
  {
    path: '/fishery',
    name: 'FisheryInfo',
    component: FisheryInfo 
  },
  {
    path: '/trees',
    name: 'TreeInfo',
    component: TreeInfo 
  },
  {
    path: '/test',
    naem: 'Test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
