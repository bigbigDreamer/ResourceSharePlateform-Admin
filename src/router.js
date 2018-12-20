import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '',
          name: 'content',
          component: () => import('./components/Main.vue'),
        },
        {
          path: 'newsPublish',
          name: '1-1',
          component: () => import('./views/news/newsPublish.vue'),
        },
        {
          path:'auditNews',
          name:'1-2',
          component:()=> import('./views/news/auditNews.vue')
        }

      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
