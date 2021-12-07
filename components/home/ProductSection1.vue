<template>
  <div class="d-flex justify-space-between">
    <div class="">
      <div class="tit">Title goes here</div>
      <div class="banner-container">
        <img src="banner-bg.png" />
      </div>
    </div>
    <div class="slider-sheet">
      <ProductSlider :id="id" />
    </div>
  </div>
  <!-- <div class="pa-3">
    <div class="d-flex">
      <div class="banner" style="">
        <div class="tit"> 
          Title goes here
        </div>
      </div>
      <div style="width:80%">
      <ProductSlider :id="id"/>
      </div>
    </div>
  </div> -->
</template>

<script>
import ProductSlider from "../product/ProductSlider.vue";
export default {
  props: {
    id: "number",
  },
  components: { ProductSlider },
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
.banner-container{
  margin-top:-30px
}
</style>