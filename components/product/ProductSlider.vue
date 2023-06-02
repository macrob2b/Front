<template>
    <div>
      <v-row>
        <v-col cols="12">
          <v-slide-group class="pa-2"
                         :continuous="true"
                         v-model="slideVal"
                         center-active show-arrows="desktop">
            <v-slide-item v-for="(product,index) in newProducts" :key="index">
              <ProductCard1 :product="product"/>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
      <div class="d-flex justify-end px-5">
        <v-btn
          color="#165048"
          @click="clickLeft"
          medium
          width="40"
          min-width="0"
          v-show="!$vuetify.breakpoint.xs"
        >
          <v-icon color="white"> mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          color="#165048"
          @click="clickRight"
          class="mx-2"
          medium
          width="40"
          min-width="0"
          v-show="!$vuetify.breakpoint.xs"
        >
          <v-icon color="white"> mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
</template>

<script>
import ProductCard1 from "./ProductCard1.vue";
import ProductCard2 from "./ProductCard2.vue";

export default {
  props: ['newProducts', 'loading'],
  components: {ProductCard1, ProductCard2},
  data() {
    return {
      slideVal: 0,
      slideTimer:null
    };
  },
  mounted() {
    this.slideVal++;
  },
  watch: {
    slideVal(val,old_val){
      if (val!==old_val){
        clearTimeout(this.slideTimer);
        this.slideTimer=setTimeout(()=>{
          if (this.slideVal === 9)
            this.slideVal = 0
          else
            this.slideVal++;
        },5000)
      }
    }
  },
  methods: {
    clickLeft() {
      if (this.slideVal === 0)
        this.slideVal = 9
      else
        this.slideVal--;

    },
    clickRight() {
      if (this.slideVal === 9)
        this.slideVal = 0
      else
        this.slideVal++;
    },
<<<<<<< HEAD

=======
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
  },
};
</script>
<style scoped>

.v-item-group >>> .v-slide-group__wrapper {
  padding-top: 10px;
  padding-bottom: 10px;
}

.v-item-group >>> .v-slide-group__prev {
  display: none;
}

.v-item-group >>> .v-slide-group__next {
  display: none;
}

@media screen and (max-width: 600px) and (min-width: 320px) {
  .v-item-group >>> .v-slide-group__prev {
    display: flex;
    min-width: 10px !important;
  }

  .v-item-group >>> .v-slide-group__next {
    display: flex;
    min-width: 10px !important;
  }

}
</style>
