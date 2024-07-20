import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TodoPopup from '../components/TodoPopup.vue';
import PromptHome from '../components/Prompt/PromptHome.vue';
import Login from '@/components/Login.vue';
import { store } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoPopup,
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: PromptHome,
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.checkUserAuthenticated();
  next();
});

export default router;