<template>
  <PageWrapper>
    <PageHeader>
    </PageHeader>
    <PageContent>
      <v-card>
        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de Propostas</v-col
              >
              <v-col cols="12" sm="5" md="4">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="Buscar"
                  label="Buscar"
                  single-line
                  hide-details
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container pa-0>
            <v-row no-gutters>
              <v-col cols="12">
                <v-data-table
                  :no-results-text="'Sem resultados'"
                  :header-props="{ sortByText: 'Ordenar por'}"
                  :footer-props="{
                    itemsPerPageText: 'Itens por página',
                    itemsPerPageAllText: 'Todos',
                  }"
                  :items="getListCustom"
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.ativo="{ item }">
                    <v-chip
                      small
                      class="font-weight-bold"
                      :color="chips[`${item.ativo}`].background"
                      :text-color="chips[`${item.ativo}`].labelColor"
                    >
                      <v-icon left large> mdi-circle-small </v-icon>
                      <span>
                        {{ chips[`${item.ativo}`].label }}
                      </span>
                    </v-chip>
                  </template>

                  <template v-slot:item.acoes="{ item }">
                    <EditButton
                      class="mr-1"
                      :nome="'Avaliar'"
                      :onClick="() => handleEditProposta(item)"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddModal />
      <EditPropostaModal :propostaSelected="propostaSelected" />
      <DeletePropostaModal :propostaSelected="propostaSelected" />
    </PageContent>
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';
import AddButton from '@/components/template/buttons/AddButton.vue';
import DeleteButton from '@/components/template/buttons/DeleteButton.vue';
import AddModal from './AddModal.vue';
import EditPropostaModal from '@/components/application/administrator/user/proposta_meta_gestor/EditPropostaModal.vue';
import DeletePropostaModal from '@/components/application/administrator/user/proposta_meta_gestor/DeletePropostaModal.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddModal,
    EditPropostaModal,
    DeletePropostaModal,
    AddButton,
    DeleteButton,
    EditButton,
  },
  data() {
    return {
      propostaSelected: {
        id: null,
        description: null,
        status: null,
      },
      search: '',
      headers: [
        {
          text: 'Periodo',
          align: 'start',
          sortable: true,
          value: 'descricaoPeriodo',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Status Avaliação',
          align: 'start',
          sortable: true,
          value: 'status_avaliacao.nm_status',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Ação',
          value: 'acoes',
          align: 'center',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
      ],
      chips: {
        T: {
          label: 'Ativo',
          labelColor: '#007F00',
          background: '#CDFFCD',
        },
        F: {
          label: 'Inativo',
          labelColor: '#DE0129',
          background: '#FCE6EA',
        },
      },
    };
  },
  computed: {
    ...mapGetters('proposta', [
      'getList'
    ]),
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
    getListCustom(){
      return this.getList.map((item)=>{
        return {
          ...item,
          descricaoPeriodo : `${("00" + item.periodo.mes_inicio_periodo).slice(-2)}/${item.periodo.ano_inicio_periodo} à ${("00" + item.periodo.mes_fim_periodo).slice(-2)}/${item.periodo.ano_fim_periodo}`

        }
      })
    }
  },
  async created() {
    await this.getByCpf(this.$route.params.cpf);
    await this.getPropostaPeriodos();
    await this.getPropostaStatus();
  },
  methods: {
    ...mapActions('proposta', ['getByCpf', 'getPropostaPeriodos', 'getPropostaStatus']),
    ...mapActions('modal', [
      'addProposta',
      'editProposta',
      'deleteProposta',
    ]),
    async deletePropostaShow(selected) {
      this.propostaSelected = selected;
      this.deleteProposta();
    },
    handleEditProposta(item) {
      this.propostaSelected = item;
      this.editProposta();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchGroupList();
    next();
  },
};
</script>
