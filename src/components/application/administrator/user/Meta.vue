<template>
  <div>
    <CabecalhoUsuario/>
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
                  Meta ajustada
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
                <td class="text-center">{{ item.meta_estabelecida }}</td>
                <td class="text-center">{{ item.meta_ajustada }}</td>
                <td class="text-center">{{ item.justificativa_meta_ajustada }}</td>
                <td class="text-right">
                  <v-btn
                  v-if="!item.justificativa_meta_ajustada"
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
                  </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <ModalMeta :metaSelected="metaSelected"/>
    {{metaSelected}}
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
  },
  data() {
    return {
      metaSelected: null
    }
  },
  watch: {
    async tab() {
      await this.fetchUseMetaByCPF('49304178215');
      //await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    }
  },
  async mounted() {
    console.log(4)
    //await this.fetchUseMetaByCPF(this.userSelected.cpf_usuario);
    await this.fetchUseMetaByCPF('49304178215');

  },
  computed: {
    ...mapGetters('administration', ['getUserSelectedGroup', 'getUserSelectedMeta']),

  },
  methods: {
    ...mapActions('administration', ['fetchUseMetaByCPF']),
    ...mapActions('modal', ['setModalMeta']),
    editMeta(meta) {
      this.setModalMeta({ show: true });
      this.metaSelected = meta;
    }
  }
}
</script>

<style>
</style>
