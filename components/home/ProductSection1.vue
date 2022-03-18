<template>
  <div class="d-flex justify-space-between">
    <div class="d-none d-sm-block">
      <div class="tit">Title goes here</div>
      <div class="banner-container">
        <img src="banner-bg.png"/>
      </div>
    </div>
    <div class="slider-sheet">
      <div class="d-none d-sm-block">
        <ProductSlider :newProducts="new_products" :loading="new_product_loading"/>
      </div>
      <div class="d-block d-sm-none">
        <ProductSlider :newProducts="new_products" :loading="new_product_loading"/>
      </div>
    </div>
  </div>
  <!-- <div class="pa-3">
    <div class="d-flex">
      <div class="banner" >
        <div class="tit">
          Title goes here
        </div>
      </div>
      <div >
      <ProductSlider :id="id"/>
      </div>
    </div>
  </div> -->
</template>

<script>
import ProductSlider from "../product/ProductSlider.vue";
import ProductSlider1 from "../product/ProductSlider1.vue";

export default {
  props: {
    id: 0,
  },
  data() {
    return {
      new_products: null,
      new_product_loading:false
    }
  },
  components: {ProductSlider, ProductSlider1},
  mounted() {
    this.getNewProducts();
  },
  methods: {
    getNewProducts() {
      this.new_product_loading = true;
      this.$axios.$post('/api/get_new_products')
        .then(response => {
          this.new_products = response;
        }).catch(err => {
        console.log(err);
      }).finally(msg => {
        this.new_product_loading = false;
      })
    }
  }
};
</script>

<style scoped>
.slider-sheet {
  overflow: hidden;
}

.banner {
  background-image: url("/banner-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: 100 100; */
  background-size: contain;
  /* width: 20%; */
  height: 420px;
}

.tit {
  position: relative;
  top: 60px;
  margin-right: 20px;
  text-align: center;
  font-size: 16px !important;
  color: white;
}

.banner-container {
  margin-top: -30px;
}
</style>
