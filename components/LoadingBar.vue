<template>
  <v-overlay v-if="loading" >
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>  </v-overlay>
</template>


<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>
<style scoped>


</style>
