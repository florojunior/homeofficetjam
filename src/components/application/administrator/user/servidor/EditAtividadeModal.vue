<template>
  <v-dialog v-model="visible" persistent max-width="600">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Editar Atividade </span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-row>
            <v-col cols=12 md=6 xl=6 lg=6 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.cpf_usuario"
                disabled
                outlined
                dense
                name="cpf"
                label="CPF"
                :rules="[fieldRules.required]"
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=6 md=3 xl=3 lg=3 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.ano_periodo"
                v-mask="'####'"
                outlined
                dense
                name="description"
                label="Ano"
                disabled
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=6 md=3 xl=3 lg=3 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.mes_periodo"
                v-mask="'##'"
                outlined
                dense
                name="description"
                label="Mes"
                disabled
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=12 md=6 xl=6 lg=6 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.dt_inicio_atividade"
                v-mask="'##/##/####'"
                :disabled="isGestor"
                outlined
                name="dt_inicio_atividade"
                dense
                label="Data do inicio da atividade"
                :rules="[
                  birthdateRules.required,
                  dateRules.isValidDate,
                  dateRules.isValidYear
                ]"
                validate-on-blur
              ></v-text-field>
            </v-col>
            <v-col cols=12 md=6 xl=6 lg=6 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.dt_fim_atividade"
                v-mask="'##/##/####'"
                outlined
                name="dt_fim_atividade"
                dense
                :disabled="isGestor"
                label="Data fim da atividade"
                :rules="[
                  dateRules.isValidDate,
                  dateRules.isValidYear
                ]"
                validate-on-blur
              ></v-text-field>
            </v-col>

            <v-col cols=12 md=3 xl=3 lg=3 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.pontuacao_atividade"
                outlined
                dense
                name="Produtividade"
                label="Pontuação"
                :disabled="isGestor"
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=3 class="pb-0 pt-0">
              <v-text-field
                v-model="editAtividadeModel.qtde_atividade"
                outlined
                dense
                name="quantidade"
                label="Quantidade"
                :disabled="isGestor"
                :rules="[fieldRules.required]"
                number
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=6 class="pb-0 pt-0">
              <v-text-field
                outlined
                dense
                name="quantidade"
                label="Produtividade"
                disabled
                :rules="[fieldRules.required]"
                number
                :value="editAtividadeModel.qtde_atividade * editAtividadeModel.pontuacao_atividade"
                class="mb-4"
              ></v-text-field>
            </v-col>
            <v-col cols=12 class="pb-0 pt-0">
              <v-textarea
                v-model="editAtividadeModel.descricao_atividade"
                outlined
                dense
                :disabled="isGestor"
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
          v-if="!isGestor"
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
  name: 'EditAtividadeModal',
  props: {
    ano: {
      type: String,
      default: () => null,
    },
    mes: {
      type: String,
      default: () => null,
    },
    atividade: {
      type: Object,
      default: () => null,
    }
  },
  data() {
    return {
      editAtividadeModel: {
        mes_periodo: null,
        ano_periodo: null,
        descricao_atividade:null,
        pontuacao_atividade:null,
        dt_cadastro_atividade: new Date().toISOString(),
        dt_inicio_atividade : null,
        dt_fim_atividade: null,
        qtde_atividade: null
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
    isGestor(){
      return localStorage.getItem('sistema_perfil') == 'GESTOR';
    }
  },
  watch:{
    visible(){
        this.editAtividadeModel.id = this.atividade.id;
        this.editAtividadeModel.qtde_atividade = this.atividade.qtde_atividade;
        this.editAtividadeModel.pontuacao_atividade = this.atividade.pontuacao_atividade;
        this.editAtividadeModel.dt_inicio_atividade = this.getDate(this.atividade.dt_inicio_atividade);
        if(this.atividade.dt_fim_atividade){
          this.editAtividadeModel.dt_fim_atividade = this.getDate(this.atividade.dt_fim_atividade);
        }
        this.editAtividadeModel.descricao_atividade = this.atividade.descricao_atividade;
        this.editAtividadeModel.mes_periodo = this.atividade.mes_periodo;
        this.editAtividadeModel.ano_periodo = this.atividade.ano_periodo;
        this.editAtividadeModel.cpf_usuario = this.getUserData.cpf_usuario;
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction((action) => {
      if (action.type === 'modal/editAtividade') {
        /*this.editAtividadeModel.id = this.atividade.id;
        this.editAtividadeModel.pontuacao_atividade = this.atividade.pontuacao_atividade;
        this.editAtividadeModel.dt_inicio_atividade = this.getDate(this.atividade.dt_inicio_atividade);
        this.editAtividadeModel.descricao_atividade = this.atividade.descricao_atividade;
        this.editAtividadeModel.mes_periodo = this.mes;
        this.editAtividadeModel.ano_periodo = this.ano;
        this.editAtividadeModel.cpf_usuario = this.getUserData.cpf_usuario;
*/
        this.visible = true;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('atividade', ['updateAtividade','getByCpfServidor']),
    keepModalOpen() {
      this.loading = false;
    },
    getDate(param){
      console.log(param);
      const date = new Date(param.replace("Z",""));
      return `${('0' + parseInt(date.getDate())).slice(-2)}/${('0' + (parseInt(date.getMonth())+1)).slice(-2)}/${date.getFullYear()}`;
    },
    closeModal() {
      //this.$refs.form.reset();
      this.loading = false;
      this.visible = false;

    },
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          /*let jsonModel = {
            ...this.editAtividadeModel,
            id_grupo: this.getUserData.grupousuario[0].id_grupo,
            dt_inicio_atividade: this.formatDateToSave(this.editAtividadeModel.dt_inicio_atividade)
          };*/
          await this.updateAtividade(
            {
              ...this.editAtividadeModel,
              id_grupo: this.getUserData.grupousuario[0].id_grupo,
              dt_inicio_atividade: this.formatDateToSave(this.editAtividadeModel.dt_inicio_atividade),
              dt_fim_atividade: this.formatDateToSave(this.editAtividadeModel.dt_fim_atividade)
            }
          );
          await this.getByCpfServidor(this.getUserData.cpf_usuario);
          this.closeModal();
        } finally{
          await this.getByCpfServidor(this.getUserData.cpf_usuario);
        }
      }
    },
    formatDateToSave(dateToFormat){
      const dateSplit = dateToFormat.split("/");
      return new Date((parseInt(parseInt(dateSplit[2])))+"-"+dateSplit[1]+"-"+(parseInt(dateSplit[0]))).toISOString()
    }
  },
};
</script>
