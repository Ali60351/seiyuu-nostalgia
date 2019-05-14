<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      v-for="character in anime.characters.edges"
      :key="character.id"
      pa-2
      xs2
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
              <span>{{ `${formatName(character.node.name)} (${character.role})` }}</span>
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
    formatName: function(name) {
      let formattedName = "";

      if(name.first) {
        formattedName = name.first;
      }

      if(name.last) {
        formattedName = `${formattedName} ${name.last}`;
      }

      return formattedName;
    },
    selectedCharacter: function(value) {
      const character = {
        id: value.id,
        actor: this.getVoiceActor(value)
      };

      this.$emit("setCharacter", character);
    },
    getVoiceActor: function(character) {
      const actors = character.voiceActors;

      if(actors.length) {
        return {
          id: actors[0].id,
          name: this.formatName(actors[0].name)
        };
      } else {
        return {
          id: -1,
          name: "Unknown"
        };
      }
    },
    goBack: function() {
      this.$emit("goBack");
    }
  }
};
</script>

<style>

</style>
