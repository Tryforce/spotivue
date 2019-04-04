import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Login from '@/components/Login.vue';
import HelloWorld from '@/components/HelloWorld.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  if (!store.getters.isAuthenticated) {
    next({ name: 'Login' });
    return;
  }
  if (!to.meta.roles) {
    next();
    return;
  }
  // if (to.meta.roles.includes(store.getters.currentUser.role_id)) {
  //   next();
  //   return;
  // }
  next({ name: 'Login' });
});

export default router;
