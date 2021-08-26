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
            <v-simple-table dense height="600px">
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
                      Meta Ajustada
                    </th>
                    <th class="text-center">
                      Pontuação Obtida
                    </th>
                    <th class="text-center">
                      % de cumprimento
                    </th>
                    <th class="text-center">
                      Justificativa não cumprimento
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
                    <td class="text-center">{{ item.meta_estabelecida}} </td>
                    <td class="text-center">{{ item.meta_ajustada}} </td>
                    <td class="text-center">{{ metaAlcancada(item.meta_alcancada)}}</td>
                    <td class="text-center">{{ calculaAlcancouMeta(item.meta_estabelecida, metaAlcancada(item.meta_alcancada)) + '%' }}
                  <v-icon :color="calculaAlcancouMeta((!item.meta_ajustada? item.meta_estabelecida:item.meta_ajustada) , item.meta_alcancada) > 99 ? 'green' : 'red'">
                    mdi-check-circle
                  </v-icon>
                </td>
                    <td class="text-center">{{ item.justificativa_meta_nao_cumprida }}</td>
                    <td class="text-right">
                      <v-btn
                        v-if="item.tx_relatorio && isGestor && !item.gestoravaliacaojustificativa"
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
                        v-if="item.tx_relatorio && isGestor && item.gestoravaliacaojustificativa"
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
    <ModalAvaliacao :metaSelected="metaSelected" :userSelected="userSelected" :userSelectedTable="userSelectedTable"/>
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
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedMeta'])
    ,
    isGestor(){
      return localStorage.getItem('sistema_perfil') == 'GESTOR';
    }
  },
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
     ...mapActions('modal', ['setModalJustificativaServidor','setModalAvaliacao']),
    calculaAlcancouMeta(meta_estabelecida, meta_alcancada) {
      return (Math.round((meta_alcancada / meta_estabelecida) * 100))
    },
    metaAlcancada(metaObject){
      return metaObject ? metaObject.pontos : 0;
    },
    justificar(item){
      console.log(item)
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
</style>
