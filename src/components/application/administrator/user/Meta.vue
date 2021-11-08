<template>
  <div>
    <v-card flat class="pl-6 pr-6">
      <v-card-text>
        <v-row>
          <PageWrapper class="pa-0">
            <v-col cols=12 class="pa-0 mb-6 mt-6">
              <CabecalhoUsuario :userSelected="userSelected" :userSelectedTable="userSelectedTable"/>
            </v-col>
            <v-col cols=12 class="pa-0 mb-4">
                <p class="text-xl-h6 text-lg-h6">
                  Histórico
                </p>
                <v-divider class="pb-4"></v-divider>
            </v-col>
          </PageWrapper>
          <v-col cols=12 class="pa-0">
            <PageWrapper class="pa-0">

              <!-- area adminstrativa -->

              <v-card v-if="isAreaAdministrativa">
                <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Período
                          </th>
                          <th class="text-center">
                            Meta Estabelecida
                          </th>
                          <th class="text-center">
                            Meta alcançada
                          </th>
                          <th class="text-center">
                            % de cumprimento
                          </th>
                          <th class="text-center">
                            Status
                          </th>
                          <th class="text-center">
                            Justificativa de meta nao atingida
                          </th>
                          <th class="text-center">
                            Avaliação
                          </th>
                          <th class="text-right">
                            Relatório
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in getUserSelectedMeta"
                          :key="item.name"
                        >
                          <td class="text-left">{{ `${getPeriodo(item.mes_meta,item.ano_meta)}` }}</td>
                          <td class="text-center">{{ Math.ceil(parseFloat(item.meta_estabelecida)) }}</td>
                          <td class="text-center">{{ metaAlcancada(item.atividades) }}</td>
                          <td class="text-center">{{ calculaAlcancouMeta(item.meta_estabelecida, metaAlcancada(item.atividades)) + '%' }}
                          <v-icon :color="calculaAlcancouMeta((item.meta_estabelecida) , metaAlcancada(item.atividades)) > 99 ? 'green' : 'red'">
                            mdi-check-circle
                          </v-icon>
                          <td class="text-center">
                            <v-chip
                              v-if="getStatusDescription(item.fl_relatorio_enviado,item.gestoravaliacaojustificativa)"
                              small
                              class="ma-2"
                              :color="getColor(item.fl_relatorio_enviado, item.gestoravaliacaojustificativa)"
                              dense
                            >
                              <span class="text-uppercase white--text" >{{ getStatusDescription(item.fl_relatorio_enviado, item.gestoravaliacaojustificativa) }}</span>
                            </v-chip>
                            <span v-else>
                              -
                            </span>
                          </td>
                          <td class="text-center"><p class="ellipsis-text">{{ item.justificativa_meta_nao_cumprida }}</p></td>
                          <td class="text-center"><p class="ellipsis-text">{{ item.gestoravaliacaojustificativa ? item.gestoravaliacaojustificativa.descricao : '-'}}</p></td>

                          <td class="text-right">
                            <v-btn
                              v-if="isAreaAdministrativa"
                              :disabled="(item.gestoravaliacaojustificativa && (item.gestoravaliacaojustificativa.status_avaliacao.id  == 1 || item.gestoravaliacaojustificativa.status_avaliacao.id  == 2))"
                              fab
                              dark
                              x-small
                              color="primary"
                              @click="editMeta(item)"
                            >
                              <v-icon color="white">
                                mdi-pencil
                              </v-icon>
                            </v-btn>
                            <v-btn
                              fab
                              dark
                              x-small
                              color="green"
                              @click="verificar(item)"
                            >
                              <v-icon color="white">
                                mdi-eye
                              </v-icon>
                            </v-btn>
                            </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>

              <!-- area judiciaria -->

              <v-card v-if="!isAreaAdministrativa">
                <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Período
                          </th>
                          <th class="text-center">
                            Meta Estabelecida
                          </th>
                          <th class="text-center">
                            Meta alcançada
                          </th>
                          <th class="text-center">
                            % de cumprimento
                          </th>
                          <th class="text-center">
                            Status
                          </th>
                          <th class="text-center">
                            Justificativa de meta nao atingida
                          </th>
                          <th class="text-center">
                            Avaliação
                          </th>
                          <th class="text-right">
                            Relatório
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in getUserSelectedMeta"
                          :key="item.name"
                        >
                          <td class="text-left">{{ `${getPeriodo(item.mes_meta,item.ano_meta)}` }}</td>
                          <td class="text-center">{{ Math.ceil(parseFloat(item.meta_estabelecida)) }}</td>
                          <td class="text-center">{{ item.meta_alcancada ? item.meta_alcancada.pontos : 0 }}</td>
                          <td class="text-center">{{ calculaAlcancouMeta(parseInt(item.meta_estabelecida), parseInt(item.meta_alcancada ? item.meta_alcancada.pontos : 0)) + '%' }}
                          <v-icon :color="calculaAlcancouMeta(parseInt(item.meta_estabelecida) , parseInt(item.meta_alcancada ? item.meta_alcancada.pontos : 0)) > 99 ? 'green' : 'red'">
                            mdi-check-circle
                          </v-icon>
                          <td class="text-center">
                            <v-chip
                              v-if="getStatusDescription(item.fl_relatorio_enviado,item.gestoravaliacaojustificativa)"
                              small
                              class="ma-2"
                              :color="getColor(item.fl_relatorio_enviado, item.gestoravaliacaojustificativa)"
                              dense
                            >
                              <span class="text-uppercase white--text" >{{ getStatusDescription(item.fl_relatorio_enviado, item.gestoravaliacaojustificativa) }}</span>
                            </v-chip>
                            <span v-else>
                              -
                            </span>
                          </td>
                          <td class="text-center"><p class="ellipsis-text">{{ item.justificativa_meta_nao_cumprida }}</p></td>
                          <td class="text-center"><p class="ellipsis-text">{{ item.gestoravaliacaojustificativa ? item.gestoravaliacaojustificativa.descricao : '-'}}</p></td>


                          <td class="text-right">
                            <v-btn
                              v-if="((item.gestoravaliacaojustificativa && item.gestoravaliacaojustificativa.status_avaliacao.id  == 3)
                              || (item.meta_alcancada && parseInt(item.meta_estabelecida) > parseInt(item.meta_alcancada.pontos))
                              || !item.meta_alcancada)
                              &&
                              (!item.gestoravaliacaojustificativa || (item.gestoravaliacaojustificativa && item.gestoravaliacaojustificativa.status_avaliacao.id  == 3))
                              &&
                              (!item.fl_relatorio_enviado)
                              "
                              fab
                              dark
                              x-small
                              color="primary"
                              @click="editMeta(item)"
                            >
                              <v-icon color="white">
                                mdi-pencil
                              </v-icon>
                            </v-btn>
                              <v-btn
                                fab
                                dark
                                x-small
                                color="green"
                                @click="verificar(item)"
                              >
                              <v-icon color="white">
                                mdi-eye
                              </v-icon>
                            </v-btn>


                            </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </PageWrapper>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <ModalMeta v-if="getModalMeta.show" :metaSelected="metaSelected" :userSelected="userSelected"/>
  </div>
