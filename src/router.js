import { createRouter, createWebHistory } from "vue-router";
import store from './index.js';

import TheHome from './pages/TheHome.vue';
import TheChat from './pages/TheChat.vue';
import TheLogin from './pages/TheLogin.vue';
import SignUp from './pages/SignUp.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: TheHome },
        { path: '/login', component: TheLogin, meta: { requiresUnauth: true } },
        { path: '/signup', component: SignUp, meta: { requiresUnauth: true } },
        { path: '/chat', component: TheChat, meta: { requiresAuth: true } }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/signup');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/home')
    } else {
        next();
    }
});

export default router;