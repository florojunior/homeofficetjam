<template>
  <v-dialog v-model="getModalMeta.show" persistent>
    <v-card>
      <v-card-title class="text-h6 mb-4 text-center d-flex justify-center"><p class=" text-center">Formulário de alteração de meta</p></v-card-title>

      <v-card-text class="text-body-2">
        <v-divider></v-divider>
        <v-row class="pa-0 ma-0">
          <v-col class="pa-0 ma-0">
            <CabecalhoUsuario :userSelected="userSelected"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>
          <v-col cols=12>
          <p class="font-weight-bold">
            1. Favor preencher o quadro abaixo com relação a meta.
          </p>
          </v-col>
          <v-col cols=12>
            <v-text-field
              label="1.1 - Meta esbabelecida"
              type="number"
              :value="metaSelected.meta_estabelecida">
            </v-text-field>
          </v-col>
          <v-col cols=12>
            <v-text-field
              label="1.2 - Adicionar Meta ajustada"
              type="number"
              :value="metaSelected.meta_ajustada">
            </v-text-field>
          </v-col>
          <v-col cols=12>
            <v-textarea

              label="1.3 - Relatório mensal"
              :value="metaSelected.justificativa_meta_ajustada"
              >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handleClose()">ATUALIZAR</v-btn>
        <v-btn color="primary" text @click="handleClose()">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CabecalhoUsuario from '../application/administrator/user/CabecalhoUsuario.vue'
export default {
  components:{
  CabecalhoUsuario
},
  props: {
    metaSelected: {
      type: Object,
      default: () => null,
    },
    userSelected: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters('modal', ['getModalMeta']),
  },
  methods: {
    ...mapActions('modal', ['setModalMeta']),
    handleClose() {
      this.setModalMeta({
        show: false
      });
    },
  },
};
</script>

<style>
</style>
