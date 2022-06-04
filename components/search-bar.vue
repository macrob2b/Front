<template>
  <div class="search-bar">


    <!--    /**************************-->
    <!--    mobile-responsive CSS start-->
    <!--    ***************************/-->
    <div class="search-bar-mobile">
      <v-btn
        class="category-mobile"
        elevation="0"
        @click="show_filter=!show_filter"
      >
        <img class="category-mobile-icon" src="~/assets/icons/category-white.png" alt="category-icon">
      </v-btn>
      <v-tabs
        v-model="tabs"
        class="tabs"
      >
        <v-tab
          class="tab"
        >
          <v-icon>mdi-border-all</v-icon>
        </v-tab>
        <v-tab
          class="tab"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-tab>
      </v-tabs>
    </div>
    <!--    /**************************-->
    <!--    mobile-responsive CSS end-->
    <!--    ***************************/-->

    <div class="tabs-item">
      <v-tabs-items v-model="tabs">
        <v-tab-item>

          <v-card flat>
            <v-card-text>
              <v-row class="mb-12">
                <v-col lg="2" class="filter-container d-none d-lg-block">
                  <FiltersProduct @filterChanged="applyFilter"/>
                </v-col>
                <v-col lg="10">
                  <SortProduct v-if="!$vuetify.breakpoint.xs" @sortChanged="applySort"/>
                  <v-row class="mt-10" v-if="loadingStatus">
                    <v-col cols="12" class="text-center">
                      <v-progress-circular
                        :size="40"
                        :width="4"
                        color="orange"
                        indeterminate
                      ></v-progress-circular>
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col
                      v-for="item in productList"
                      class="my-2"
                      cols="6"
                      sm="4"
                      md="4"
                      lg="3"
                    >
                      <productBox :productData="item"></productBox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              cards list
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>

    <v-fab-transition>
      <v-btn
        color="#fb641e"
        dark
        @click="show_filter=!show_filter"
        class="mb-10 d-block d-lg-none"
        absolute
        bottom
        right
        fixed
        normal
        fab
      >
        <v-icon small>mdi-filter</v-icon>
      </v-btn>
    </v-fab-transition>


    <v-overlay v-show="show_filter" opacity="1" >
      <v-card width="100vw" class="pa-6  overflow-y-auto"
              v-scroll.self="onScroll"
              style="position: relative"
              max-height="100vh"
      >
        <v-row >
          <v-col cols="12"  >
            <FiltersProduct @filterChanged="applyFilter" />
            <div class="text-center">
              <v-btn class="success  apply_btn" @click="show_filter=!show_filter"  >
                Apply
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import productBox from '../components/product-box'
import FiltersProduct from "./product-list/FiltersProduct";
import SortProduct from "./product-list/SortProduct";

export default {
  components: {
    productBox,
    FiltersProduct,
    SortProduct
  },
  props: {
    loadingStatus: false,
    productList: []
  },
  data() {
    return {
      searchSelected: '',
      scrollInvoked: 0,


      items: [
        'item1',
        'item2',
        'item3',
        'item4'
      ],
      show_filter:false,
      tabs: null
    }
  },
  watch: {
    searchSelected(val) {
      // eslint-disable-next-line no-console
      console.log('selected', val);
    }
  },
  methods:{
    onScroll() {
      this.scrollInvoked++
    },
    applyFilter(event) {
      this.$emit('filterChanged', event);
    },
    applySort(event) {
      this.$emit('sortChanged', event);
    }
  }

}
</script>


<style>
.apply_btn{
  position: fixed;
  bottom: 0;
  width: 100vw;
  left: 0;
  height: 60px!important;
  right:0;
}
</style>
