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
                >Listagem de servidores</v-col
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
                  :items="getUsersListLoading ? [] : getUsersList"
                  :search="search"
                  :items-per-page="10"
                  :headers="headers"
                  :loading="getUsersListLoading"
                  loading-text="Carregando..."
                >
                  <template v-slot:item.acoes="{ item }">
                    <EditButton
                      class="mr-1"
                      :nome="'Metas'"
                      :onClick="() => handleEdit(item)"
                    />
                    <EditButton
                      class="mr-1"
                      :nome="'Planos'"
                      :onClick="() => handlePlanos(item)"
                    />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <EditUserModal :userSelected="userSelected" />
      <AvaliarAtividadesModal :userSelected="userSelected"/>
    </PageContent>
  </PageWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PageHeader from '@/components/template/PageHeader.vue';
import PageWrapper from '@/components/template/PageWrapper.vue';
import PageContent from '@/components/template/PageContent.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';
import EditUserModal from '@/components/application/administrator/user/EditUserModal.vue';
import AvaliarAtividadesModal from '@/components/application/administrator/user/gestor/AvaliarAtividadesModal.vue';

/*import AddPatientModal from '@/components/application/administrator/user/AddPatientModal.vue';
import DeleteButton from '@/components/template/buttons/DeleteButton.vue';
import DeletePatientModal from '@/components/application/administrator/patients/DeletePatientModal.vue';
import editMetasModal from '@/components/application/administrator/patients/editMetasModal.vue';
import AddPatientModal from '@/components/application/administrator/patients/AddPatientModal.vue';*/

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    EditButton,
    EditUserModal,
    AvaliarAtividadesModal
    /*DeleteButton,
    DeletePatientModal,
    editMetasModal,
    AddPatientModal,*/
  },
  data() {
    return {
      userSelected: {},
      search: '',
      headers: [
        {
          text: 'Código',
          align: 'start',
          sortable: true,
          value: 'usuario.cd_usuario',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'usuario.nm_usuario',
          class: 'text-uppercase fontsPrimaryVariant--text background darken-2',
        },
        {
          text: 'CPF',
          align: 'start',
          sortable: true,
          value: 'usuario.cpf_usuario',
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
          label: 'Bloqueado',
          labelColor: '#DE0129',
          background: '#FCE6EA',
        },
      },
    };
  },
  computed: {
    ...mapGetters('administration', [
      'getUsersList',
      'getUsersListLoading',
    ]),
  },
  async created() {
    await this.fetchUsersList(JSON.parse(localStorage.getItem('token_sistema_user_data')).data.cpf_usuario);
  },
  methods: {
    ...mapActions('administration', ['fetchUsersList']),
    ...mapActions('modal', [
      'addPreTransfusion',
      'addPatient',
      'editMetas',
      'deletePatient',
      'avaliarAtividade'
    ]),
    handleEdit(item) {
      this.userSelected = item;
      this.editMetas();
    },
    handlePlanos(item) {
      console.log(item);
      this.$router.push('/propostas/avaliacao/'+item.usuario.cpf_usuario, {});
    },
    openModalAvaliarAtividade(item){
      this.userSelected = item;
      this.avaliarAtividade();
    },
    handleDelete(item) {
      this.userSelected = item;
      this.deletePatient();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchUsersList(JSON.parse(localStorage.getItem('token_sistema_user_data')).data.cpf_usuario);
    next();
  },
};
</script>
