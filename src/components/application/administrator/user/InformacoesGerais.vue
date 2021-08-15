<template>
  <v-card flat class="ma-4 mt-0">
    <v-card-text >
      <v-row>
        <v-col>
          <p class="text-xl-h6 text-lg-h6">
            Usuário
          </p>
          <v-divider ></v-divider>
        </v-col>
        <v-col cols=12>
          <v-text-field
            label="Nome"
            dense
            outlined
            :value="userSelected.nm_usuario"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Área"
            dense
            outlined
            :value="getAreaName ? getAreaName.nm_area : ''"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Unidade"
            dense
            outlined
            :value="getUnidadeName ? getUnidadeName.nm_unidade : ''"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Grupo de trabalho"
            dense
            outlined
            :value="getGrupos ? getGrupos.nm_grupo : ''"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
        </v-col>
        <v-col cols=12 class="pb-0 pt-0">
          <v-text-field
            label="Nome do gestor"
            dense
            outlined
            :value="userSelectedTable ? userSelectedTable.gestor.nm_gestor : (userSelected && userSelected.gestorusuario? userSelected.gestorusuario[0].gestor.nm_gestor : '')"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Inicio do Teletrabalho"
            dense
            outlined
            :value="getUserData.periodoteletrabalho[0].dt_inicio_teletrabalho ? formatDate(getUserData.periodoteletrabalho[0].dt_inicio_teletrabalho) : ''"
          ></v-text-field>
        </v-col>
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
  async mounted() {
    this.areas = await this.fetchAreasList();
    this.unidades = await this.fetchUnidadesList();
    this.grupos = await this.fetchGruposList();
    this.gestores = await this.fetchGestorList();
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
  methods: {
    ...mapActions('administration', ['fetchUserGroupByCPF', 'fetchUsePeriodByCPF','fetchAreasList','fetchUnidadesList','fetchGruposList','fetchGestorList']),
    formatDate(value) {
      return date.formatToDDMMYYYY(value);
    },
  }
}
</script>

<style>
</style>
