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
        },
        {
          path:'unionInfo',
          name:'2-1',
          component:()=> import('./views/MaintenWebsite/unionInfo.vue')
        },
        {
          path:'laws',
          name:'2-2',
          component:()=> import('./views/MaintenWebsite/Laws.vue')
        },
        {
          path:'CategoryManage',
          name:'3-1',
          component:()=> import('./views/EquipManage/CategoryManage.vue')
        },
        {
          path:'DeviceDetailsManagement',
          name:'3-2',
          component:()=> import('./views/EquipManage/DeviceDetailsManagement.vue')
        },
        {
          path:'DelEquipment',
          name:'3-3',
          component:()=> import('./views/EquipManage/DelEquipment.vue')
        },
        {
          path:'UpdateEquipmentInfo',
          name:'3-4',
          component:()=> import('./views/EquipManage/UpdateEquipmentInfo.vue')
        },
        {
          path:'OpenProjectAdd',
          name:'3-5',
          component:()=> import('./views/EquipManage/OpenProjectAdd.vue')
        },
        {
          path:'OpenProjectDel',
          name:'3-6',
          component:()=> import('./views/EquipManage/OpenProjectDel.vue')
        },
        {
          path:'OpenProjectManagement',
          name:'3-7',
          component:()=> import('./views/EquipManage/OpenProjectManagement.vue')
        },
        {
          path:'AppointmentRecordDel',
          name:'3-8',
          component:()=> import('./views/EquipManage/AppointmentRecordDel.vue')
        },

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
