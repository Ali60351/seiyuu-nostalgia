<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <p>Select Source</p>
          <v-radio-group v-model="selectedMode" row @change="switchMode">
            <v-radio v-for="radio in radios" :key="radio.value" :label="radio.label" :value="radio.value"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="username"
              autofocus
              append-icon="send"
              label="Enter AnimeList Username"
              :loading="loading"
              @click:append="handleSubmit"
            />
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import {getErrorMessage} from "../utils";
import {Enums, Dictionaries} from "../constants";

export default {
  props: {
    mode: {
      type: String,
      default: Enums.Mode.AL
    }
  },
  computed: {
    selectedMode: {
      get: function() {
        return this.mode;
      },
      set: function(value) {
        this.$emit('setMode', value)
      }
    }
  },
  data: () => ({
    username: "",
    loading: false,
    radios: Object.keys(Dictionaries.Mode).map(key => ({
      label: key,
      value: Dictionaries.Mode[key]
    }))
  }),
  methods: {
    switchMode: function(value) {
      console.log(value)
    },
    handleSubmit: function() {
      if (!this.username) {
        this.$emit("showSnackbar", "error", "Username cannot be empty");
        return;
      }

      this.loading = true;

      var query = `
      query ($userName: String) {
        MediaListCollection(userName: $userName, type: ANIME, status:COMPLETED) {
          lists {
            name
            entries {
              media {
                id
                title {
                  userPreferred
                }
              }
            }
          }
        }
      }
      `;

      var variables = {
        userName: this.username
      };

      let success = false;

      axios.post("https://graphql.anilist.co", { query, variables }).then(res => {
        success = true;
        this.loading = false;
        const idList = res.data.data.MediaListCollection.lists[0].entries.map(entry => entry.media.id);
        this.$emit("setList", idList);
      }).catch(err => {
        if (!success) {
          this.loading = false;
          this.$emit("showSnackbar", "error", getErrorMessage(err));
        } else if (err) {
          this.$emit("showSnackbar", "error", String(err));
        }
      });
    }
  }
};
</script>
