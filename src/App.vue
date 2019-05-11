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
      <HelloWorld
        :title="value"
        @increment="value++"
        @switchColor="dark = !dark"
      />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import NavigationDrawer from './components/NavigationDrawer'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavigationDrawer
  },
  data () {
    return {
      value: 1,
      dark: true
    }
  }
}
</script>
