<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="character in anime.characters.edges"
      :key="character.id"
      pa-2
      xs6
      sm4
      md3
      lg2
    >
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 20 : 2}`"
          ripple
          @click="selectedCharacter(character)"
        >
          <v-img 
            aspect-ratio="0.65"
            :src="character.node.image.large"
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
              <span>{{ getCharacterNameAndRole(character) }}</span>
              <br>
              <span class="grey--text">{{ getVoiceActor(character).name }}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-hover>
    </v-flex>
    <v-flex xs12>
      <v-btn
        block
        @click="goBack"
      >
        Back
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import {formatName} from '../utils'

export default {
  props: {
    anime: {
      type: Object,
      default: () => ({
        characters: {
          edges: []
        }
      })
    }
  },
  methods: {
    selectedCharacter: function(value) {
      const character = {
        id: value.node.id,
        actor: this.getVoiceActor(value)
      };

      this.$emit("setCharacter", character);
    },
    getCharacterNameAndRole: function(character) {
      return `${formatName(character.node.name)} (${character.role})`;
    },
    getVoiceActor: function(character) {
      const actors = character.voiceActors;

      if(actors.length) {
        return {
          id: actors[0].id,
          image: actors[0].image.large,
          name: formatName(actors[0].name)
        };
      } else {
        return {
          id: -1,
          name: "Unknown"
        };
      }
    },
    goBack: function() {
      console.log(123)
      this.$emit("goBack");
    }
  }
};
</script>

<style>

</style>
