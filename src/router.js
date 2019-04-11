import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Convert from './views/Convert.vue'
import Converts from './views/Converts.vue'
import Changes from './views/aa.vue'
import Manager from './views/Manager.vue'
import ConvertChild1 from './views/convertChild1.vue'
import ConvertChild2 from './views/convertChild2.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager
    },
    {
      path: '/changea',
      name: 'changea',
      component: Changes
    },
    {
      path: '/Converts',
      component: Converts
    },
    {
      path: '/Convert',
      component: Convert,
      children:[
        {
          path:'/',
          component: Convert
        },
        {
          path:'/cChild1',
          name:'child1',
          component: ConvertChild1
        },
        {
          path:'/cChild2',
          name:'child2',
          component: ConvertChild2
        }
      ]
    }
  ]
})
