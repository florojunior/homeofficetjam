<template>
  <v-btn
    data-testid="edit-button"
    depressed
    color="secondary darken-3 py-4"
    small
    @click="onClick"
  >
    <v-icon left small color="tertiary lighten-2"> mdi-eye </v-icon>
    <span class="text-caption font-weight-bold"> Ver </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

