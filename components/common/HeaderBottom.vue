<template>
  <div v-click-outside="onClickOutside">
    <v-row class="justify-between">
      <v-col class="pb-0">
        <v-tabs
          background-color="transparent"
          class="mt-5"
          slider-color="transparent"
        >
          <v-tab
            @mouseenter="mouseEnter"
            @mouseleave="mouseLeave"
            v-for="(n, idx) in tabs"
            :key="idx"
            @click="showSubCat(idx)"
          >
            <span id="span1" >
              <!-- @mouseleave="mouseLeave" -->
              {{ n.title }}
            </span>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col class="d-flex justify-end">
        <div class="px-3 mx-2 mt-3">
          <v-btn color="white" min-width="0" width="auto" height="45">
            <span  id="span2" class="my-10"> POST BUYING LEADS </span>
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
      tabs: [
        {
          title: "category name",
        },
        {
          title: "category name",
        },
        {
          title: "category name",
        },
        {
          title: "category name",
        },
        {
          title: "All",
        },
      ],
      activeTab: -1,
      subCatShow: false,
      directives: {
        clickOutside: vClickOutside.directive,
      },
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
};
</script>

<style scoped>
#span1 {
  font-weight: 300;
  text-transform: lowercase !important;
}
#span2 {
  color: var(--v-primary-base);
  font-size: 13px;
}
.v-tabs >>> .v-tabs-slider-wrapper {
  height: 5px !important;
  border-radius: 20px !important;
  background-color: white !important;
}
.post-btn {
  border-radius: 5px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: white;
  color: primary;
  font-size: 13px;
}
.v-tab {
  color: white !important;
  padding-bottom: 10px;
}
</style>