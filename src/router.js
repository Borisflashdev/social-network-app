import { createRouter, createWebHistory } from "vue-router";

import TheHome from './pages/TheHome.vue';
import TheChat from './pages/TheChat.vue';
import TheLogin from './pages/TheLogin.vue';
import SignUp from './pages/SignUp.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: TheHome },
        { path: '/login', component: TheLogin },
        { path: '/signup', component: SignUp },
        { path: '/chat', component: TheChat }
    ]
});

export default router;