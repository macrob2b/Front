<template>
  <section class="product-info pa-5">
    <v-row align="center">
      <v-col cols="12" lg="6">
        <ProductGallery/>
      </v-col>
      <v-col cols="12" lg="6" >
        <ProductDetail/>
      </v-col>
    </v-row>
  </section>
</template>


<script>
  import ProductGallery from "./ProductGallery";
  import ProductDetail from "./ProductDetail";


  export default {
    components: {
      ProductGallery,
      ProductDetail,
    }
  }
</script>

<style scoped>
  .product-info {
    background-color: #f3f3f3;
    border-radius: 15px;
  }
</style>
