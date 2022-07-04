import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
