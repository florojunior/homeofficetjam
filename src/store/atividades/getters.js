export const getters = {
  getList: (state) => {
    return state.list.map((atividade)=>{
      return {
        ...atividade,
        periodo: `${atividade.mes_periodo}/${atividade.ano_periodo}`
      }
    })
  },
};
