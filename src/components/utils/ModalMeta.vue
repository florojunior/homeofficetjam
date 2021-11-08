<template>
  <v-dialog v-model="show" persistent>
    <v-card>
      <v-card-title class="text-h6 mb-4 text-center d-flex justify-center"><p class=" text-center">Relatório Mensal</p></v-card-title>

      <v-card-text class="text-body-2">
        <v-row class="pa-0 ma-0">
          <PageWrapper class="pa-0">
            <v-col v-if="metaSelected.gestoravaliacaojustificativa" cols=12 class="pa-0 pt-4">
              <v-alert border="bottom"
                  colored-border
                  type="warning"
                  elevation="2"
                >
                <v-row>
                  <v-col cols=12>
                    <span class="font-weight-bold">Data de avaliação</span> - {{new Date(metaSelected.gestoravaliacaojustificativa.dt_avaliacao).toLocaleDateString()}}
                  </v-col>
                  <v-col cols=12>
                    <span class="font-weight-bold">Descrição de Avaliação</span> - {{metaSelected.gestoravaliacaojustificativa.descricao}}
                  </v-col>
                  <v-col cols=12 class="pb-6">
                    <span class="font-weight-bold">Status da ultima avaliação</span> - {{metaSelected.gestoravaliacaojustificativa.status_avaliacao.nm_status}}
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <v-col cols=12 class="pa-0 ma-0">
              <v-row>
                <v-col cols=4>
                  <v-card
                    color="#039BE5"
                    dark
                  >
                    <v-card-title class="text-h5">
                      Meta estabelecida
                    </v-card-title>

                    <v-card-subtitle>Quantidade de pontos definidos para o período</v-card-subtitle>

                    <v-card-actions>
                      <p class="pl-2 text-h4">
                        {{metaSelected.meta_estabelecida ? Math.ceil(parseFloat(metaSelected.meta_estabelecida)) : 0}}
                      </p>

                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col cols=4>
                  <v-card
                    color="#385F73"
                    dark
                  >
                    <v-card-title class="text-h5">
                      Produtividade alcançada
                    </v-card-title>

                    <v-card-subtitle>Somatório dos pontos no período</v-card-subtitle>

                    <v-card-actions>
                      <p class="pl-2 text-h4">
                        {{metaSelected.meta_alcancada ? metaSelected.meta_alcancada.pontos : 0}}
                      </p>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col cols=4>
                  <v-card
                    color="#2E7D32"
                    dark
                  >
                    <v-card-title class="text-h5">
                      % de produtividade
                    </v-card-title>

                    <v-card-subtitle>Produtividade em relação a meta estabelecida</v-card-subtitle>

                    <v-card-actions>
                      <p class="pl-2 text-h4">
                        {{(( (metaSelected.meta_alcancada ? metaSelected.meta_alcancada.pontos : 0) / parseFloat(metaSelected.meta_estabelecida).toFixed(0))*100).toFixed(0) }} %
                      </p>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="pa-0 ma-0">
              <CabecalhoUsuario :userSelected="userSelected" :periodo="getPeriodo" :totalMeta="getTotalProdutividade"/>
            </v-col>
          </PageWrapper>
        </v-row>
        <v-row>
          <PageWrapper class="pa-0">
            <v-col cols=12 class="pa-0">
              <List v-if="getUserData.id_area == 1" :ano="getAno" :mes="getMes" :disabled="metaSelected.fl_relatorio_enviado || getModalMeta.readonly" :total="metaSelected.meta_alcancada ? metaSelected.meta_alcancada.pontos : 0"/>
            </v-col>

            <v-col cols=12>
                <v-checkbox
                  v-model="model.fl_afastamento_legal"
                  label="Servidor esteve durante o periodo em afastamento legal(periodo de atestados médicos, licenças, afastamentos, férias, outros)"
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
              <v-textarea
                v-model="model.justificativa_meta_nao_cumprida"
                :readonly="metaSelected.fl_relatorio_enviado || getModalMeta.readonly"
                label="Justificativa de meta não cumprida "
                :value="metaSelected.justificativa_meta_nao_cumprida"
                outlined
              >
              </v-textarea>
            </v-col>
            <v-col v-if="getUserData.id_area == 2" cols=12>
              <v-textarea
                v-if="!isAreaAdministrativa"
                v-model="model.tx_relatorio"
                :readonly="metaSelected.fl_relatorio_enviado || getModalMeta.readonly"
                outlined
                label="Relatório mensal"
                :value="metaSelected.tx_relatorio"

                >
              </v-textarea>
            </v-col>
          </PageWrapper>

        </v-row>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn v-if="!metaSelected.fl_relatorio_enviado" :disabled="getModalMeta.readonly" color="green" :loading="loading" @click="enviarRelatorio()"> <span class="white--text">ENVIAR RELATORIO</span> </v-btn>
        <v-btn v-if="dirty" color="primary" @click="save()">ATUALIZAR</v-btn>
        <v-btn color="primary" text @click="handleClose()">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CabecalhoUsuario from '../application/administrator/user/CabecalhoUsuario.vue'
import List from '../application/administrator/user/servidor/List.vue'
import PageWrapper from '@/components/template/PageWrapper.vue';

export default {
  components:{
    CabecalhoUsuario,
    List,
    PageWrapper
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
      loading: false,
      show: true,
      status_devolvido : 3,
      model:null,
      dirty: false
    };
  },
  computed: {
    ...mapGetters('atividade', [
      'getList'
    ]),
    ...mapGetters('modal', ['getModalMeta']),
    getPeriodo(){
      if(this.metaSelected)
      return `${("00" + this.metaSelected.mes_meta).slice(-2)}/${this.metaSelected.ano_meta}`;
      else
      return "";
    },
    getTotalProdutividade(){
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const produtividade = this.getList.filter((item) => parseInt(item.ano_periodo) == parseInt(this.getAno) && parseInt(item.mes_periodo) == parseInt(this.getMes) ).map((item)=> parseInt(item.pontuacao_atividade * item.qtde_atividade));
      if(produtividade.length > 0){
        return produtividade.reduce(reducer)
      }else{
        return null;
      }
    },
    getAno(){
      return this.getPeriodo.split("/")[1]
    },
    getMes(){
      return this.getPeriodo.split("/")[0]
    },
    modelJSON(){
      return {
        ...this.metaSelected,
        ...this.model
      }
    },
    isGestor(){
      return localStorage.getItem('sistema_perfil') == 'GESTOR';
    },
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
    getUnidade(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data.id_area;
    },
    isAreaAdministrativa(){
      return this.getUnidade == 1;
    }
  },
  watch:{
    metaSelected(){
      this.model = {
        ...this.metaSelected
      };
      this.model.meta_estabelecida = Math.floor(this.model.meta_estabelecida);
    },
    model:
    {
      handler(newVal, oldVal)
      {
        if(oldVal)
        this.dirty = true;
      },
      deep: true
    }
  },
  mounted(){
    this.model = {
      ...this.metaSelected
    }
    this.model.meta_estabelecida = Math.floor(this.model.meta_estabelecida);
    this.dirty = false;
  },

  methods: {
    ...mapActions('modal', ['setModalMeta']),
    ...mapActions('administration', ['fetchJustificativa','fetchUseMetaByCPF','fetchEnviarRelatorio']),
    handleClose() {
      this.setModalMeta({
        show: false
      });
    },
    async enviarRelatorio(){
      this.loading = true;
      await this.fetchJustificativa(this.modelJSON);
      await this.fetchEnviarRelatorio(this.metaSelected.id);
      await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
      this.loading = false;
      this.handleClose();
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
