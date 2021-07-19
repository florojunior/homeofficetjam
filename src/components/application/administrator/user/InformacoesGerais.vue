<template>
  <v-card flat class="ma-4 mt-0">
    <v-card-text v-if="getUserSelectedPeriod">
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
            :value="getUserData.id_area"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Unidade"
            dense
            outlined
            :value="getUserData.id_unidade"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Grupo de trabalho"
            dense
            outlined
            :value="getUserSelectedGroup ? getUserData.grupousuario[0].id_grupo : null"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
        </v-col>
        <v-col cols=12 class="pb-0 pt-0">
          <v-text-field
            label="Nome do gestor"
            dense
            outlined
            :value="getUserData.gestorusuario[0].id_gestor"
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
  },
  async mounted() {
    console.log('chamou mounted');
    await this.fetchUserGroupByCPF();
    await this.fetchUsePeriodByCPF();
  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedPeriod']),
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
  },
  methods: {
    ...mapActions('administration', ['fetchUserGroupByCPF', 'fetchUsePeriodByCPF']),
    formatDate(value) {
      return date.formatToDDMMYYYY(value);
    },
  }
}
</script>

<style>
</style>
