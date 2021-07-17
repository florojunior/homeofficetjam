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
    },
    {
      path: '/groups',
      name: 'Grupos',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/group/Groups.vue'
        ),
    },
    {
      path: '/units',
      name: 'Unidades',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/unit/Units.vue'
        ),
    }
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
