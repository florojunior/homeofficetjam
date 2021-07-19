<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Nova Unidade</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-text-field
            v-model="newGestor.nm_unidade"
            outlined
            name="description"
            maxlength="80"
            counter="80"
            label="Nome"
            :rules="[nameRules.required]"
            text
            class="mb-4"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions
        class="pb-8 px-8 d-flex justify-center align-center flex-column-reverse flex-sm-row justify-sm-end"
      >
        <v-btn
          class="tertiary--text mt-4 mt-sm-0"
          text
          depressed
          :disabled="loading"
          @click="closeModal()"
          >CANCELAR</v-btn
        >
        <v-btn
          type="submit"
          form="form"
          class="secondary lighten-2 mx-0 ml-sm-2"
          :loading="loading"
          @click.prevent="submit()"
        >
          <span class="px-5">Adicionar Unidade</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { nameRules } from '@/validations';

export default {
  name: 'AddGestorModal',
  data() {
    return {
      newGestor: {
        nm_unidade: null,
        status: null,
      },
      nameRules,
      visible: false,
      loading: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction((action) => {
      if (action.type === 'modal/addGestor') {
        this.visible = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('gestor', ['createGestor']),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
      this.$refs.form.reset();
    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          await this.createGestor({
            nm_unidade: this.newGestor.nm_unidade.trim()
          });
          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        }
      }
    },
  },
};
</script>
