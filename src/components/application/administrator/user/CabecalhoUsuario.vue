<template>
  <v-card flat>
    <v-card-text>
      <v-row class="pl-6 pr-6">
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
            <p class="mb-0 pa-2 font-weight-medium">Área</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2">Área</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pr-0 pb-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2 font-weight-medium">Unidade</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2">Unidade</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2 font-weight-medium">Grupo de Trabalho</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2">{{getUserSelectedGroup.id_grupo}}</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2 font-weight-medium">Gestor</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2">Gestor</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pr-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2 font-weight-medium">Inicio do Teletrabalho</p>
          </v-card>
        </v-col>
        <v-col cols=6 class="pt-0 pb-0 pl-0">
          <v-card
            class="pa-0 pl-1"
            outlined
            tile
          >
            <p class="mb-0 pa-2">{{formatDate(getUserSelectedPeriod.dt_inicio_teletrabalho)}}</p>
          </v-card>
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
    title: {
      type: String,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedPeriod']),
  },
  methods: {
    formatDate(value) {
      return date.formatToDDMMYYYY(value);
    }
  }
}
</script>

<style>
</style>
