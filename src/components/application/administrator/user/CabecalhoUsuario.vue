<template>
  <v-card flat>
    <v-card-text class="pa-0 pb-4">
      <v-row class="pl-0 pr-0">
        <v-col cols=12>
          <p class="text-xl-h6 text-lg-h6">
            {{title? title : 'Meta'}}
          </p>
          <v-divider ></v-divider>
        </v-col>
        <v-col cols=6 class="pb-0 pr-0" >
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Área</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0">{{getAreaName ? getAreaName.nm_area : ""}}</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pr-0 pb-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Unidade</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0">{{getUnidadeName ? getUnidadeName.nm_unidade : ""}}</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Grupo de Trabalho</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0">{{getGrupos ? getGrupos.nm_grupo : ""}}</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Gestor</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0">{{userSelectedTable ? userSelectedTable.gestor.nm_gestor : userSelected.gestorusuario[0].gestor.nm_gestor}}</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Nome do servidor</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0">{{userSelected ? userSelected.nm_usuario : ''}}</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Inicio do Teletrabalho</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >

            <p class="mb-0 pa-0">{{userSelected.periodoteletrabalho[0] ? formatDate(userSelected.periodoteletrabalho[0].dt_inicio_teletrabalho) : null}}</p>
          </v-card>
        </v-col>
        <v-col v-if="periodo" cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0 font-weight-medium">Periodo</p>
          </v-card>
        </v-col>
        <v-col v-if="periodo" cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-0">{{periodo}}</p>
          </v-card>
        </v-col>
        {{metaSelected}}

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import date from '@/utils/date';

export default {
  props: {
    userSelected: {
      type: Object,
      default: () => null,
    },
    title: {
      type: String,
      default: () => null,
    },
    periodo: {
      type: Object,
      default: () => null,
    },
    userSelectedTable: {
      type: Object,
      default: () => null,
    }
  },
  data() {
    return {
      model:{},
      areas: [],
      unidades: [],
      grupos: [],
      gestores: []
    };
  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedPeriod']),
     getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
    getAreaName(){
      return this.areas.find((element) => element.id == this.userSelected.id_area)
    },
    getUnidadeName(){
      return this.unidades.find((element) => element.id == this.userSelected.id_unidade)
    },
    getGestor(){
      return this.gestores.find((element) => element.id == this.userSelected.gestorusuario[0].id_gestor)
    },
    getGrupos(){
        return this.grupos.find((element) => element.id == this.userSelected.grupousuario[0].id_grupo)
    }
  },
   async mounted() {
    this.areas = await this.fetchAreasList();
    this.unidades = await this.fetchUnidadesList();
    this.grupos = await this.fetchGruposList();
    this.gestores = await this.fetchGestorList();
  },
  methods: {
    ...mapActions('administration', ['fetchAreasList','fetchUnidadesList','fetchGruposList','fetchGestorList']),

    formatDate(value) {
      return date.formatToDDMMYYYY(value);
    }
  }
}
</script>

<style>
</style>
