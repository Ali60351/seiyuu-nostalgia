<template>
  <v-app :dark="dark">
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-title>Seiyuu Nostalgia</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <NavigationDrawer @switchColor="dark = !dark" />
    <v-content>
      <v-stepper
        v-model="step"
        class="remove-shadow"
      >
        <StepHeader :step="step" />
        <v-stepper-items>
          <v-layout
            style="min-height:75vh"
            fill-height
            justify-center
            column
          >
            <v-flex xs12>
              <v-stepper-content step="1">
                <FetchList />
              </v-stepper-content>
            </v-flex>
          </v-layout>
        </v-stepper-items>
      </v-stepper>
      <Snackbar ref="snackbar" />
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";
import StepHeader from "./components/StepHeader";
import FetchList from "./components/FetchList";
import Snackbar from "./components/Snackbar";

export default {
  name: "App",
  components: {
    NavigationDrawer,
    StepHeader,
    FetchList,
    Snackbar
  },
  data() {
    return {
      step: 1,
      dark: true,
      animeList: [],
    };
  },
  methods: {
    showSnackbar: function(type, message) {
      this.$refs.snackbar.show(type, message)
    }
  }
};
</script>

<style>
.remove-shadow {
  box-shadow: none !important;
}
</style>
