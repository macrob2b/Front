<template>
  <div class="d-flex justify-space-between">
    <div class="" v-show="!$vuetify.breakpoint.xs">
      <div class="tit">Title goes here</div>
      <div class="banner-container">
        <img src="banner-bg.png" />
      </div>
    </div>
    <div class="slider-sheet">
      <div v-show="!$vuetify.breakpoint.xs">
      <ProductSlider :id="id" />
      </div>
      <div v-show="$vuetify.breakpoint.xs">
      <ProductSlider1 :id="id"  />
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
  components: { ProductSlider,ProductSlider1 },
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