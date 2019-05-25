<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      pa-2
      xs12
    >
      <v-card>
        <v-layout
          align-center
          justify-center
          row
          fill-height
        >
          <v-flex
            pa-2
            xs1
          >
            <v-img
              :src="character.actor.image"
              aspect-ratio="0.65"
            />
          </v-flex>
          <v-flex xs11>
            <v-card-title primary-title>
              <v-layout
                align-center
                column
                justify-center
              >
                <h3 class="headline text-xs-center">
                  {{ character.actor.name }}
                </h3>
              </v-layout>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex
      v-for="result in results"
      :key="result.id"
      pa-2
      xs6
      sm4
      md3
      lg2
    >
      <v-card>
        <v-img 
          aspect-ratio="0.65"
          :src="result.image"
        >
          <template v-slot:placeholder>
            <v-layout
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-layout>
          </template>
        </v-img>
        <v-card-title primary-title>
          <div>
            <span>{{ result.name }}</span>
            <br>
            <span class="grey--text">{{ result.anime }}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-btn
        block
        @click="goBack"
      >
        Back
      </v-btn>
    </v-flex>
    <div
      v-if="loading"
      class="progress"
    >
      <v-layout
        align-center
        justify-center
        row
        fill-height
        wrap
      >
        <v-flex xs12>
          <div class="text-xs-center">
            <v-progress-circular
              style="text-align: center;"
              :size="50"
              :width="5"
              indeterminate
            />
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-layout>
</template>

<script>
import axios from "axios";
import {getErrorMessage, formatName} from "../utils";
import {Enums} from "../constants";

export default {
  props: {
    character: {
      type: Object,
      default: () => ({})
    },
    animeList: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: Enums.Mode.AL
    }
  },
  data: function() {
    return {
      loading: false,
      results: [
        // {
        //   id: -1,
        //   name: 'Kasumigaoka Utaha',
        //   image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/nx14131-vw0RvpxofyBw.jpg',
        //   anime: 'Girls und Panzer'
        // }
      ]
    };
  },
  watch: {
    character: function(value) {
      if (value.actor.id !== -1) {
        this.fetchResults();
      }
    }
  },
  methods: {
    goBack: function() {
      this.$emit("goBack");
    },
    fetchResults: function(page=1) {
      if (page === 1) {
        this.results = [];
      }

      this.loading = true;

      var query = `
      query staff($id: Int, $characterPage:Int) {
        Staff(id: $id) {
          id
          name {
            first
            last
            native
          }
          image {
            large
          }

          characters(page: $characterPage) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            edges {
              role
              media {
                id
                idMal
                type
                title {
                  userPreferred
                }
                coverImage {
                  large
                }
              }
              node {
                id
                name {
                  first
                  last
                }
                image {
                  large
                }
              }
            }
          }
        }
      }
      `;

      var variables = {
        "characterPage": page,
        "id": this.character.actor.id
      };

      let success = false;

      axios.post("https://graphql.anilist.co", { query, variables }).then(res => {
        this.loading = false;
        let success = true;
        this.processResults(res.data.data);

        if (res.data.data.Staff.characters.pageInfo.lastPage !== page) {
          this.fetchResults(page + 1);
        }
      }).catch(err => {
        if (!success) {
          this.loading = false;
          this.$emit("showSnackbar", "error", getErrorMessage(err));
        } else if (err) {
          this.$emit("showSnackbar", "error", String(err));
        }
      });
    },
    hasCompleted: function(media) {
      if (!media.length) {
        return false;
      }

      const targetKey = {
        [Enums.Mode.AL]: "id",
        [Enums.Mode.MAL]: "idMal"
      };

      return this.animeList.indexOf(media[0][targetKey[this.mode]]) !== -1;
    },
    processResults: function(results) {
      results.Staff.characters.edges.forEach(character => {
        if (this.hasCompleted(character.media) && character.node.id !== this.character.id) {
          this.results.push({
            id: character.node.id,
            name: formatName(character.node.name),
            image: character.node.image.large,
            anime: character.media[0].title.userPreferred
          });
        }
      });
    }
  }
};
</script>

<style>
.progress {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
