<template>
  <v-text-field background-color="#ddd" style="text-align: center " class="mt-lg-0 pt-lg-0 text-center" v-model="count" type="number">
    <v-icon
      slot="append"
      style="background-color: #444"
      dark
      class="rounded-lg"
      @click="increment"
    >
      mdi-plus
    </v-icon>

    <v-icon
      slot="prepend-inner"
      style="background-color: #444"
      dark
      class="rounded-lg"
      @click="decrement"
    >
      mdi-minus
    </v-icon>
  </v-text-field>
</template>


<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        this.count = +this.count + 1
      },
      decrement() {
        if (this.count > 0) {

          this.count = +this.count - 1
        }
      }
    }
  }
</script>

<style scoped>
</style>
