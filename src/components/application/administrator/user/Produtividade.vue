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
                <th class="text-right">
                  Justificativa
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in getUserSelectedMeta"
                :key="item.name"
              >
                <td class="text-left">{{ `${item.mes_meta}/${item.ano_meta}` }}</td>
                <td class="text-center">{{ item.meta_estabelecida }}</td>
                <td class="text-center">{{ item.meta_alcancada }}</td>
                <td class="text-center">{{ calculaAlcancouMeta(item.meta_estabelecida , item.meta_alcancada) + '%' }}
                  <v-icon :color="calculaAlcancouMeta(item.meta_estabelecida , item.meta_alcancada) > 99 ? 'green' : 'red'">
                    mdi-check-circle
                  </v-icon>
                </td>
                <td class="text-right">{{ item.justificativa_meta_ajustada }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CabecalhoUsuario from './CabecalhoUsuario.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    CabecalhoUsuario
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
  async mounted() {
    await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);;
  },
  data() {
    return {

    }
  },
  watch: {
    async tab() {
      await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    }
  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedMeta']),
  },
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
    calculaAlcancouMeta(meta_estabelecida, meta_alcancada) {
      return (Math.round((meta_alcancada / meta_estabelecida) * 100))
    }
  }
}
</script>

<style>
</style>
