<template>
  <div class="d-flex flex-grow-1 justify-center align-content-center">
    <Menu v-if="authenticated"></Menu>
    <router-view></router-view>
    <Modal />
    <SnackbarNotification />
    <AlterarDados />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Modal from '@/components/utils/Modal.vue';
import AlterarDados from '@/components/application/administrator/user/AlterarDados.vue';
import Menu from '@/components/template/Menu.vue';
import SnackbarNotification from '@/components/utils/SnackbarNotification.vue';

export default {
  components: {
    Modal,
    Menu,
    SnackbarNotification,
    AlterarDados
  },
  computed: {
    ...mapGetters('main', ['authenticated']),
  },
};
</script>

<style>
.hideMenu {
  margin-top: 60px;
}
</style>
