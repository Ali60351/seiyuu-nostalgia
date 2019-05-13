<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="type"
  >
    <v-icon v-if="type === 'success'">
      check
    </v-icon>
    <v-icon v-if="type === 'error'">
      close
    </v-icon>
    
    {{ message }}
    
    <v-btn
      dark
      flat
      @click="showSnackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    showSnackbar: false,
    type: "success",
    message: ""
  }),
  methods: {
    show: function(type, message) {
      this.type = type
      this.message = message
      this.showSnackbar = true
    }
  }
  // computed: {
  //   showSnackbar: {
  //     get: function() {
  //       return this.show
  //     },
  //     set: function(value) {
  //       console.log(value)
  //       this.$emit('updateShow', value)
  //     }
  //   }
  // }
  // watch: {
  //   show: function(value) {
  //     console.log(value)
  //     // this.showSnackbar = value
  //   },
  //   showSnackbar: function(value) {
  //     console.log(value)
  //     this.$emit('updateShow', value)
  //   }
  // }
}
</script>

<style>

</style>
