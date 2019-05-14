<template>
  <v-layout row wrap>
    <v-flex pa-2 xs12>
      <v-card>
        <v-layout align-center justify-center row fill-height>
          <v-flex pa-2 xs1>
            <v-img
              :src="character.actor.image"
              aspect-ratio="0.65"
            ></v-img>
          </v-flex>
          <v-flex xs11>
            <v-card-title primary-title>
              <v-layout
                align-center
                column
                justify-center
              >
                <h3 class="headline text-xs-center">{{character.actor.name}}</h3>
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
            <span>{{result.name}}</span>
            <br>
            <span class="grey--text">{{result.anime}}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
    <div class="progress">
      <v-layout align-center justify-center row fill-height wrap>
        <v-flex xs12>
          <div class="text-xs-center">
            <v-progress-circular style="text-align: center;" v-if="loading" :size="50" :width="5" indeterminate/>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-layout>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      default: () => ({})
    },
    animeList: {
      type: Array,
      default: []
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
  }
}
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
