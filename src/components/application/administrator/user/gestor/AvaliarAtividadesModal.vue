<template>
  <v-dialog v-if="visible" v-model="visible" persistent>
    <v-card>

      <v-card-text class="text-body-2 pa-12">
        <v-row>
          <v-col cols=12 class="pb-0 mb-0 text-h6">
            <p>Filtros</p>
          </v-col>
          <v-col cols=12 class="d-flex justify-space-between">
            <span class="d-flex">
              <v-select
                v-model="filtro.mes"
                :items="mesesPeriodo"
                label="Selecione o mês"
              ></v-select>
              <v-select
                v-model="filtro.ano"
                class="ml-6"
                :items="anosPeriodo"
                label="Selecione o ano"
              ></v-select>
              <v-btn
                color="green lighten-1 mt-1 ml-6"
                large
                @click="pesquisar()"
              >
                <v-icon left small color="black lighten-2"> mdi-magnify </v-icon>
                <span class="text-caption font-weight-bold"> Pesquisar </span>
              </v-btn>
            </span>
            <v-btn
              v-if="list && list.length > 0"
              color="primary mt-1 ml-6"
              large
              @click="aprovarPeriodo()"
            >
              <v-icon left small color="white lighten-2"> mdi-check </v-icon>
              <span class="text-caption font-weight-bold"> APROVAR PERIODO </span>
            </v-btn>
          </v-col>
          <v-col cols=12>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Descricao
                    </th>
                    <th class="text-left">
                      Pontuação
                    </th>
                    <th class="text-left">
                      Data Atividade
                    </th>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in list"
                    :key="item.name"
                  >
                    <td>{{ item.descricao_atividade }}</td>
                    <td>{{ item.pontuacao_atividade }}</td>
                    <td>{{ new Date(item.dt_inicio_atividade).toLocaleDateString() }}</td>
                    <td>
                      {{  item.atividadeavaliacao ? item.atividadeavaliacao.atividade_status.nm_status : 'AGUARDANDO AVALIAÇÃO' }}
                    </td>
                    <td>
                      <v-btn
                        v-if="!item.atividadeavaliacao"
                        color="green"
                        small
                        dark
                        @click="openAprovarDialog(item)"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions
        class="pb-2 px-8 d-flex justify-center align-center flex-column-reverse flex-sm-row justify-sm-end"
      >
        <v-btn
          class="white--text mt-4 mt-sm-0"
          depressed
          color="primary"
          :disabled="loading"
          @click="closeModal()"
          >fechar</v-btn
        >
      </v-card-actions>-
    </v-card>


    <!-- Confirmação de aprovacao -->
    <v-dialog
      v-model="monstarConfirmacao"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5 d-flex justify-space-between">
          Avaliar

          <v-btn
            color="primary darken-1"
            icon
            @click="monstarConfirmacao = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text
          label="Observação">
          Ao aceitar a atividade, está pontuação será adicianada a meta alcançada do servidor
          <v-textarea
          v-model="relatorio">

          </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="reprovar()"
          >
            reprovar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="aprovar()"
          >
            Aprovar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import unmaskText from '@/utils/unmaskText';
import formattedBirthdate from '@/utils/formattedBirthdate';
export default {
  name: 'AvaliarAtividadesForm',
  components: {
  },
  props: {
    userSelected: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      laoding: false,
      relatorio: "",
      monstarConfirmacao: false,
      filtro:{Mes: null, ano: null},
      visible: false,
      mesesPeriodo: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      anosPeriodo: [
        "2021",
        "2022",
        "2023",
        "2024",
        "2025"
      ],
      list:[],
      atividadeSelecionada : null
    };
  },
  computed: {
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
    getGestorData(){
      return JSON.parse(localStorage.getItem('token_sistema_gestor_data'))
    },

  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/avaliarAtividade') {
          if (this.userSelected !== null) {
            this.visible = true;
            //this.servidor = await this.fetchUserByCpf(this.userSelected.usuario.cpf_usuario)
          }
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('atividade', ['getAtividadeByUser', 'updateAtividade', 'updateAtividadeAvaliacao', 'createAtividadeAvaliacao', 'createAtividadeAvaliacaoEmLote']),
    keepModalOpen() {
      this.loading = false;
    },
    async aprovarPeriodo(){
      await this.createAtividadeAvaliacaoEmLote(
        {
        ...this.filtro,
        cpf: this.userSelected.usuario.cpf_usuario}
      )
      this.monstarConfirmacao = false;
      await this.pesquisar();
    },
    async aprovar(){
      await this.createAtividadeAvaliacao(
        {
          atividade: {...this.atividadeSelecionada},
          gestor_avaliador: {...this.getGestorData},
          atividade_status: {
            id: 1,
            nm_status: 'ACEITA',
            dt_avaliacao: new Date().toISOString()
          },
          descricao_avaliacao: this.relatorio
        }
      )
      this.monstarConfirmacao = false;
      await this.pesquisar();
    },
    async reprovar(){
      await this.createAtividadeAvaliacao(
        {
          atividade: {...this.atividadeSelecionada},
          gestor_avaliador: {...this.getGestorData},
          atividade_status: {
            id: 2,
            nm_status: 'REJEITADA',
            dt_avaliacao: new Date().toISOString()
          },
          descricao_avaliacao: this.relatorio
        }
      )
      this.monstarConfirmacao = false;
      await this.pesquisar();
    },
    openAprovarDialog(item){
      this.atividadeSelecionada = item;
      this.monstarConfirmacao = true;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
    },
    async pesquisar(){
      this.list = await this.getAtividadeByUser({
        ...this.filtro,
        cpf: this.userSelected.usuario.cpf_usuario});
    },
    async submit() {
      if (this.$refs.form.validate()) {
        const payload = {
          pessoa: {
            ...this.pessoa,
            cpf: unmaskText(this.pessoa.cpf),
            rg: unmaskText(this.pessoa.rg),
            telefone1: unmaskText(this.pessoa.telefone1),
            telefone2: unmaskText(this.pessoa.telefone2),
            datanascimento: formattedBirthdate(this.pessoa.datanascimento),
          },
          paciente: this.paciente,
        };

        try {
          this.loading = true;
          await this.editMetas(payload);

          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        }
      }
    },
  },
};
</script>
