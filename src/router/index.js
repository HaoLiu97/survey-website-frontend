import Vue from 'vue'
import Router from 'vue-router'

import Login from "@/components/Login"
import Register from '@/components/Register'
import List from '@/components/List'
import Design from '@/components/Design/Design'
import Fill from "@/components/Fill";
import FillPage from "@/components/FillPage";
import StatPage from "@/components/StatPage"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 登录页
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/design',
      name: 'Design',
      component: Design
    },
    {
      path: '/fill',
      name: 'Fill',
      component: Fill
    },
    {
      path: '/fillpage/:sid',
      name: 'FillPage',
      component: FillPage
    },
    {
      path: '/statpage/:sid',
      name: 'StatPage',
      component: StatPage
    }
  ]
})

