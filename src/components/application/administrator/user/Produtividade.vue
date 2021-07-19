<template>
  <div>
    <CabecalhoUsuario :title="'Produtividade'"/>
    <v-card flat class="pl-6 pr-6">
      <v-card-text>
        <v-row>
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
                      Pontuação Obtida
                    </th>
                    <th class="text-center">
                      % de comprimento
                    </th>
                    <th class="text-center">
                      Justificativa
                    </th>
                    <th class="text-right">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in getUserSelectedMeta"
                    :key="item.name"
                  >
                    <td class="text-left">{{ `${item.mes_meta}/${item.ano_meta}` }}</td>
                    <td class="text-center">{{ item.meta_estabelecida}} </td>
                    <td class="text-center">{{ item.meta_alcancada }}</td>
                    <td class="text-center">{{ calculaAlcancouMeta(item.meta_estabelecida , item.meta_alcancada) + '%' }}
                      <v-icon :color="calculaAlcancouMeta(item.meta_estabelecida , item.meta_alcancada) > 99 ? 'green' : 'red'">
                        mdi-check-circle
                      </v-icon>
                    </td>
                    <td class="text-center">{{ item.justificativa_meta_ajustada }}</td>
                    <td class="text-right">
                      <v-btn
                        v-if="!item.justificativa_meta_nao_cumprida && !isGestor"
                          fab
                          dark
                          x-small
                          color="primary"
                          @click="justificar(item)"
                        >
                        <v-icon color="white">
                          mdi-file-chart
                        </v-icon>
                      </v-btn>
                      <v-btn
                        v-if="item.justificativa_meta_nao_cumprida && isGestor && !item.gestoravaliacaojustificativa"
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
                        v-if="item.justificativa_meta_nao_cumprida && isGestor && item.gestoravaliacaojustificativa"
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
    <ModalJustificativa :metaSelected="metaSelected"/>
    <ModalAvaliacao :metaSelected="metaSelected"/>
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
  },
  data() {
    return {
      metaSelected: {}
    }
  },
  watch: {
    async tab() {
      await this.fetchUseMetaByCPF('49304178215');
      //await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    }
  },
  async mounted() {
    console.log(localStorage.getItem('sistema_perfil'))
    //await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    await this.fetchUseMetaByCPF('49304178215');
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
    }
  }
}
</script>

<style>
</style>
