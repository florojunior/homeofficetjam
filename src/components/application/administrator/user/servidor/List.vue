<template>
  <PageWrapper class="pa-0">
    <PageHeader v-if="!cpfServidor" class="mb-4">
      <template v-slot:header-extra-content>
        <div style="mix-width: 100% !important">
          <AddButton :onClick="addAtividade" :disabled="disabled">Adicionar atividade</AddButton>
        </div>
      </template>
    </PageHeader>
      <v-card>

        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de Atividades</v-col
              >
              <v-col cols="12" sm="5" md="4">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="Buscar"
                  label="Buscar"
                  single-line
                  disabled
                  hide-details
                  outlined
                  dense
                  style="display: none"
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
                  :items="getListFilteredByPeriod"
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.pontuacao_atividade="{ item }">
                      <span v-if="item.id">
                        {{ item.pontuacao_atividade * item.qtde_atividade }}
                      </span>
                  </template>
                  <template v-slot:item.acoes="{ item }">
                    <EditButton
                      v-if="!isGestor"
                      :disabled="disabled"
                      class="mr-1"
                      :onClick="() => handleEditAtividade(item)"
                    />
                    <DeleteButton
                      v-if="!isGestor"
                      :disabled="disabled"
                      class="mr-1"
                      :onClick="() => deleteAtividadeShow(item)"
                    />
                    <v-btn
                    v-if="isGestor"
                    icon
                    color="primary"
                    small
                    @click="editAtividadeShow(item)">
                      <v-icon>
                        mdi-eye
                      </v-icon>
                    </v-btn>
                  </template>

                </v-data-table>

                <v-card class="pa-0">
                  <v-card-text class="pa-4 d-flex justify-end align-center">
                    <span class="pa-0 mr-4 text-h6 font-weight-bold">Total:</span>
                    <span class="pa-0 ma-0 text-h6 font-weight-bold" >{{total}}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddAtividadeModal :ano="ano" :mes="mes" />
      <EditAtividadeModal :ano="ano" :mes="mes" :atividade="atividadeSelected" :cpfServidor="cpfServidor" />
      <DeleteAtividadeModal :atividadeSelected="atividadeSelected" />
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import AddButton from '@/components/template/buttons/AddButton.vue';
import DeleteButton from '@/components/template/buttons/DeleteButton.vue';
import AddAtividadeModal from '@/components/application/administrator/user/servidor/AddAtividadeModal.vue';
import EditAtividadeModal from '@/components/application/administrator/user/servidor/EditAtividadeModal.vue';
import DeleteAtividadeModal from '@/components/application/administrator/user/servidor/DeleteAtividadeModal.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    AddAtividadeModal,
    EditAtividadeModal,
    DeleteAtividadeModal,
    AddButton,
    DeleteButton,
    EditButton,
  },
  props: {
    ano: {
      type: Number,
      default: () => null,
    },
    mes: {
      type: Number,
      default: () => null,
    },
    total: {
      type: String,
      default: () => null,
    },
    cpfServidor: {
      type: String,
      default: () => null,
    },
    disabled: {
      type: Boolean,
      default: () => null,
    },
  },
  data() {
    return {
      atividadeSelected: {
        id: null,
        description: null,
        status: null,
      },
      search: ``,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'MÊS/ANO (Período)',
          align: 'start',
          sortable: true,
          value: 'periodo',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Descrição',
          align: 'start',
          sortable: true,
          value: 'descricao_atividade',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Produtividade',
          align: 'start',
          sortable: true,
          value: 'pontuacao_atividade',
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
    ...mapGetters('modal', ['getModalMeta']),
    ...mapGetters('atividade', [
      'getList'
    ]),
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
    isGestor(){
      return localStorage.getItem('sistema_perfil') == 'GESTOR';
    },
    getListFilteredByPeriod(){
      let listFiltered = this.getList.filter((atividade) =>{
        return atividade.mes_periodo == this.mes && atividade.ano_periodo == this.ano;
      });

      return listFiltered;
    }
  },
  async mounted() {
    this.search = `${parseInt(this.mes) < 10 ? this.mes.replace("0","") : this.mes}/${this.ano}`;
    if(!this.cpfServidor){
      await this.getByCpfServidor(this.getUserData.cpf_usuario);
    }else{
      await this.getAtividadeByUser({cpf: this.cpfServidor, mes: this.mes, ano: this.ano});
    }

  },
  methods: {
    ...mapActions('atividade', ['getAll','getByCpfServidor',
      'getAtividadeByUser']),
    ...mapActions('modal', [
      'addAtividade',
      'editAtividade',
      'deleteAtividade'
    ]),
    async deleteAtividadeShow(selected) {
      this.atividadeSelected = { ...selected};
      this.deleteAtividade();
    },
    async editAtividadeShow(selected) {
      this.atividadeSelected = selected;
      this.editAtividade();
    },
    handleEditAtividade(item) {
      this.atividadeSelected = item;

      this.editAtividade();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    // await this.fetchGroupList();
    next();
  },
};
</script>
