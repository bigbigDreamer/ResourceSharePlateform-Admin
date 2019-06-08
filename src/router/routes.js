export default [
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../components/Log.vue')
    },
];