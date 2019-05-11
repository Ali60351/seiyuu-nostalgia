<template>
  <v-app :dark="dark">
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-title>
        Seiyuu Nostalgia
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <NavigationDrawer @switchColor="dark = !dark" />
    <v-content>
      <Search/>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer'
import Search from './components/Search'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    Search
  },
  data () {
    return {
      value: 1,
      dark: true
    }
  }
}
</script>
