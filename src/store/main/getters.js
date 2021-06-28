export const getters = {
  mensagemSucesso: (state) => state.mensagemSucesso,
  authenticated: (state) => {
    if(!state.authenticated){
      return localStorage.getItem('token_sistema') != null && localStorage.getItem('token_sistema') != "null";
    }else{
      return state.authenticated;
    }
  },
};