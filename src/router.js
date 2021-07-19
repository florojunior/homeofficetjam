import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '@/views/authentication/Login.vue'
        ),
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/users',
      name: 'Usuarios',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/user/Users.vue'
        ),
    }, {
      path: '/home/servidor',
      name: 'PrincipalServidor',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/user/HomeServidor.vue'
        ),
    }
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
