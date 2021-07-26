<template>
  <v-dialog v-model="getModalMeta.show" persistent>
    <v-card>
      <v-card-title class="text-h6 mb-4 text-center d-flex justify-center"><p class=" text-center">Relatório Mensal</p></v-card-title>

      <v-card-text class="text-body-2">
        <v-divider></v-divider>
        <v-row class="pa-0 ma-0">
          <v-col class="pa-0 ma-0">
            <CabecalhoUsuario :userSelected="userSelected" :periodo="getPeriodo"/>
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
            <p class="pa-0 ma-0 font-weight-medium">Legenda:</p>
            <p class="pa-0 ma-0">Estabelecida = meta definida na inscrição ou alterada formalmente</p>
            <p class="pa-0 ma-0">Ajustada = meta alterada conforme a necessidade do periodo (afastamento, demandas urgentes, etc...)</p>
            <p class="pa-0 ma-0">Alcançada = meta efetivamente cumprida pelo servidor</p>
          </v-col>
          <v-col cols=12>
            <v-text-field
            v-model="model.meta_estabelecida"
              :disabled="!isGestor"
              label="Meta esbabelecida"
              style="max-width: 300px"
              type="number"
              :value="metaSelected.meta_estabelecida">
            </v-text-field>
          </v-col>
          <!--<v-col cols=12>
            <v-textarea
            v-if="isGestor"
               v-model="model.justificativa_meta_estabelecida"
              label="Justificativa de mudança de meta estabelecida"
              :value="metaSelected.justificativa_meta_estabelecida"
              >
            </v-textarea>
          </v-col>-->
          <v-col cols=12>
            <v-text-field
              v-model="model.meta_ajustada"
              label="Meta ajustada"
              type="number"
              style="max-width: 300px"
              :value="metaSelected.meta_ajustada">
            </v-text-field>
          </v-col>
          <v-col cols=12>
            <v-textarea
            v-model="model.justificativa_meta_ajustada"
              outlined
              label="Justificativa de ajuste de meta"
              :value="metaSelected.justificativa_meta_ajustada"
              >
            </v-textarea>
          </v-col>

          <v-col cols=12>
            <v-textarea
                v-model="model.justificativa_meta_nao_cumprida"
                label="Justificativa de meta não cumprida "
                :value="metaSelected.justificativa_meta_nao_cumprida"
                outlined
                >
            </v-textarea>
          </v-col>
          <v-col cols=12>
            <v-textarea
            v-model="model.tx_relatorio"
              outlined
              label="Relatório mensal"
              :value="metaSelected.tx_relatorio"
              >
            </v-textarea>

          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save()">ATUALIZAR</v-btn>
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
  data() {
    return {
      model:{
        meta_estabelecida: '',
        justificativa_meta_estabelecida: '',
        meta_ajustada: '',
        justificativa_meta_ajustada: '',
        tx_relatorio: '',
        fl_afastamento_legal: false
      }
    };
  },
  mounted(){
    this.model = {
      ...this.metaSelected
    }
  },
  computed: {
    ...mapGetters('modal', ['getModalMeta']),
    getPeriodo(){
      if(this.metaSelected)
      return `${("00" + this.metaSelected.mes_meta).slice(-2)}/${this.metaSelected.ano_meta}`;
      else
      return "";
    },
    modelJSON(){
      return {
        ...this.metaSelected,
        ...this.model
      }
    },
    isGestor(){
      return localStorage.getItem('sistema_perfil') == 'GESTOR';
    }
  },
  watch:{
    metaSelected(){
      this.model = {
        ...this.metaSelected
      };
    }
  },
  methods: {
    ...mapActions('modal', ['setModalMeta']),
    ...mapActions('administration', ['fetchJustificativa','fetchUseMetaByCPF']),
    handleClose() {
      this.setModalMeta({
        show: false
      });
    },
    async save(){
      await this.fetchJustificativa(this.modelJSON);
      await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
      this.handleClose();
    }
  },
};
</script>

<style>
</style>
