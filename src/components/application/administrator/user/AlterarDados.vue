<template>
  <v-dialog v-model="getModalAlterarDados.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="text-subtitle-1 mb-4">Atualização de dados</v-card-title>

      <v-card-text class="text-body-2">
        <v-form id="form" ref="form">
        <v-row>
          <v-col>
            <v-alert
              border="left"
              colored-border
              color="red accent-4"
              elevation="2"
            >
              Precisamos de atualize alguns dados antes de continuar
            </v-alert>
          </v-col>

          <v-col cols=12>
            <v-select
              v-model="model.id_unidade"
              :items="unidades"
              item-text="nm_unidade"
              item-value="id"
              label="Insira aqui sua unidade de trabalho"
            ></v-select>
          </v-col>
          <v-col cols=12>
            <v-select
              v-model="model.id_area"
              :items="areas"
              item-text="nm_area"
              item-value="id"
              label="Insira aqui sua area de trabalho"
            ></v-select>
          </v-col>
        </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="save()">ENVIAR</v-btn>
        <v-btn color="primary" text @click="handleClose()">FECHAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import router from '@/router';
export default {
  props: {
    metaSelected: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      model:{},
      areas: [],
      unidades: [],
    };
  },
  computed: {
    ...mapGetters('modal', ['getModalAlterarDados']),
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
    modelJSON(){
      return {
        ...this.getUserData,
        id_unidade: this.model.id_unidade,
        id_area: this.model.id_area
      }
    }
  },
  async mounted(){
    this.areas = await this.fetchAreasList();
    this.unidades = await this.fetchUnidadesList();
    await Promise.all([this.fetchAreasList, this.fetchUnidadesList])
  },
  methods: {
    ...mapActions('modal', ['setModalAlterarDados']),
    ...mapActions('administration', ['fetchAreasList', 'fetchUnidadesList','fetchUpdateUsuarioData']),
    handleClose() {
      this.setModalAlterarDados({
        show: false
      });
    },
    async save(){
      await this.fetchUpdateUsuarioData(this.modelJSON);
      this.handleClose();
      router.push('/login',{});
    }
  }
};
</script>

<style>
</style>
