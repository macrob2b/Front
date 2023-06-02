<template>
  <div class="product-box">
    <v-card
      :to="'/product-details/'+productData._id"
      class="product-box-detail pa-4 rounded-lg"
      elevation="2"

    >
      <nuxt-img format="webp" class="product-img mb-3 pointer"
                :src="getImgFile(productData)" :alt="productData.title"/>
      <p class="product-name mb-3 font-weight-bold">
        {{ productData.title }}
      </p>
      <!--      <span class="product-price mb-3">{{productData.price}}$</span>-->
      <v-btn
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
  props: {
    productData: []
  },
  data() {
    return {
      product: {
        name: 'Product name',
        price: '250'
      },
    }
  },
  mounted() {
  },
  methods: {
    getImgFile(item) {
      var img = require('assets/img/no-image.png');
      if (item.images && item.images.length > 0)
        img = "/storage/products/" + item._id + "/images/thumbnail/" + item.images[0];
      return img;

    }
  }
}
</script>

<style scoped>
img {
  width: 100%; /* or max-width: 100%; */
  height: auto;
}
</style>
