<template>
  <v-dialog v-model="getJustificativaServidor.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="text-subtitle-1 mb-4">Enviar Relatório</v-card-title>
      <v-card-text class="text-body-2">
        <v-row>
          <v-col cols=12>
            <v-textarea
              v-model="metaSelected.justificativa_meta_nao_cumprida"
              dense
              label="Relatório"
              >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save()">ENVIAR</v-btn>
        <v-btn color="primary" text @click="handleClose()">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {

  props: {
    metaSelected: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      model:{
        justificativa_meta_nao_cumprida: ''
      }
    };
  },
  computed: {
    ...mapGetters('modal', ['getJustificativaServidor']),
    modelJSON(){
      return {
        ...this.metaSelected,
        justificativa_meta_nao_cumprida: this.model.justificativa_meta_nao_cumprida
      }
    }
  },
  methods: {
    ...mapActions('modal', ['setModalJustificativaServidor']),
    ...mapActions('administration', ['fetchJustificativa']),
    handleClose() {
      this.setModalJustificativaServidor({
        show: false
      });
    },
    async save(){
      await this.fetchJustificativa(this.modelJSON);
      this.handleClose();
    }
  },
};
</script>

<style>
</style>
