import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import DisciplePage from '../views/DisciplePage.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/disciple/:id', component: DisciplePage, props: true }, // :id 現在代表 slug
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;