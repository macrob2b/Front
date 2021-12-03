<template>
  <div>
    <v-slide-group class="pa-2" show-arrows>
      <v-slide-item v-for="n in 15" :key="n">
        <ProductCard1 />
      </v-slide-item>
    </v-slide-group>
    <div class="d-flex justify-end px-5">
      <v-btn color="#98CB00" @click="clickLeft" medium width="40" min-width="0">
        <v-icon color="white"> mdi-chevron-left </v-icon>
      </v-btn>
      <v-btn
        color="#98CB00"
        @click="clickRight"
        class="mx-2"
        medium
        width="40"
        min-width="0"
      >
        <v-icon color="white"> mdi-chevron-right </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import ProductCard1 from "./ProductCard1.vue";
import _ from "lodash";
export default {
  components: { ProductCard1 },
  data() {
    return {
      previousButton: "",
      nextButton: "",
      isPreviousBtnDisable: true,
      isNextBtnDisable: false,
    };
  },
  mounted() {
    setTimeout(() => this.checkNavBtnStatus(), 1000);
  },
  methods: {
    checkNavBtnStatus() {
      this.previousButton = document.querySelector("div.v-slide-group__prev");
      console.log(this.previousButton);
      this.nextButton = document.querySelector("div.v-slide-group__next");
      console.log(this.nextButton);
      this.isPreviousBtnDisable =
        this.previousButton?.className.includes("disabled");
      this.isNextBtnDisable = this.nextButton?.className.includes("disabled");
    },
    clickLeft() {
      console.log();
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
.v-item-group >>> .v-slide-group__prev{
  display: none;
}
.v-item-group >>> .v-slide-group__next {
  display: none;
}
</style>