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
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/user/Users.vue'
        ),
    },
    {
      path: '/home/servidor',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/user/HomeServidor.vue')
    },
    {
      path: '/groups',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/group/Groups.vue'
        ),
    },
    {
      path: '/units',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/unit/Units.vue'
        ),
    },
    {
      path: '/gestor',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "patients" */ '@/views/administrator/gestor/Gestor.vue'
        ),
    },
    {
      path: '/listaAtividades',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "listasAtividades" */ '@/views/administrator/user/ListasAtividades.vue'
        ),
    },
    {
      path: '/propostas',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "listasAtividades" */ '@/views/administrator/proposta_meta/List.vue'
        ),
    },
    {
      path: '/propostas/avaliacao/:cpf',
      name: 'Sistema de Gestão do Teletrabalho',
      component: () =>
        import(
          /* webpackChunkName: "listasAtividades" */ '@/views/administrator/proposta_meta_avaliacao/List.vue'
        ),
    }

  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
