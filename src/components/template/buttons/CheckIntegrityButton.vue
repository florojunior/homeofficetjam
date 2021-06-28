<template>
  <v-btn
    data-testid="check-button"
    depressed
    color="secondary darken-3 py-4"
    x-small
    @click="onClick"
  >
    <v-icon small fab>mdi-shield-check</v-icon>
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

