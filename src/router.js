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
      name: 'Gestão de Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/user/Users.vue'
        ),
    },
    {
      path: '/home/servidor',
      name: 'Gestão de Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/user/HomeServidor.vue')
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
    },
    {
      path: '/gestor',
      name: 'Gestor',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/gestor/Gestor.vue'
        ),
    },
    {
      path: '/listaAtividades',
      name: 'Listas de Atividades',
      component: () =>
        import(
          /* webpackChunkName: "listasAtividades" */ '@/views/administrator/user/ListasAtividades.vue'
        ),
    }
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
