<template>
  <nav>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
      <v-list dense>
        <v-list-group v-for="itemMenu in menu" :key="itemMenu.descricao">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>dynamic_feed</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                v-text="itemMenu.descricao"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="itemSubMenu in itemMenu.menu"
            :key="itemSubMenu.descricao"
            :to="itemSubMenu.path"
          >
            <v-list-item-action>
              <v-icon>how_to_reg</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ itemSubMenu.descricao }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      absolute
      color="primary"
      :class="{ 'larger-menu': desktopBreakpoint }"
      :height="!desktopBreakpoint ? '97px' : ''"
    >
      <v-container class="py-0 fill-height">
        <v-app-bar-nav-icon
          class="onPrimaryHighEmphasis--text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-img
          v-if="desktopBreakpoint"
          src="@/assets/images/logo-light.svg"
          max-width="90px"
          alt="Blood logo"
        ></v-img>
        <v-toolbar-title v-else>
          <span class="surface--text text-h6">
            {{ pageName }}
          </span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="onPrimaryHighEmphasis"
              @click="handleLogOut()"
              v-on="on"
            >
              <v-icon>mdi-keyboard-return</v-icon>
            </v-btn>
          </template>
          <span>Log out</span>
        </v-tooltip>
      </v-container>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    drawer: null,
    isAdministrador: true,
    user: 'Foo', //pegar do vuex
    menu: []
  }),
  computed: {
    pageName() {
      return this.$route.name;
    },
    desktopBreakpoint() {
      return this.$vuetify.breakpoint.smAndUp;
    },
  },
  created: function() {
    var usrAdm = localStorage.getItem('token_sistema_user_name');
    if (usrAdm == 'GESTOR') {
      this.menu.push(
        {
          descricao: 'Principal',
          menu: [
            {
              descricao: 'Minha Metas',
              path: '/home/servidor'
            }
          ]
        });
    }else{
      this.menu.push(
        {
          descricao: 'Principal',
          menu: [
            {
              descricao: 'Usuarios',
              path: '/users'
            }
          ]
        },{
          descricao: 'Cadastros',
          menu: [
            {
              descricao: 'Grupos',
              path: '/groups'
            },
            {
              descricao: 'Unidades',
              path: '/units'
            },
            {
              descricao: 'Gestor',
              path: '/gestor'
            }
          ]
        });
    }
  },
  methods: {
    ...mapActions('main', ['handleLogOut']),
  },
};
</script>

<style scoped>
.larger-menu {
  height: 200px !important;
  z-index: 0 !important;
}
</style>
