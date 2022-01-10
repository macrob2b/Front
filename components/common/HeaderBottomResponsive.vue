<template>
  <!-- class="d-flex justify-space-between align-center" -->
  <div v-click-outside="onClickOutside" class="px-3">
    <div class="d-flex justify-space-between align-center  mx-0">
      <div  id="col1" class="bottom-tab-header" >
        <div  id="div1">
          <v-tabs
            background-color="transparent"
            class="mt-1"
            slider-color="transparent"

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
      </div>
      <div   id="col2" class="">
        <div class="">
          <v-btn color="#005270" class="px-0">
            <span class="pa-0">
              <v-icon color="white" small> mdi-filter-variant </v-icon>
            </span>
          </v-btn>
        </div>
      </div>
    </div>
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

#span1 {
  font-size: 10px;
}
#div1 {
  width: 100%;
}

</style>
