<template>
  <div class="product-box">
    <v-card
      class="product-box-detail pa-4 rounded-lg"
      elevation="2"
    >
      <img class="product-img mb-3" src="~/assets/img/999327.png" alt="product-img"/>
      <span class="product-name mb-3">{{product.name}}</span>
      <span class="product-price mb-3">{{product.price}}$</span>
      <v-btn to="/product-details"
        class="order-btn"
        elevation="1"
        large
      >
        <span class="btn-text">order</span>
        <span class="btn-text-mobile"><v-icon>mdi-shopping-outline</v-icon></span>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          product: {
            name: 'Product name',
            price: '250'
          },
        }
      }
  }
</script>
