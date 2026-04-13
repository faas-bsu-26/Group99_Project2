import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/activities', component: () => import('../views/ActivitiesView.vue') },
    { path: '/log-species', component: () => import('../views/LogSpeciesView.vue') },
    { path: '/explore', component: () => import('../views/ExploreView.vue') },
    { path: '/account', component: () => import('../views/AccountView.vue') },
    { path: '/collection', component: () => import('../views/CollectionView.vue')}
  ],
})
export default router
