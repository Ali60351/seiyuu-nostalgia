<template>
    <v-form @submit.prevent="handleSubmit">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field
                        type="text"
                        v-model="search"
                        label="Search"
                        append-icon="search"
                        @change="e => search = e"
                    />
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
export default {
    data: () => ({
        search: ''
    }),
    methods: {
        handleSubmit: function() {
            console.log(this.search)
        }
    }
}
</script>
