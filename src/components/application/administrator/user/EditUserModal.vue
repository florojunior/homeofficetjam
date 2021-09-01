<template>
  <v-dialog v-if="visible" v-model="visible" persistent>
    <v-card>

      <v-card-text class="text-body-2 pa-0">
        <v-tabs
          v-model="tab"
          background-color="secondary"
          fixed-tabs
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Informações Gerais
            <v-icon>mdi-account-box</v-icon>
          </v-tab>

          <!--<v-tab href="#tab-2">
            Meta
            <v-icon>mdi-target</v-icon>
          </v-tab>-->

          <v-tab href="#tab-3">
            Produtividade
            <v-icon>mdi-bullseye-arrow</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            :value="'tab-1'"
          >

            <InformacoesGerais :userSelected="servidor" :userSelectedTable="userSelected"/>

          </v-tab-item>
          <v-tab-item
            :value="'tab-2'"
          >
            <Meta :tab="tab" :userSelected="servidor" :userSelectedTable="userSelected"/>
          </v-tab-item>
          <v-tab-item
            :value="'tab-3'"
          >
            <Produtividade :tab="tab" :userSelected="servidor" :userSelectedTable="userSelected"/>
          </v-tab-item>
        </v-tabs-items>

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
          >CANCELAR</v-btn
        >
      </v-card-actions>-
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import unmaskText from '@/utils/unmaskText';
import formattedBirthdate from '@/utils/formattedBirthdate';
import InformacoesGerais from './InformacoesGerais';
import Meta from './Meta';
import CabecalhoUsuario from './CabecalhoUsuario';
import Produtividade from './Produtividade';

export default {
  name: 'PatientForm',
  components: {
    InformacoesGerais,
    CabecalhoUsuario,
    Produtividade,
    Meta
  },
  props: {
    userSelected: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      servidor: {},
      paciente: {
      },
      visible: false,
      loading: false,
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
  computed: {

  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/editMetas') {
          if (this.userSelected !== null) {
            this.tab = "tab-1";
            this.visible = true;
            console.log(this.userSelected.usuario.cpf_usuario);
            this.servidor = await this.fetchUserByCpf(this.userSelected.usuario.cpf_usuario)
          }
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', ['editMetas', 'fetchCities','fetchUserByCpf']),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
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
