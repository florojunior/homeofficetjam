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

        <v-toolbar-title>
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
              @click="logout()"
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
import { mapActions } from 'vuex';

export default {
  data: () => ({
    drawer: true,
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
    var usrAdm = localStorage.getItem('sistema_perfil');
    if (usrAdm == 'SERVIDOR') {
      this.menu.push(
        {
          descricao: 'Principal',
          menu: [
            {
              descricao: 'Minhas Metas',
              path: '/home/servidor'
            }
          ]
        });
    }else if (usrAdm == 'GESTOR'){
      this.menu.push(
        {
          descricao: 'Principal',
          menu: [
            {
              descricao: 'Usuarios',
              path: '/users'
            },
          ]
        });
    }else{
      this.menu.push({
          descricao: 'Cadastros',
          menu: [
            {
              descricao: 'Unidades',
              path: '/units'
            },
            {
              descricao: 'Gestor',
              path: '/gestor'
            },
             {
              descricao: 'Grupos',
              path: '/groups'
            },
          ]
        });
    }
  },
  methods: {
    ...mapActions('main', ['handleLogOut','setAuthenticated']),
    logout(){
      this.setAuthenticated(true);
      this.setAuthenticated(false);
      localStorage.setItem('token_sistema', null);
      localStorage.setItem('autenticado_sistema', false);
      this.handleLogOut();
    }
  },
};
</script>

<style scoped>
.larger-menu {
  height: 200px !important;
  z-index: 0 !important;
}
</style>
