<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex
        xs12
        class="display-1"
      >
        {{ title }}
      </v-flex>
      <v-flex xs12>
        <v-btn
          color="info"
          @click="$emit('increment')"
        >
          Increment
        </v-btn>
        <v-btn
          color="info"
          @click="$emit('switchColor')"
        >
          Switch Color
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      title: {
        type: Number,
        default: 0
      }
    },
    data: () => ({

    })
  }
</script>

<style>

</style>
