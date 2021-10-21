<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Editar Unidade</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-text-field
            v-model="nm_unidade"
            outlined
            name="description"
            maxlength="80"
            counter="80"
            label="Nome"
            :rules="[nameRules.required]"
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
          class="info mx-0 ml-sm-2"
          :loading="loading"
          @click.prevent="submit()"
        >
          <span class="px-5">Editar convênio</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { nameRules} from '@/validations';

export default {
  name: 'UpdateUnitModal',
  props: {
    unitSelected: {
      required: true,
      type: Object,
      default: () => ({
        id: null,
        description: null,
        status: null,
      }),
    },
  },
  data() {
    return {
      id: null,
      nm_unidade: null,
      nameRules,
      visible: false,
      loading: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'modal/editUnit') {
          this.id = this.unitSelected.id;
          this.nm_unidade = this.unitSelected.nm_unidade;
          this.visible = true;
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('unit', [
      'updateUnit'
    ]),
    keepModalOpen() {
      this.loading = false;
    },
    closeModal() {
      this.loading = false;
      this.visible = false;
      this.$refs.form.reset();
    },
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
            await this.updateUnit({
              id: this.id,
              nm_unidade: this.nm_unidade.trim(),
            });

          this.closeModal();
        }
      } catch (error) {
        this.keepModalOpen();
      }
    },
  },
};
</script>
