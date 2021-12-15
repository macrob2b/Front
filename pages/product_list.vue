<template>
  <div class="market">
    <v-card
      elevation="0"
    >
      <v-tabs
        v-model="tab"
        left
      >
        <v-tab>Products</v-tab>
        <v-tab>Selling leads</v-tab>
        <v-tab>Buying leads</v-tab>
        <v-tab>Companies</v-tab>
      </v-tabs>
    </v-card>
    <div class="market-items">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <productsTab></productsTab>
        </v-tab-item>
        <v-tab-item>
          <p>Selling leads</p>
        </v-tab-item>
        <v-tab-item>
          <p>buying leads</p>
        </v-tab-item>
        <v-tab-item>
          <p>companies</p>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import productsTab from '../components/products-tab'

export default {
  name: 'product_list',
  components: {
    productsTab
  },
  data() {
    return {
      tab: null
    }
  }
}
</script>
