<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <p>Select Source</p>
          <v-radio-group v-model="selectedMode" row>
            <v-radio v-for="radio in radios" :key="radio.value" :label="radio.label" :value="radio.value"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="username"
              autofocus
              append-icon="send"
              :label="`Enter ${mode} Username`"
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
import { async } from 'q';

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
    handleSubmit: function() {
      if (!this.username) {
        this.$emit("showSnackbar", "error", "Username cannot be empty");
        return;
      }

      if(this.mode === Enums.Mode.AL) {
        this.fetchALUser()
      } else if (this.mode === Enums.Mode.MAL) {
        this.fetchMALUser()
      }
    },
    fetchALUser: function() {
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
    },
    fetchMALUser: async function() {
      let complete = false;
      let page = 1;
      const idList = [];
      this.loading = true;

      while(!complete) {
        try {
          const url = `https://api.jikan.moe/v3/user/${this.username}/animelist/completed/${page}`
          const results = await axios.get(url)

          results.data.anime.forEach(anime => idList.push(anime.mal_id))

          if (results.data.anime.length < 300) {
            complete = true;
          } else {
            page += 1;
          }
        } catch (err) {
          this.$emit("showSnackbar", "error", String(err));
          complete = true;
        }
      }

      this.loading = false;
      this.$emit("setList", idList);
    }
  }
};
</script>
