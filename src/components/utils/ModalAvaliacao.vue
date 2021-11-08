<template>
  <v-dialog v-model="getModalAvaliacao.show" persistent >
    <v-card>
      <v-card-title class="text-h6 mb-4 text-center d-flex justify-center"><p class=" text-center">Acompanhamento de teletrabalhador para o gestor</p></v-card-title>
      <v-card-text class="text-body-2">
        <v-divider></v-divider>
        <v-row class="pa-0 ma-0">
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
          <v-col class="pa-0 ma-0 mt-4">
            <CabecalhoUsuario :userSelected="userSelected" :periodo="getPeriodo" :userSelectedTable="userSelectedTable" :totalMeta="getTotalProdutividade"/>
          </v-col>
          <v-col cols=12 class="">
            <List v-if="userSelected.id_area == 1" :ano="getAno" :mes="getMes" :cpfServidor="userSelected.cpf_usuario" :total="metaSelected.meta_alcancada ? metaSelected.meta_alcancada.pontos : 0"/>
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
                disabled
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
          <v-col>
            <v-textarea
              v-model="model.justificativa_meta_nao_cumprida"
              readonly
              dense
              label="Justificativa para o não-cumprimento da meta">
            </v-textarea>
          </v-col>
          <v-col>
            <v-textarea
              v-if="!isAreaAdministrativa"
              v-model="model.tx_relatorio"
              readonly
              dense
               label="Relatório Mensal"
              >
            </v-textarea>
          </v-col>
        </v-row>

        <v-dialog
          v-model="dialogRejeitar"
          width="300"
        >
          <v-card>
            <v-card-title>
              Confirmação de rejeição
            </v-card-title>

            <v-card-text>
              <v-textarea
              v-model="model.descricao">

              </v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="red"
                text
                @click="dialogRejeitar = false"
              >
                VOLTAR
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!model.descricao"
                color="primary"
                text
                @click="save(2)"
              >

                REJEITAR
                <v-icon color="primary">mdi-cancel</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogConfirmar"
          width="300"
        >
          <v-card>
            <v-card-title class="text-h6">
              Confirmação de aprovação
            </v-card-title>
            <v-card-text>
              <v-textarea
                v-model="model.descricao">

              </v-textarea>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="red"
                text
                @click="dialogConfirmar = false"
              >
                VOLTAR
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
              :disabled="!model.descricao"
                color="primary"
                text
                @click="save(1)"
              >

                  Confirmar
                <v-icon color="primary">mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogDevolver"
          width="300"
        >
          <v-card>
            <v-card-title class="text-h6">
              Confirmação de devolução
            </v-card-title>
            <v-card-text>
              <v-textarea
                v-model="model.descricao">

              </v-textarea>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                color="red"
                text
                @click="dialogDevolver = false"
              >
                VOLTAR
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
              :disabled="!model.descricao"
                color="primary"
                text
                @click="save(3)"
              >

                  Confirmar
                <v-icon color="primary">mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-btn v-if="metaSelected.fl_relatorio_enviado" color="#69F0AE" outlined @click="dialogConfirmar =  true">
          <span class="green-accent-2--text">Aprovar Relatório</span> <v-icon color="69F0AE">mdi-check</v-icon></v-btn>
        <v-btn v-if="metaSelected.fl_relatorio_enviado" color="yellow darken-1" text  @click="dialogDevolver =  true">
          Devolver Relatório<v-icon color="yellow darken-1">mdi-cancel</v-icon></v-btn>
        <v-btn v-if="metaSelected.fl_relatorio_enviado" color="red" text  @click="dialogRejeitar=true; model.descricao = null">
          Rejeitar Relatório<v-icon color="red">mdi-cancel</v-icon></v-btn>
        <v-btn color="primary" text @click="handleClose()">VOLTAR<v-icon color="primary">mdi-close</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CabecalhoUsuario from '../application/administrator/user/CabecalhoUsuario.vue'
import List from '../application/administrator/user/servidor/List.vue'
export default {
components:{
  CabecalhoUsuario,
  List
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
      status_devolvido : 3,
      justificativa: null,
      dialogRejeitar: false,
      dialogConfirmar: false,
      dialogDevolver: false,
      statusAvaliacao: null,
      model:{
        ...this.metaSelected,
        descricao: ""
      }
    };
  },
  computed: {
    ...mapGetters('atividade', [
      'getList'
    ]),
    ...mapGetters('modal', ['getModalAvaliacao']),
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
    getGestor(){
      return JSON.parse(localStorage.getItem('token_sistema_gestor_data'));
    },
    modelJSON(){
      return {
        metaUsuario: {
          ...this.metaSelected
        },
        dt_avaliacao: new Date(),
        status_avaliacao: {
          id: this.statusAvaliacao
          },
        descricao: this.model.descricao,
        id_gestor: this.getGestor.id
      }
    },
    getUnidade(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data.id_area;
    },
    isAreaAdministrativa(){
      return this.userSelected.id_area == 1;
    }
  },
  watch:{
    metaSelected(novosDados){
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
