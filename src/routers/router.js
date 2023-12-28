import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../views/MainPage.vue';
import FavoritePage from '../views/FavoritePage.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: MainPage
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritePage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;