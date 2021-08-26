<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Nova Atividade</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-row>
            <v-col cols=12 md=6 xl=6 lg=6 class="pb-0 pt-0">
              <v-text-field
                v-model="newAtividade.cpf_usuario"
                disabled
                outlined
                dense
                name="cpf"
                label="CPF"
                :rules="[fieldRules.required]"
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=12 md=6 xl=6 lg=6 class="pb-0 pt-0">
              <v-text-field
                v-model="newAtividade.dt_atividade"
                v-mask="'##/##/####'"
                outlined
                name="dt_atividade"
                dense
                label="Data da Atividade"
                :rules="[
                  birthdateRules.required,
                  dateRules.isValidDate,
                  dateRules.isValidYear
                ]"
                validate-on-blur
              ></v-text-field>
            </v-col>
            <v-col cols=6 md=3 xl=3 lg=3 class="pb-0 pt-0">
              <v-text-field
                v-model="newAtividade.ano_periodo"
                v-mask="'####'"
                outlined
                dense
                name="description"
                label="Ano"
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=6 md=3 xl=3 lg=3 class="pb-0 pt-0">
              <v-text-field
                v-model="newAtividade.mes_periodo"
                v-mask="'##'"
                outlined
                dense
                name="description"
                label="Mes"
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=12 md=6 xl=6 lg=6 class="pb-0 pt-0">
              <v-text-field
                v-model="newAtividade.pontuacao_atividade"
                outlined
                dense
                name="Produtividade"
                label="Produtividade"
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=12 class="pb-0 pt-0">
              <v-textarea
                v-model="newAtividade.descricao_atividade"
                outlined
                dense
                name="descricao"
                label="Descrição"
                :rules="[fieldRules .required]"
                text
                class="mb-4"
              ></v-textarea>
            </v-col>
          </v-row>
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
          <span class="px-5">Salvar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { nameRules, fieldRules, birthdateRules,dateRules } from '@/validations';

export default {
  name: 'AddAtividadeModal',
  data() {
    return {
      newAtividade: {
        mes_periodo: null,
        ano_periodo: null,
        descricao_atividade:null,
        pontuacao_atividade:null,
        dt_cadastro_atividade: new Date().toISOString(),
        dt_atividade : ""
      },
      nameRules,
      birthdateRules,
      dateRules,
      fieldRules,
      visible: false,
      loading: false,
    };
  },
  computed:{
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction((action) => {
      if (action.type === 'modal/addAtividade') {
        this.newAtividade.cpf_usuario = this.getUserData.cpf_usuario;
        this.visible = true;
      }
    });


  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('atividade', ['createAtividade','getByCpfServidor']),
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
          await this.createAtividade(
            {
              ...this.newAtividade,
              id_grupo: this.getUserData.grupousuario[0].id_grupo,
              dt_atividade: this.formatDateToSave(this.newAtividade.dt_atividade)
            }
          );
          await this.getByCpfServidor(this.getUserData.cpf_usuario);
          this.closeModal();
        } catch (error) {
          this.keepModalOpen();
        } finally{
          await this.getByCpfServidor(this.getUserData.cpf_usuario);
        }
      }
    },
    formatDateToSave(dateToFormat){
      const dateSplit = dateToFormat.split("/");
      return new Date(dateSplit[2]+"-"+dateSplit[1]+"-"+(parseInt(dateSplit[0]))).toISOString()
    }
  },
};
</script>
