<template>
  <v-dialog v-if="visible" v-model="visible" persistent>
    <v-card>

      <v-card-text class="text-body-2 pa-0">

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
       };
  },
  computed: {
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/avaliarAtividade') {
          if (this.userSelected !== null) {
            this.visible = true;
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
