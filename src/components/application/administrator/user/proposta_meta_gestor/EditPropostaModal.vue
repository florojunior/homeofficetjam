<template>
  <v-dialog v-model="visible" persistent max-width="1200">
    <v-card>
      <v-card-title class="primary pa-8 pb-10">
        <span class="white--text text-h5">Avaliar Proposta</span>
      </v-card-title>

      <v-card-text class="text-body-2 pt-12 px-8">
        <v-form id="form" ref="form">
          <v-row>
            <v-col cols=12>
              <v-select
                v-model="periodo"
                :items="periodos"
                disabled
                :rules="[fieldRules.required]"
                item-text="descricao"
                item-value="id"
                outlined
                label="Selecione o período"
              ></v-select>
            </v-col>
            <v-col cols=6>
              <v-text-field
                  v-model="meta"
                  :rules="[fieldRules.required]"
                  label="Meta"
                  disabled
                  outlined
                ></v-text-field>
            </v-col>
            <v-col cols=6>
              <v-checkbox
                  v-model="alterarMeta"
                  label="Gostaria de Alterar a meta?"
                  readonly
                ></v-checkbox>
            </v-col>
            <v-col v-if="alterarMeta" cols="12">
              <v-textarea
              v-model="justificativa_meta_proposta"
              disabled
              label="Justificativa de Alteração de meta"
                outlined>
                </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="plano_trabalho"
                readonly
                :rules="[fieldRules.required]"
                label="Descreva o plano de meta"
                outlined>
                </v-textarea>
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
          color="secondary darken-1"
          class="mx-0 ml-sm-2"
          :loading="loading"
          @click="dialogConfirmarDevolucao = true;"
        >
          <v-icon>mdi-close</v-icon>
          <span class="px-5">Devolver</span>
        </v-btn>
        <v-btn
          type="submit"
          form="form"
          class="info mx-0 ml-sm-2"
          :loading="loading"
          @click="dialogConfirmar = true;"
        >
          <v-icon>mdi-check</v-icon>
          <span class="px-5">Aprovar</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialogConfirmar"
      width="300"
    >
      <v-card>
        <v-card-title class="text-h6">
          Confirmação de aprovação
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="observacao_avaliacao">

          </v-textarea>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="red"
            text
            @click="dialogConfirmar = false"
          >
            VOLTAR
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
          :disabled="!observacao_avaliacao"
            color="primary"
            text
            @click="aprovar()"
          >

              Confirmar
            <v-icon color="primary">mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogConfirmarDevolucao"
      width="300"
    >
      <v-card>
        <v-card-title class="text-h6">
          Confirmação de Devolução
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="observacao_avaliacao">

          </v-textarea>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="red"
            text
            @click="dialogConfirmarDevolucao = false"
          >
            VOLTAR
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
          :disabled="!observacao_avaliacao"
            color="primary"
            text
            @click="devolver()"
          >

              Confirmar
            <v-icon color="primary">mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { nameRules, fieldRules } from '@/validations';

export default {
  name: 'EditPropostaModal',
  props: {
    propostaSelected: {
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
      nameRules,
      fieldRules,
      periodo: null,
      observacao_avaliacao: null,
      alterarMeta: false,
      meta: null,
      plano_trabalho: null,
      justificativa_meta_proposta: null,
      visible: false,
      loading: false,
      dialogConfirmar: false,
      dialogConfirmarDevolucao: false,
    };
  },
  computed:{
    ...mapGetters('proposta', ['getPeriodoList']),
    periodos(){
      return this.getPeriodoList.map((item) =>{
        return {
          ...item,
          descricao : `${("00" + item.mes_inicio_periodo).slice(-2)}/${item.ano_inicio_periodo} à ${("00" + item.mes_fim_periodo).slice(-2)}/${item.ano_fim_periodo}`
        }
      })
    },
    getUserData(){
      return JSON.parse(localStorage.getItem('token_sistema_user_data')).data
    },
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'modal/editProposta') {
          this.id = this.propostaSelected.id;
          this.periodo = this.propostaSelected.periodo.id;
          this.meta = this.propostaSelected.meta_proposta;
          this.plano_trabalho = this.propostaSelected.plano_trabalho;
          this.visible = true;
        }
      },
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('proposta', [
      'avaliar'
    ]),
    keepModalOpen() {
      this.loading = false;
    },
    async closeModal() {
      this.loading = false;
      this.visible = false;
      this.$refs.form.reset();
    },
    async aprovar(){
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
            await this.avaliar({
              id: this.id,
              cpf_usuario: this.$route.params.cpf,
              observacao_avaliacao: this.observacao_avaliacao,
              status_avaliacao : {id: 3},
          });
          this.dialogConfirmar = false;
          this.closeModal();
        }
      } catch (error) {
        this.keepModalOpen();
      }
    },
    async devolver(){
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
            await this.avaliar({
              id: this.id,
              cpf_usuario: this.$route.params.cpf,
              observacao_avaliacao: this.observacao_avaliacao,
              status_avaliacao : {id: 2},
          });

          this.closeModal();
        }
      } catch (error) {
        this.keepModalOpen();
      }
    },
    async submit() {
      try {
        if (this.$refs.form.validate()) {
          this.loading = true;
            await this.update({
              id: this.id,
              cpf_usuario: this.getUserData.cpf_usuario,
              periodo : {
                  id: this.periodo
              },
              meta_proposta: this.meta,
              plano_trabalho: this.plano_trabalho,
              justificativa_meta_proposta: this.justificativa_meta_proposta
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
