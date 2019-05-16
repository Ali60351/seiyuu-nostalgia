<template>
  <v-navigation-drawer
    v-model="drawer"
    persistent
    fixed
    app
    mini-variant
    clipped
    enable-resize-watcher
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        ripple
        :href="typeof item.action === 'string' ? item.action : 'javascript:void(0)'"
        @click="item.action"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <InfoDialog/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import InfoDialog from './InfoDialog';

export default {
  components: {
    InfoDialog
  },
  data: function() {
    return {
      drawer: true,
      items: [
        {
          title: "New t",
          icon: "mdi-github-circle",
          action: "https://github.com/Ali60351/seiyuu-nostalgia"
        },
        {
          title: "New",
          icon: "invert_colors",
          action: this.switchColor
        }
      ]
    };
  },
  methods: {
    switchColor: function() {
      this.$emit("switchColor");
    },
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style>
</style>