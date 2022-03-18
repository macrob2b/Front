<template>
  <v-container >
<!--    <div class="d-block" v-if="true" >-->
<!--      <v-row class="mt-12 mb-12 " >-->
<!--        <v-col cols="12"  class="text-center d-block">-->
<!--          <v-progress-circular-->
<!--            :size="40"-->
<!--            :width="4"-->
<!--            color="orange"-->
<!--            indeterminate-->
<!--          ></v-progress-circular>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </div>-->
    <div >
      <v-row >
        <v-slide-group class="pa-2" center-active show-arrows>
          <v-slide-item v-for="(product,index) in newProducts" :key="index">
            <ProductCard1 :product="product"  />
          </v-slide-item>
        </v-slide-group>
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
          <v-icon color="white"> mdi-chevron-left </v-icon>
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
          <v-icon color="white"> mdi-chevron-right </v-icon>
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import ProductCard1 from "./ProductCard1.vue";
import ProductCard2 from "./ProductCard2.vue";
export default {
  props: ['newProducts','loading'],
  components: { ProductCard1, ProductCard2 },
  data() {
    return {
      previousButton: "",
      nextButton: "",
      isPreviousBtnDisable: true,
      isNextBtnDisable: false,
    };
  },
  mounted() {
    // this.getNewProducts();
    // setTimeout(() => this.checkNavBtnStatus(), 2000);
  },
  watch:{

  },
  methods: {
    checkNavBtnStatus() {
      this.previousButton = document.querySelector(
        `.slider${this.$props.id} div.v-slide-group__prev`
      );
      // console.log(
      //   this.previousButton,
      //   "slider" + this.$props.id + " div.v-slide-group__prev"
      // );
      this.nextButton = document.querySelector(
        `.slider${this.$props.id} div.v-slide-group__next`
      );
      // console.log(this.nextButton);
      this.isPreviousBtnDisable =
        this.previousButton?.className.includes("disabled");
      this.isNextBtnDisable = this.nextButton?.className.includes("disabled");
    },
    clickLeft() {
      // console.log();
      this.previousButton.click();
      this.checkNavBtnStatus();
    },
    clickRight() {
      this.nextButton.click();
      this.checkNavBtnStatus();
    },

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
