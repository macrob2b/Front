<template>
  <v-card
    elevation="0"
  >
    <v-tabs
      left
    >
      <v-tab to="/product-list">Products</v-tab>
      <v-tab to="/selling_leads">Selling leads</v-tab>
      <v-tab to="/buying_leads">Buying leads</v-tab>
      <v-tab to="/companies">Companies</v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "main_tabs",
}
</script>

<style scoped>

</style>
