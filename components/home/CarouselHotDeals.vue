<template>
  <div class="ma-2 pa-2">
    <v-card color="#6633CC">
      <div class="d-flex justify-space-between">
        <div class="d-flex justify-center align-items-center px-3 py-2">
          <div class="box mx-2"></div>
          <div
            class="py-1"
            style="color: white; font-size: 14px; font-weight: 350"
          >
            Hot deals
          </div>
        </div>
      </div>
      <div class="px-3">
        <v-progress-linear
          value="40"
          color="white"
          height="1.5px"
        ></v-progress-linear>
      </div>
      <div class="pa-3 pt-7">
        <v-carousel
          :continuous="false"
          :show-arrows="false"
          height="450"
          hide-delimiter-background
        >
        <!-- height="100%" -->
          <v-carousel-item>
            <ProductCard3 />
          </v-carousel-item>
          <v-carousel-item>
            <ProductCard3 />
          </v-carousel-item>
          <v-carousel-item>
            <ProductCard3 />
          </v-carousel-item>
          <v-carousel-item>
            <ProductCard3 />
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-card>
  </div>
</template>

<script>
import ProductCard3 from "../product/ProductCard3.vue";
export default {
  components: { ProductCard3 },
};
</script>

<style scoped>
.box {
  background-color: white;
  width: 20px;
  height: 20px;
}
.cont {
  background-color: blueviolet !important;
}
.v-carousel >>> .v-carousel__controls {
    bottom: -5px;
}
</style>