<template>
  <!-- class="d-flex justify-space-between align-center" -->
  <div v-click-outside="onClickOutside">
    <v-row justify="space-between">
      <v-col cols="10" id="col1" >
        <div  id="div1">
          <v-tabs
            background-color="transparent"
            class="mt-1"
            slider-color="transparent"
            show-arrows
          >
            <v-tab
              v-for="(item, idx) in tabs"
              :key="idx"
              @mouseenter="mouseEnter"
              @mouseleave="mouseLeave"
              @click="showSubCat(idx)"
            >
              <span  id="span1"> {{ item }} </span>
            </v-tab>
          </v-tabs>
        </div>
      </v-col>
      <v-col cols="2"  id="col2">
        <div class="mr-2 pa-1 pl-0">
          <v-btn color="#005270" min-width="0" width="20">
            <span class="pa-9">
              <v-icon color="white" small> mdi-filter-variant </v-icon>
            </span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <HeaderSubCat v-show="activeTab != -1" />
  </div>
</template>

<script>
import HeaderSubCat from "./HeaderSubCat.vue";
import vClickOutside from "v-click-outside";
export default {
  components: { HeaderSubCat },
  data() {
    return {
      tabs: ["Products", "Selling Leads", "Buying Leads"],
      subCatShow: false,
      activeTab: -1,
    };
  },
  methods: {
    mouseEnter: function () {
      this.subCatShow = true;
    },
    mouseLeave: function () {
      this.subCatShow = false;
    },
    showSubCat: function (index) {
      console.log(index, this.activeTab);
      if (index == this.activeTab) {
        this.activeTab = -1;
      } else {
        this.activeTab = index;
      }
    },
    onClickOutside(event) {
      this.activeTab = -1;
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
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
#col1 {
  padding-right: 0;
  padding-left: 0;
}
#col2 {
  padding-left: 0;
}
#span1 {
  font-size: 10px;
}
#div1 {
  width: 100%;
}
</style>