<template>
  <v-dialog v-model="getModalAvaliacao.show" persistent >
    <v-card>
      <v-card-title class="text-h6 mb-4 text-center d-flex justify-center"><p class=" text-center">Acompanhamento de teletrabalhador para o gestor</p></v-card-title>
      <v-card-text class="text-body-2">
        <v-divider></v-divider>
        <v-row class="pa-0 ma-0">
          <v-col class="pa-0 ma-0">
            <CabecalhoUsuario :userSelected="userSelected" :periodo="getPeriodo" :userSelectedTable="userSelectedTable"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider></v-divider>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols=12>
              <v-checkbox
                v-model="model.fl_afastamento_legal"
                label="Servidor esteve durante todo o periodo em afastamento legal(periodo de atestados médicos, licenças, afastamentos, férias, outros)"
              ></v-checkbox>
              <v-text-field
              v-if="model.fl_afastamento_legal"
              v-model="model.nr_processo_afastamento_legal"
                dense
                label="Numero processo"
                :value="metaSelected.nr_processo_afastamento_legal"
                style="max-width:300px">
              </v-text-field>

          </v-col>
          <v-col cols=12>
            <p class="font-weight-bold">
              1. Favor preencher o quadro abaixo com relação a meta.
            </p>
          </v-col>
          <v-col>
            <v-textarea
              v-model="model.justificativa_meta_nao_cumprida"
              disabled
              dense
              label="Justificativa para o não-cumprimento da meta">
            </v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              v-model="model.tx_relatorio"
              disabled
              dense
              label="Relatório Mensal"
              >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=12>
            <p class="font-weight-bold">
              2. Observações gerais.
            </p>
          </v-col>
          <v-col cols=12>
            <v-textarea
              v-model="model.descricao"
              dense
              label="Resposta"
              :value="metaSelected.gestoravaliacaojustificativa ? metaSelected.gestoravaliacaojustificativa.descricao : ''"
              >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn v-if="!metaSelected.gestoravaliacaojustificativa" color="#69F0AE" text @click="save('ACEITA')">
          <span class="green-accent-2--text">finalizar</span> <v-icon color="69F0AE">mdi-check</v-icon></v-btn>
        <v-btn v-if="!metaSelected.gestoravaliacaojustificativa" color="red" text  @click="save('REJEITADO')">
          REJEITAR<v-icon color="red">mdi-cancel</v-icon></v-btn>
        <v-btn color="primary" text @click="handleClose()">CANCELAR<v-icon color="primary">mdi-close</v-icon></v-btn>
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
    userSelectedTable: {
      type: Object,
      default: () => null,
    },
    periodo: {
      type: String,
      default: () => null,
    }
  },
  data() {
    return {
      statusAvaliacao: null,
      model:{
        ...this.metaSelected
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
    },
    getPeriodo(){
      if(this.metaSelected)
      return `${("00" + this.metaSelected.mes_meta).slice(-2)}/${this.metaSelected.ano_meta}`;
      else
      return "";
    }
  },
  watch:{
    metaSelected(novosDados){
      console.log('chamou');
      this.model.descricao = novosDados.gestoravaliacaojustificativa ? novosDados.gestoravaliacaojustificativa.descricao : "";
      this.model.justificativa_meta_nao_cumprida = novosDados.justificativa_meta_nao_cumprida;
    },
    getModalAvaliacao(){
      this.model = {
        ...this.metaSelected
      },
      this.model.justificativa_meta_nao_cumprida = this.metaSelected.justificativa_meta_nao_cumprida;
      this.model.descricao = this.metaSelected.gestoravaliacaojustificativa ? this.metaSelected.gestoravaliacaojustificativa.descricao : ''
    }
  },
  methods: {
    ...mapActions('modal', ['setModalAvaliacao']),
    ...mapActions('administration', ['fetchAvaliacao','fetchUseMetaByCPF']),
    handleClose() {
      this.setModalAvaliacao({
        show: false
      });

    },
    async save(status){
      this.statusAvaliacao = status;
      await this.fetchAvaliacao(this.modelJSON);
      await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
      this.handleClose();
    }
  },
};
</script>

<style>
</style>
