<template>
  <v-dialog v-model="getModalMeta.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="text-subtitle-1 mb-4">Alterar meta</v-card-title>

      <v-card-text class="text-body-2">
        <v-row>
          <v-col cols=12>
            <v-text-field
              dense
              label="Meta esbabelecida"
              type="number"
              :value="metaSelected.meta_estabelecida">
            </v-text-field>
          </v-col>
          <v-col cols=12>
            <v-text-field
            dense
              label="Meta ajustada"
              type="number"
              :value="metaSelected.meta_ajustada">
            </v-text-field>
          </v-col>
          <v-col cols=12>
            <v-text-field
              dense
              label="Justificada"
              :value="metaSelected.justificativa_meta_ajustada"
              >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handleClose()">ENVIAR</v-btn>
        <v-btn color="primary" text @click="handleClose()">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    metaSelected: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    ...mapGetters('modal', ['getModalMeta']),
  },
  methods: {
    ...mapActions('modal', ['setModalMeta']),
    handleClose() {
      this.setModalMeta({
        show: false
      });
    },
  },
};
</script>

<style>
</style>
