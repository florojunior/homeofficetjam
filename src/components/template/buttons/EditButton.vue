<template>
  <v-btn
    data-testid="edit-button"
    depressed
    color="secondary darken-3 py-4"
    x-small
    :disabled="disabled"
    @click="onClick"
  >
    <span class="text-caption font-weight-bold"> {{nome ? nome : 'Editar'}} </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    nome: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

