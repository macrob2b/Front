<template>
  <div class="cont mt-8">
    <div class="d-flex justify-space-between">
      <div class="d-flex justify-start align-end">
        <div>
          <div class="box mx-2"></div>
        </div>
        <div id="div1">{{ title }}</div>
      </div>
      <div class="px-4 pt-2">
        <nuxt-link
          :to="link"
          color="transparent">
          <span id="span1"> View All </span>
        </nuxt-link>
      </div>
    </div>
    <div class="px-2 my-5">
      <v-progress-linear
        value="10"
        color="primary"
        height="1.5px"
        class=""
      ></v-progress-linear>
    </div>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
import ProductSlider from '../product/ProductSlider.vue';

export default {
  components: {ProductSlider},
  props:{
    title: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: '/product-list'
    },
  }
};
</script>

<style scoped>
.box {
  height: 20px;
  width: 20px;
  background-color: var(--v-primary-base);
}

button span {
  color: primary;
}

#div1 {
  font-size: 14px;
  font-weight: 400
}

#span1 {
  font-size: 13px;
  font-weight: 500
}
</style>
