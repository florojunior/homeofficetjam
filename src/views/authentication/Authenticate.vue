<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-16">
          <v-card-title class="text-h5 text-sm-h4">{{
            card.title
          }}</v-card-title>
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-text class="pb-0">
            <v-form id="form-authenticate" ref="form">
              <v-text-field
                v-model="email"
                name="email"
                :rules="[loginRules.required]"
                validate-on-blur
                :label="`${formLabels.login}`"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="cpf"
                outlined
                name="cpf"
                label="CPF"
                :rules="[cpfRules.required, cpfRules.validCpf]"
              ></v-text-field>
              <v-text-field
                v-model="password"
                name="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required]"
                validate-on-blur
                :type="showPassword ? 'text' : 'password'"
                :label="`${formLabels.password}`"
                outlined
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-select
                v-model="perfil"
                :items="perfis"
                item-text="name"
                item-value="id"
                outlined
                label="Perfil"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions
            class="d-flex flex-row align-center justify-space-between"
          >
            <v-btn
              form="form-authenticate"
              type="submit"
              depressed
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :loading="loginLoading"
              @click.prevent="submitForm()"
              >{{ button.text }}</v-btn
            >
          </v-card-actions>

          <v-card-text
            class="text-body-1 d-flex flex-column justify-center align-center flex-md-row align-md-center justify-md-start"
          >
            <span>{{ bottomQuestion.question }}&nbsp;</span>
            <v-btn
              depressed
              text
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :disabled="loginLoading"
              @click="setMode(4)"
              >
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from '@/router';

import { loginRules, passwordRules } from '@/validations';
import {
  cpfRules
} from '@/validations';


import Logo from '@/components/template/Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      cpfRules,
      perfil: 'SERVIDOR',
      perfis:[
        {
          id: 'SERVIDOR',
          name: 'Servidor'
        },
        {
          id: 'GESTOR',
          name: 'Gestor'
        }
      ],
      card: {
        title: 'Login',
        subtitle: 'Acesse sua conta com usuário de rede e senha.',
      },
      formLabels: {
        login: 'Login',
        password: 'Senha',
      },
      button: {
        text: 'ENTRAR',
        textForgotPassword: 'Esqueci minha Senha',
      },
      bottomQuestion: {

      },
      email: '',
      password: '',
      loginRules,
      passwordRules,
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters('authentication', ['loginLoading']),
    isGestor(){
      return this.perfil == 'GESTOR';
    }
  },
  methods: {
    ...mapActions('authentication', ['setMode', 'handleLogin','checkUserInformation','getManagerInformation']),
    ...mapActions('main', ['setAuthenticated']),
    ...mapActions('modal', ['showModal']),
    async submitForm() {
      if (this.$refs.form.validate()) {
        const returnLogin =  await this.handleLogin({ login: this.email, senha: this.password, cpf: this.cpf, perfil: this.perfil });

        if(returnLogin){
          const usuario =  await this.checkUserInformation(!!this.isGestor);
        if(usuario){
          if(this.perfil == 'GESTOR'){
            await this.getManagerInformation(this.cpf);
            router.push('/users',{});
          }else{
            router.push('/home/servidor',{});
          }
          localStorage.setItem('autenticado_sistema', true);
          this.setAuthenticated(true);
        }}
      }
    },
  },
};
</script>

<style scoped>
.text-lowercase::first-letter {
  text-transform: uppercase;
}
</style>

