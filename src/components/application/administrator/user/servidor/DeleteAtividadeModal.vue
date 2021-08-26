<template>
  <v-dialog v-model="visible" persistent max-width="360">
    <v-card>
      <v-card-title class="pa-0">
        <div class="background-error d-flex justify-center align-center">
          <v-icon x-large color="white"> mdi-delete </v-icon>
        </div>
        <p
          class="pa-6 text-subtitle-2 text-sm-subtitle-2 text-md-subtitle-1 text-lg-h6 text-xl-h6 pb-2"
        >
          Apagar
        </p>
      </v-card-title>

      <v-card-text class="text-body-2">
        <p>Você realmente deseja apagar esta atividade do sistema?</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :loading="loading" @click="handleDelete()"
          >SIM, DESEJO</v-btn
        >
        <v-btn color="primary" text :disabled="loading" @click="closeModal()"
          >NÃO, CANCELAR</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { nameRules, radioGroupRules } from '@/validations';

export default {
  name: 'DeleteAtividadeModal',
  props: {
    atividadeSelected: Object,
  },
  data() {
    return {
      atividade: {
        id: null,
        description: null,
        status: null,
      },
      nameRules,
      radioGroupRules,
      visible: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('modal', ['getAtividade']),
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'modal/deleteAtividade') {
          this.visible = true;
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('atividade', ['deleteAtividade','getByCpfServidor']),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
    },
    async handleDelete() {
      try {
        this.loading = true;
        await this.deleteAtividade(this.atividadeSelected);
        await this.getByCpfServidor(this.getUserData.cpf_usuario);
        this.closeModal();
      } catch (error) {
        this.keepModalOpen();
      }
    },
  },
};
</script>
<style>
.background-error {
  background-color: #de0129;
  min-height: 100px;
  width: 100%;
}
</style>
