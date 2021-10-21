<template>
  <PageWrapper>
    <PageHeader>
      <template v-slot:header-extra-content>
        <AddButton :onClick="addUnit">Adicionar novo</AddButton>
      </template>
    </PageHeader>
    <PageContent>
      <v-card>
        <v-card-title>
          <v-container pa-0>
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" sm="7" md="8" class="mb-4 mb-sm-0"
                >Listagem de undiade</v-col
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
                  :items="getList"
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
                      :onClick="() => handleEditUnit(item)"
                    />

                    <DeleteButton :onClick="() => deleteUnitShow(item)" />
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <AddUnitModal />
      <EditUnitModal :unitSelected="unitSelected" />
      <DeleteUnitModal :unitSelected="unitSelected" />
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
import AddUnitModal from '@/components/application/administrator/unit/AddUnitModal.vue';
import EditUnitModal from '@/components/application/administrator/unit/EditUnitModal.vue';
import DeleteUnitModal from '@/components/application/administrator/unit/DeleteUnitModal.vue';
import EditButton from '@/components/template/buttons/EditButton.vue';

export default {
  components: {
    PageWrapper,
    PageHeader,
    PageContent,
    AddUnitModal,
    EditUnitModal,
    DeleteUnitModal,
    AddButton,
    DeleteButton,
    EditButton,
  },
  data() {
    return {
      unitSelected: {
        id: null,
        description: null,
        status: null,
      },
      search: '',
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'nm_unidade',
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
    ...mapGetters('unit', [
      'getList'
    ]),
  },
  async created() {
    await this.getAll();
  },
  methods: {
    ...mapActions('unit', ['getAll']),
    ...mapActions('modal', [
      'addUnit',
      'editUnit',
      'deleteUnit',
    ]),
    async deleteUnitShow(selected) {
      this.unitSelected = selected;
      this.deleteUnit();
    },
    handleEditUnit(item) {
      this.unitSelected = item;

      this.editUnit();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.fetchGroupList();
    next();
  },
};
</script>
