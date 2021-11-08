<template>
  <div>
    <v-card flat class="pl-6 pr-6">
      <v-card-text>
        <v-row>
          <v-col>
          <CabecalhoUsuario :title="'Produtividade'" :userSelected="userSelected" :userSelectedTable="userSelectedTable"/>
        </v-col>
        <v-col cols=12>
            <p class="text-xl-h6 text-lg-h6">
              Histórico
            </p>
            <v-divider ></v-divider>
          </v-col>
          <v-col cols=12>
            <v-simple-table v-if="userSelected.id_area == 1" dense height="600px">
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
                            </span></td>
                    <td class="text-center"><p class="ellipsis-text">{{ item.justificativa_meta_nao_cumprida }}</p></td>
                    <td class="text-center"><p class="ellipsis-text">{{ item.gestoravaliacaojustificativa ? item.gestoravaliacaojustificativa.descricao : '-'}}</p></td>

                    <td class="text-right">
                      <v-btn
                        v-if="isGestor && item.fl_relatorio_enviado"
                          fab
                          dark
                          x-small
                          color="primary"
                          @click="avaliar(item)"
                        >
                        <v-icon color="white">
                          mdi-playlist-check
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
            <v-simple-table v-else dense height="600px">
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
                            </span></td>
                    <td class="text-center"><p class="ellipsis-text">{{ item.justificativa_meta_nao_cumprida }}</p></td>
                    <td class="text-center"><p class="ellipsis-text">{{ item.gestoravaliacaojustificativa ? item.gestoravaliacaojustificativa.descricao : '-'}}</p></td>

                    <td class="text-right">
                      <v-btn
                        v-if="isGestor && item.fl_relatorio_enviado"
                          fab
                          dark
                          x-small
                          color="primary"
                          @click="avaliar(item)"
                        >
                        <v-icon color="white">
                          mdi-playlist-check
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <ModalJustificativa :metaSelected="metaSelected" :userSelectedTable="userSelectedTable"/>
    <ModalAvaliacao v-if="getModalAvaliacao.show" :metaSelected="metaSelected" :userSelected="userSelected" :userSelectedTable="userSelectedTable"/>
  </div>
</template>

<script>
import CabecalhoUsuario from './CabecalhoUsuario.vue'
import { mapActions, mapGetters } from 'vuex';
import ModalJustificativa from '@/components/utils/ModalJustificativa.vue';
import ModalAvaliacao from '@/components/utils/ModalAvaliacao.vue';

export default {
  components: {
    CabecalhoUsuario,
    ModalJustificativa,
    ModalAvaliacao
  },
  props: {
    userSelected: {
      type: Object,
      default: () => null,
    },
    tab: {
      type: String,
      default: () => null,
    },
    userSelectedTable: {
      type: Object,
      default: () => null,
    }
  },
  data() {
    return {
      metaSelected: {}
    }
  },
  watch: {
    async tab() {
      //await this.fetchUseMetaByCPF('49304178215');

    }
  },
  async mounted() {
    //await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    //await this.fetchUseMetaByCPF('49304178215');
    await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedMeta']),
    ...mapGetters('modal', ['getModalAvaliacao']),
    isGestor(){
      return localStorage.getItem('sistema_perfil') == 'GESTOR';
    }
  },
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
     ...mapActions('modal', ['setModalJustificativaServidor','setModalAvaliacao']),
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
    calculaAlcancouMeta(meta_estabelecida, meta_alcancada) {
      return (Math.round((meta_alcancada / meta_estabelecida) * 100))
    },
    justificar(item){
      this.setModalJustificativaServidor({
        show: true
      })
      this.metaSelected = item;
    },
    avaliar(item){
      this.metaSelected = item;
      this.setModalAvaliacao({
        show: true
      });
    },
    verificar(item){
      this.metaSelected = item;
      this.setModalAvaliacao({
        show: true
      });
    },
    getPeriodo(mes, ano){
      return `${("00" + mes).slice(-2)}/${ano}`;
    }
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
