<template>
  <section class="product-info pa-5">
    <v-row align="center">
      <v-col cols="12" lg="6">
        <ProductGallery :productDetails="product_details"/>
      </v-col>
      <v-col cols="12" lg="6" >
        <ProductDetail :productDetails="product_details"/>
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
    },
    data(){
      return {
        product_details:{}
      }
    },
    mounted() {
      this.getProductInfo();
    },
    methods:{
      getProductInfo(){
        this.loading=true;
        this.$axios.$post('/api/product_details',
          {
            id:this.$route.params.id
          })
          .then(res=>
          {
            this.product_details=res;
            this.loading=false;
          })
          .catch(err=>{
            this.$toast.error(err);
            this.loading=false;

          })
      }
    }
  }
</script>

<style scoped>
  .product-info {
    background-color: #f3f3f3;
    border-radius: 15px;
  }
</style>
