<template>
  <v-dialog v-model="visible" persistent>
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Detalhes de Usuário</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">

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
          <span class="px-5">Adicionar paciente</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
/*
import {
  nameRules,
  radioGroupRules,
  medicalRecordRules,
  birthdateRules,
  dateRules,
  genderRules,
  cpfRules,
  rgRules,
  emailRules,
  motherRules,
  cellphoneRules,
  telephoneRules,
  birthplaceRules,
} from '@/validations';*/

export default {
  name: 'AddPatientModal',
  data() {
    return {
      visible: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('administration', ['getCitiesList', 'getCitiesListLoading']),
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: async (action) => {
        if (action.type === 'modal/addPatient') {
          this.visible = true;

          await this.fetchCities();
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('administration', ['createNewPatient', 'fetchCities']),
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
        const payload = {
        };

        try {
          this.loading = true;
          await this.createNewPatient(payload);

          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        }
      }
    },
  },
};
</script>
