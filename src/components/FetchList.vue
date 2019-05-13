<template>
  <v-form @submit.prevent="handleSubmit">
    <v-container>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              append-icon="send"
              label="Enter AnimeList Username"
              :loading="loading"
              @click:append="handleSubmit"
              @change="e => username = e"
            />
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    username: "",
    loading: false
  }),
  methods: {
    handleSubmit: function() {
      console.log(this.username)
    }
  }
};
</script>
