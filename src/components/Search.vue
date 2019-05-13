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
            label="Search"
            item-text="title.userPreferred"
            item-value="id"
            return-object
            hide-no-data
            :loading="isLoading"
            @change="handleSelect"
            @blur="results = []"
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
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    selectedValue: "",
    isLoading: false,
    results: [
      // {
      //   id: 2104,
      //   title: {
      //     userPreferred: "Seto no Hanayome"
      //   },
      //   coverImage: {
      //     medium:
      //       "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/2104.jpg"
      //   },
      //   format: "TV",
      //   startDate: {
      //     year: 2007
      //   }
      // }
    ]
  }),
  methods: {
    handleSubmit: function() {
      this.isLoading = true;

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

      axios.post("https://graphql.anilist.co", { query, variables }).then(res => {
          this.isLoading = false;
          this.results = res.data.data.anime.results;
        });
    },
    handleSelect: function() {
      console.log(this.selectedValue);
    }
  }
};
</script>
