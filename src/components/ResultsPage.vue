<template>
  <v-layout row wrap>
    <v-flex xs12>
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
    }
  },
  data: function() {
    return {
      loading: false
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
