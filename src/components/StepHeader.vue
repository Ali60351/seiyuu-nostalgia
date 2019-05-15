<template>
  <v-stepper-header>
    <v-stepper-step
      :complete="step > 1"
      step="1"
    >
      Fetch Anime List
    </v-stepper-step>
    <v-divider />
    <v-stepper-step
      :complete="step > 2"
      step="2"
    >
      Select Anime
    </v-stepper-step>
    <v-divider />
    <v-stepper-step
      :complete="step > 3"
      step="3"
    >
      Select Character
    </v-stepper-step>
    <v-divider />
    <v-stepper-step
      :complete="step > 4"
      step="4"
    >
      Results
    </v-stepper-step>
  </v-stepper-header>
</template>

<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  data: function() {
    return {};
  }
};
</script>

<style>
</style>