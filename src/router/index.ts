import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import Home from '../views/Home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    // {
    //   path: 'search',
    //   name: 'search',
    //   component: BookSearch,
    // },
    // {
    //   path: '/form',
    //   name: 'form',
    //   component: BookForm,
    // },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
