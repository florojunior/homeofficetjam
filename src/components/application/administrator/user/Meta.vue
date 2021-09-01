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
              <v-card>
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
                            Justificativa de meta nao atingida
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
                          <td class="text-center">{{ Math.floor(item.meta_estabelecida) }}</td>
                          <td class="text-center">{{ item.meta_alcancada ? item.meta_alcancada.pontos : '' }}</td>
                          <td class="text-center">{{ calculaAlcancouMeta(item.meta_estabelecida, metaAlcancada(item.meta_alcancada)) + '%' }}
                          <v-icon :color="calculaAlcancouMeta((item.meta_estabelecida) , metaAlcancada(item.meta_alcancada)) > 99 ? 'green' : 'red'">
                            mdi-check-circle
                          </v-icon>
                          <td class="text-center">{{ item.justificativa_meta_nao_cumprida }}</td>

                          <td class="text-right">
                            <v-btn
                              v-if="isAreaAdministrativa"
                              :disabled="(item.gestoravaliacaojustificativa && (item.gestoravaliacaojustificativa.status_avaliacao == 'ACEITA' || item.gestoravaliacaojustificativa.status_avaliacao == 'REJEITADA'))"
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
                                v-if="item.gestoravaliacaojustificativa && item.gestoravaliacaojustificativa.status_avaliacao == 'ACEITA'"
                                fab
                                dark
                                x-small
                                color="green"

                              >
                              <v-icon color="white">
                                mdi-check
                              </v-icon>
                            </v-btn>
                            <v-btn
                                v-if="item.gestoravaliacaojustificativa && item.gestoravaliacaojustificativa.status_avaliacao == 'REJEITADA'"
                                fab
                                dark
                                x-small
                                color="red"

                              >
                              <v-icon color="white">
                                mdi-close
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
import List from '../user/servidor/List.vue'
import PageWrapper from '@/components/template/PageWrapper.vue';

export default {
  components: {
    CabecalhoUsuario,
    ModalMeta,
    List,
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
  watch: {
    async tab() {
    }
  },
  async mounted() {
    await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);

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
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
    ...mapActions('modal', ['setModalMeta']),
    metaAlcancada(metaObject){
      return metaObject ? metaObject.pontos : 0;
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
</style>
