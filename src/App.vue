<template>
  <v-app :dark="dark">
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon @click="toggleDrawer" />
      <v-toolbar-title>Seiyuu Nostalgia</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <NavigationDrawer
      ref="drawer"
      @switchColor="dark = !dark"
    />
    <v-content>
      <v-stepper
        v-model="step"
        class="remove-shadow"
      >
        <StepHeader :step="step" />
        <v-stepper-items>
          <v-stepper-content step="1">
            <FetchList
              :mode="mode"
              @setMode="setMode"
              @setList="setList"
              @showSnackbar="showSnackbar"
            />
          </v-stepper-content>
          <v-stepper-content step="2">
            <Search
              ref="search"
              @setAnime="setAnime"
              @showSnackbar="showSnackbar"
              @goBack="goBack"
            />
          </v-stepper-content>
          <v-stepper-content step="3">
            <CharacterSelect
              :anime="selectedAnime"
              @setCharacter="setCharacter"
              @showSnackbar="showSnackbar"
              @goBack="goBack"
            />
          </v-stepper-content>
          <v-stepper-content step="4">
            <ResultsPage
              :animeList="animeList"
              :character="selectedCharacter"
              @showSnackbar="showSnackbar"
              @goBack="goBack"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <Snackbar ref="snackbar" />
    </v-content>
  </v-app>
</template>

<script>
import {Enums} from './constants';

import NavigationDrawer from "./components/NavigationDrawer";
import StepHeader from "./components/StepHeader";
import FetchList from "./components/FetchList";
import Snackbar from "./components/Snackbar";
import Search from "./components/Search";
import CharacterSelect from "./components/CharacterSelect";
import ResultsPage from "./components/ResultsPage";

export default {
  name: "App",
  components: {
    NavigationDrawer,
    StepHeader,
    FetchList,
    Snackbar,
    Search,
    CharacterSelect,
    ResultsPage
  },
  data() {
    return {
      step: 1,
      dark: true,
      animeList: [],
      mode: Enums.Mode.AL,
      selectedAnime: {
        characters: {
          edges: []
        }
      },
      selectedCharacter: {
        id: -1,
        actor: {
          id: -1,
          name: '',
          image: ''
        }
      }
    };
  },
  methods: {
    showSnackbar: function(type, message) {
      this.$refs.snackbar.show(type, message);
    },
    toggleDrawer: function() {
      this.$refs.drawer.toggleDrawer();
    },
    setList: function(value) {
      this.animeList = value;
      this.step = 2;
      this.$refs.search.focus();
    },
    setAnime: function(value) {
      this.selectedAnime = value;
      this.step = 3;
    },
    setCharacter: function(value) {
      this.selectedCharacter = value;
      this.step = 4;
    },
    goBack: function(value) {
      this.step = this.step - 1;
    },
    setMode: function(value) {
      this.mode = value
    }
  }
};
</script>

<style>
.remove-shadow {
  box-shadow: none !important;
}
</style>
