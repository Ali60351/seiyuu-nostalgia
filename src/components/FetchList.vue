<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="username"
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

export default {
  data: () => ({
    username: "",
    loading: false
  }),
  methods: {
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
