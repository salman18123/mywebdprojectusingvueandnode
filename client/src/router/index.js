import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pets from '@/components/Pets'
import Petview from '@/components/Petview'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Successpay from '@/components/Successpay'
import Sellpet from '@/components/Sellpet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pets',
      name: 'pets',
      component: Pets
    },
    {
      path: '/pets/:petid',
      name: 'pet',
      component: Petview
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'register',
      component: Register
    },
    {
      path: '/pay',
      name: 'successpay',
      component: Successpay
    },
    {
      path: '/sell',
      name: 'sellpet',
      component: Sellpet
    }

  ]
})
