<template>
  <!-- class="d-flex justify-space-between align-center" -->
  <div>
    <v-row justify="space-between">
      <v-col cols="10" style="padding-right:0;padding-left:0">
        <div style="width: 100%">
          <v-tabs
            background-color="transparent"
            class="mt-1"
            slider-color="transparent"
            show-arrows
          >
            <v-tab
              v-for="item in tabs"
              :key="item"
              @mouseenter="mouseEnter"
              @mouseleave="mouseLeave"
              @click="showSubCat"
            >
              <span style="font-size: 10px"> {{ item }} </span>
            </v-tab>
          </v-tabs>
        </div>
      </v-col>
      <v-col cols="2" style="padding-left: 0">
        <div class="mr-2 pa-1 pl-0">
          <v-btn color="#005270" min-width="0" width="20">
            <span class="pa-9">
              <v-icon color="white" small> mdi-filter-variant </v-icon>
            </span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <HeaderSubCat v-show="subCatShow" />
  </div>
</template>

<script>
import HeaderSubCat from "./HeaderSubCat.vue";
export default {
  components: { HeaderSubCat },
  data() {
    return {
      tabs: ["Products", "Selling Leads", "Buying Leads"],
      subCatShow: false,
    };
  },
  methods: {
    mouseEnter: function () {
      this.subCatShow = true;
    },
    mouseLeave: function () {
      this.subCatShow = false;
    },
    showSubCat: function (cats) {
      this.subCatShow = true;
    },
  },
};
</script>

<style scoped>
.v-tabs >>> .v-tabs-slider-wrapper {
  height: 5px !important;
  border-radius: 20px !important;
  background-color: white !important;
}
.v-tab {
  font-size: small;
  color: white !important;
  padding-bottom: 10px;
}
</style>