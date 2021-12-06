<template>
  <div class="d-flex justify-space-between">
    <div>
      <img src="banner2.png" />
    </div>
    <div class="slider-sheet">
        <ProductSlider :id="id" />
    </div>
    
  </div>
</template>

<script>
import ProductSlider from '../product/ProductSlider.vue';
export default {
  props:{
    id : 'number'
  },
  components: {  ProductSlider },
};
</script>

<style scoped>
.slider-sheet {
    overflow: hidden;
}
</style>