</template>

<script>
import CabecalhoUsuario from './CabecalhoUsuario.vue'
import { mapActions, mapGetters } from 'vuex';
import ModalMeta from '@/components/utils/ModalMeta.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';

export default {
  components: {
    CabecalhoUsuario,
    ModalMeta,
    PageWrapper
  },
  props: {
    userSelected: {
      type: Object,
      default: () => null,
    },
    userSelectedTable: {
      type: Object,
      default: () => null,
    }
  },
  data() {
    return {
      metaSelected: null
    }
  },
  computed: {
    ...mapGetters('modal', ['getModalMeta']),
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedMeta']),

    getUnidade(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data.id_area;
    },
    isAreaAdministrativa(){
      return this.getUnidade == 1;
    }
  },
  watch: {
    async tab() {
    }
  },
  async mounted() {
    await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);

  },
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
    ...mapActions('modal', ['setModalMeta']),
    getColor(flagAguardandoAvaliacao, status){
      if(flagAguardandoAvaliacao){
        return 'primary'
      }

      if(status && status.status_avaliacao.id == 1){
        return 'green';
      }else if(status && status.status_avaliacao.id == 2){
        return 'red';
      }else if(status && status.status_avaliacao.id == 3){
        return '#FF9800';
      } else {
        return 'primary';
      }
    },
    verificar(item){
      this.metaSelected = item;
      this.setModalMeta({ show: true, readonly: true });
    },
    getStatusDescription(flagAguardandoAvaliacao, gestorAvaliacao){

      if(flagAguardandoAvaliacao){
        return "Aguardando Avaliação"
      }

      if(!gestorAvaliacao)
        return false;

      return gestorAvaliacao.status_avaliacao.nm_status;
    },
    metaAlcancada(list){
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const produtividade = list.map((item)=> parseInt(item.pontuacao_atividade) * parseInt(item.qtde_atividade));
      if(produtividade.length > 0){
        return produtividade.reduce(reducer)
      }else{
        return 0;
      }
    },
    editMeta(meta) {
      this.setModalMeta({ show: true });
      this.metaSelected = meta;
    },
    getPeriodo(mes, ano){
      return `${("00" + mes).slice(-2)}/${ano}`;
    },
    calculaAlcancouMeta(meta_estabelecida, meta_alcancada) {
      return (Math.round((meta_alcancada / meta_estabelecida) * 100))
    },
  }
}
</script>

<style>
    .ellipsis-text{
      white-space: nowrap;
      max-width: 300px;
      overflow: hidden;              /* "overflow" value must be different from "visible" */

      text-overflow:    ellipsis;
    }
</style>
