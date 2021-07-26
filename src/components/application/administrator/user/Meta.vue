<template>
  <div>

    <v-card flat class="pl-6 pr-6">
      <v-card-text>
        <v-row>
          <v-col>
          <CabecalhoUsuario :userSelected="userSelected" :userSelectedTable="userSelectedTable"/>
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
                  Meta ajustada
                </th>
                <th class="text-center">
                  Meta alcançada
                </th>
                <th class="text-center">
                  % de comprimento
                </th>
                <th class="text-center">
                  Justificativa ajuste de meta
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
                v-for="item in getUserSelectedMeta.sort()"
                :key="item.name"
              >
                <td class="text-left">{{ `${getPeriodo(item.mes_meta,item.ano_meta)}` }}</td>
                <td class="text-center">{{ item.meta_estabelecida }}</td>
                <td class="text-center">{{ item.meta_ajustada }}</td>
                <td class="text-center">{{ item.meta_alcancada }}</td>
                <td class="text-center">{{ calculaAlcancouMeta((!item.meta_ajustada? item.meta_estabelecida:item.meta_ajustada) , item.meta_alcancada) + '%' }}
                  <v-icon :color="calculaAlcancouMeta((!item.meta_ajustada? item.meta_estabelecida:item.meta_ajustada) , item.meta_alcancada) > 99 ? 'green' : 'red'">
                    mdi-check-circle
                  </v-icon>
                </td>
                <td class="text-center">{{ item.justificativa_meta_ajustada }}</td>
                <td class="text-center">{{ item.justificativa_meta_nao_cumprida }}</td>

                <td class="text-right">
                  <v-btn
                  v-if="
                  (
                   (item.meta_ajustada && item.meta_ajustada > item.meta_alcancada && (!item.gestoravaliacaojustificativa || (item.gestoravaliacaojustificativa && item.gestoravaliacaojustificativa.status_avaliacao != 'ACEITA'))) ||
                   (!item.meta_ajustada  && item.meta_estabelecida && item.meta_estabelecida > item.meta_alcancada && (!item.gestoravaliacaojustificativa || (item.gestoravaliacaojustificativa && item.gestoravaliacaojustificativa.status_avaliacao != 'ACEITA')))
                  )
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
                      v-else
                      fab
                      dark
                      x-small
                      color="green"

                    >
                    <v-icon color="white">
                      mdi-check
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
    <ModalMeta :metaSelected="metaSelected" :userSelected="userSelected"/>
  </div>
</template>

<script>
import CabecalhoUsuario from './CabecalhoUsuario.vue'
import { mapActions, mapGetters } from 'vuex';
import ModalMeta from '@/components/utils/ModalMeta.vue';

export default {
  components: {
    CabecalhoUsuario,
    ModalMeta
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
      //await this.fetchUseMetaByCPF('49304178215');
      //alert(this.userSelected.cpf_usuario);
      //await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    }
  },
  async mounted() {
    console.log(4)
    await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
   // await this.fetchUseMetaByCPF('49304178215');

  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedMeta'])
  },
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
    ...mapActions('modal', ['setModalMeta']),
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
