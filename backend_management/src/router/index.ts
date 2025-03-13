import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import AdminLogin from '../views/login/AdminLogin.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLogin
  },
  {
    path: '/home',
    component: ()=>import('../views/AdminHome.vue'),
    redirect: '/categories',
    children:[
      {
        path:'/categories',
        name: 'Categories',
        component:()=>import('../views/CategoriesManage/CategoriesManage.vue')
      },
      {
        path:'/courses',
        name: 'Courses',
        component:()=>import('../views/CoursesManage/CoursesManage.vue')
      },
      {
        path:'/chapters',
        name: 'Chapters',
        component:()=>import('../views/ChaptersManage/ChaptersManage.vue')
      },
      {
        path:'/users',
        name: 'Users',
        component:()=>import('../views/UsersManage/UsersManage.vue')
      },
      {
        path:'/charts',
        name: 'Charts',
        component:()=>import('../views/ChartsInformation/ChartsInformation.vue')
      },
      {
        path:'/settings',
        name: 'Settings',
        component:()=>import('../views/SettingsManage/SettingsManage.vue')
      },
    ]
  },

]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})

export default router