import Vue from 'vue';
import Vuex from 'vuex';

import { main } from './main/main';
import { administration } from './administration/administration';
import { authentication } from './authentication/authentication';
import { snackbar } from './snackbar/snackbar';
import { modal } from './modal/modal';
import { group } from './group/group';
import { unit } from './unit/unit';
import { gestor} from './gestor/gestor';
import { atividade } from './atividades/atividade';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    administration,
    authentication,
    snackbar,
    modal,
    group,
    unit,
    gestor,
    atividade
  },
});
