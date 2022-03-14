<template>
  <section class="product-info pa-5">
    <v-row align="center">
      <v-col cols="12" lg="6">
        <ProductGallery :productDetails="productInfo"/>
      </v-col>
      <v-col cols="12" lg="6">
        <ProductDetail :productDetails="productInfo"/>
      </v-col>

    </v-row>
  </section>
</template>


<script>
import ProductGallery from "./ProductGallery";
import ProductDetail from "./ProductDetail";


export default {
  props:['productInfo'],
  components: {
    ProductGallery,
    ProductDetail,
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style scoped>
.product-info {
  background-color: #f3f3f3;
  border-radius: 15px;
}
</style>
