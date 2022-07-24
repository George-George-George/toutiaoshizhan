import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/ ',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/Home/article/articleCon')
  },
  {
    path: '/user',
    component: () => import('@/views/My/editMsg')
  }
]

const router = new VueRouter({
  routes
})

export default router
