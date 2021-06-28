<template>
  <v-card flat class="ma-4 mt-0">
    <v-card-text>
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
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Unidade"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Grupo de trabalho"
            dense
            outlined
            :value="getUserSelectedGroup ? getUserSelectedGroup.id : null"
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
        </v-col>
        <v-col cols=12 class="pb-0 pt-0">
          <v-text-field
            label="Nome do gestor"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols=6 class="pb-0 pt-0">
          <v-text-field
            label="Inicio do Teletrabalho"
            dense
            outlined
            :value="formatDate(getUserSelectedPeriod.dt_inicio_teletrabalho)"
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
  async mounted() {
    await this.fetchUserGroupByCPF(this.userSelected.cpf_usuario);
    await this.fetchUsePeriodByCPF(this.userSelected.cpf_usuario);;
  },
  props: {
    userSelected: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedPeriod']),
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
