import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
