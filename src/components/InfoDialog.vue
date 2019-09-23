<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-list-tile
          ripple
          v-on="on"
        >
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Info</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-card>
        <v-card-title
          primary-title
        >
          <h3 class="headline text-xs-center">
            Purpose
          </h3>
        </v-card-title>
        <v-card-text>
          While watching a new Anime have you ever felt that you have heard the voice of a specfic character
          somewhere before and got curious about it? This website is exists exactly to sate that curiosity.
          <br>
          <br>
          If you want to know about it in more detail then click the first icon in the sidebar or click
          <a href="https://github.com/Ali60351/seiyuu-nostalgia">here</a>.
          <br>
          <br>
          You can report issues to me via Reddit. My username is /u/ali60351
          <br>
          <br>
          NOTE:
          <br>
          Username is required to fetch the Anime you have watched previously.
          <br>
          The results showed in the last screen only include the characters from Anime you watched is the past.
          <br>
          Japanese voice actors are prioritized over others.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      };
    }
  };
</script>

<style>

</style>
