<template>
  <div class="product-box">
    <v-card
      class="product-box-detail pa-4 rounded-lg"
      elevation="2"

    >
      <nuxt-link tag="img" class="product-img mb-3 pointer" :to="'/product-details/'+productData._id"
                 :src="getImgFile(productData)" alt="product-img"/>
      <nuxt-link :to="'/product-details/'+productData._id" class="product-name mb-3 font-weight-bold">
        {{ productData.title }}
      </nuxt-link>
      <!--      <span class="product-price mb-3">{{productData.price}}$</span>-->
      <v-btn
        class="order-btn"
        elevation="1"
        :to="'/product-details/'+productData._id"
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
        img = "https://dl.macrob2b.com/products/" + item._id + "/images/" + item.images[0];
      return img;

    }
  }
}
</script>
