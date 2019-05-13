<template>
  <v-navigation-drawer
    persistent
    fixed
    app
    mini-variant
    clipped
    enable-resize-watcher
    v-model="drawer"
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        ripple
        @click="item.action"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: function() {
    return {
      drawer: true,
      items: [
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
      this.drawer = !this.drawer
    }
  }
};
</script>

<style>
</style>