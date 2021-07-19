<template>
  <v-dialog v-model="getModalAvaliacao.show" persistent max-width="560px">
    <v-card>
      <v-card-title class="text-subtitle-1 mb-4">Avaliar Relatório</v-card-title>
      <v-card-text class="text-body-2">
        <v-row>
          <v-col>
            <v-textarea
              v-model="model.justificativa_meta_nao_cumprida"
              disabled
              dense
              label="Relatório Enviado"
              >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=12>
            <v-textarea
              v-model="model.descricao"
              dense
              label="Relatório"
              >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn v-if="!metaSelected.gestoravaliacaojustificativa" color="#69F0AE" text @click="save('ACEITA')">
          <span class="green-accent-2--text">ACEITAR</span> <v-icon color="69F0AE">mdi-check</v-icon></v-btn>
        <v-btn v-if="!metaSelected.gestoravaliacaojustificativa" color="red" text  @click="save('REJEITADO')">
          REJEITAR<v-icon color="red">mdi-cancel</v-icon></v-btn>
        <v-btn color="primary" text @click="handleClose()">CANCELAR<v-icon color="primary">mdi-close</v-icon></v-btn>
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
      statusAvaliacao: null,
      model:{
        justificativa_meta_nao_cumprida:this.metaSelected.justificativa_meta_nao_cumprida,
        descricao: this.metaSelected.gestoravaliacaojustificativa ? this.metaSelected.gestoravaliacaojustificativa.descricao : ""
      }
    };
  },
  computed: {
    ...mapGetters('modal', ['getModalAvaliacao']),
    getGestor(){
      return JSON.parse(localStorage.getItem('token_sistema_gestor_data'));
    },
    modelJSON(){
      return {
        metaUsuario: {
          ...this.metaSelected
        },
        dt_avaliacao: new Date(),
        status_avaliacao: this.statusAvaliacao,
        descricao: this.model.descricao,
        id_gestor: this.getGestor.id
      }
    }
  },
  watch:{
    metaSelected(novosDados){
      this.model.descricao = novosDados.gestoravaliacaojustificativa ? novosDados.gestoravaliacaojustificativa.descricao : "";
      this.model.justificativa_meta_nao_cumprida = novosDados.justificativa_meta_nao_cumprida;
    }
  },
  methods: {
    ...mapActions('modal', ['setModalAvaliacao']),
    ...mapActions('administration', ['fetchAvaliacao']),
    handleClose() {
      this.model = {
        justificativa_meta_nao_cumprida: "",
        descricao: ""
      };
      this.setModalAvaliacao({
        show: false
      });

    },
    async save(status){
      this.statusAvaliacao = status;
      await this.fetchAvaliacao(this.modelJSON);
      this.handleClose();
    }
  },
};
</script>

<style>
</style>
