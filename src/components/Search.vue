<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-autocomplete
            v-model="selectedValue"
            :items="results"
            :search-input.sync="search"
            label="Enter Anime You Are Watching"
            item-text="title.userPreferred"
            item-value="id"
            ref="searchInput"
            return-object
            no-data-text="Submit to search"
            :filter="v => v"
            :loading="loading"
            @change="handleSelect"
            append-icon="send"
            @click:append="handleSubmit"
          >
            <template v-slot:item="data">
              <v-list-tile-avatar tile>
                <img :src="data.item.coverImage.medium">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ data.item.title.userPreferred }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ `${data.item.format} - ${data.item.startDate.year}` }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex xs12>
          <v-btn block @click="goBack">
            Back
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import {getErrorMessage} from "../utils";
import { setTimeout } from 'timers';

export default {
  data: () => ({
    search: "",
    selectedValue: "",
    loading: false,
    results: []
  }),
  methods: {
    focus: function() {
      setTimeout(() => {this.$refs.searchInput.focus()}, 500)
    },
    handleSubmit: function() {
      this.loading = true;

      var query = `
      query ($search: String) {
        anime: Page (perPage: 10) {
          results: media (type: ANIME, search: $search) {
            id
            title {
              userPreferred
            }
            coverImage {
              medium
            }
            format
            startDate {
              year
            }
          }
        }
      }
      `;

      var variables = {
        search: this.search
      };

      let success = false;

      axios.post("https://graphql.anilist.co", { query, variables }).then(res => {
        this.loading = false;
        this.results = res.data.data.anime.results;
      }).catch(err => {
        if (!success) {
          this.loading = false;
          this.$emit("showSnackbar", "error", getErrorMessage(err));
        } else if (err) {
          this.$emit("showSnackbar", "error", String(err));
        }
      });
    },
    handleSelect: function() {
      this.results = [];
      this.loading = true;

      var query = `
      query ($id:Int) {
        Media(id: $id) {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          characters {
            edges {
              id
              role
              voiceActors {
                id
                name {
                  first
                  last
                  native
                }
              }
              node {
                id
                image {
                  large
                }
                name {
                  first
                  last
                  native
                }
              }
            }
          }
        }
      }
      `;

      var variables = {
        id: this.selectedValue.id
      };

      let success = false;

      axios.post("https://graphql.anilist.co", { query, variables }).then(res => {
        this.loading = false;
        this.$emit("setAnime", res.data.data.Media);
      }).catch(err => {
        if (!success) {
          this.loading = false;
          this.$emit("showSnackbar", "error", getErrorMessage(err));
        } else if (err) {
          this.$emit("showSnackbar", "error", String(err));
        }
      });
    },
    goBack: function() {
      this.$emit("goBack");
    }
  }
};
</script>
