<template>
  <!-- <Tutorial/> -->
  <div class="header">
    <div v-show="!$vuetify.breakpoint.xs" class="px-1 pb-2 pt-0" >
      <v-card class="card">
        <v-row class="justify-between">
          <v-col class="pt-0">
            <v-tabs
              fixed-tabs
              background-color="transparent"
              slider-color="white"
            >
              <v-tab to="/product-list">Buy Now</v-tab>
              <v-tab>Sell Now</v-tab>
              <v-tab>Community</v-tab>
              <v-tab>Help</v-tab>
            </v-tabs>
          </v-col>
          <v-col class="d-flex justify-center">
            <nuxt-link
              tag="img"
              class="pointer"
              :src="require('../../assets/img/white-logo.png')" to="/" />
          </v-col>
          <v-col>
            <div class="d-flex justify-end">
              <!-- <div class="pa-1 px-2 mx-3"> -->
              <div class="pa-1 px-2 mx-1">
                <v-btn
                  color="#005270"
                  min-width="0"
                  width="40"
                  @click="activeSearch"
                >
                  <v-icon color="white"> mdi-magnify </v-icon>
                </v-btn>
              </div>
              <div class="pa-1 px-2 mx-1">
                <v-btn color="#005270" min-width="0" width="40">
                  <v-icon color="white"> mdi-account </v-icon>
                </v-btn>
              </div>

              <div class="pa-1 px-2 mx-1">
                <v-btn color="#005270" min-width="0" width="40">
                  <v-icon color="white"> mdi-earth </v-icon>
                </v-btn>
              </div>
              <div class="pa-1 px-2 mx-1 mr-3">
                <v-btn to="/login" min-width="0" width="100" color="#fb641e">
                  <span  id="span1"> {{signin_btn}} </span>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <HeaderBottom />
      </v-card>
    </div>

    <!-- responsive -->

    <div v-show="$vuetify.breakpoint.xs">
      <div class="">
        <v-card class="card">
          <div class="d-flex justify-space-between px-3">
            <div class="d-flex justify-start py-3">
              <div class="mx-1">
                <v-btn color="#005270" min-width="0" width="20">
                  <v-icon color="white" small> mdi-menu </v-icon>
                </v-btn>
              </div>
              <div class="mx-1">
                <v-btn
                  color="#005270"
                  min-width="0"
                  width="20"
                  @click="activeSearch"
                >
                  <v-icon color="white" small> mdi-magnify </v-icon>
                </v-btn>
              </div>
            </div>
            <div>
              <nuxt-link
                tag="img"

                :src="require('../../assets/img/white-logo.png')"  to="/" class="py-2 pointer" />
            </div>

            <div class="d-flex justify-start py-3">
              <div class="mx-1">
                <v-btn color="#005270" min-width="0" width="20">
                  <v-icon color="white" small> mdi-account </v-icon>
                </v-btn>
              </div>
              <div class="mx-1">
                <v-btn color="#005270" min-width="0" width="20">
                  <v-icon color="white" small> mdi-earth </v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <HeaderBottomResponsive />
        </v-card>
      </div>
    </div>
    <SearchModal v-on:toggle="clicked" v-show="searchActive" />
  </div>
</template>

<script>
import HeaderBottom from "./HeaderBottom.vue";
import HeaderBottomResponsive from "./HeaderBottomResponsive.vue";
import SearchModal from "./SearchModal.vue";
export default {
  data() {
    return {
      searchActive: false,
      signin_btn: 'Sign In'
    };
  },
  mounted() {
    if(this.$auth.loggedIn)
      this.signin_btn="Dashboard";
  },
  options: {
    customProperties: true,
  },
  components: {
    HeaderBottom,
    HeaderBottomResponsive,
    SearchModal,
  },
  methods: {
    clicked: function () {
      if (this.searchActive) {
        this.searchActive = false;
      }
    },

    activeSearch: function () {
      this.searchActive = !this.searchActive;
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  right: 0;
  left: 0;
  top: 10px;
  max-width: 100%;
  z-index: 100;
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  .card {
    border-radius: 0 !important;
  }
  .header {
    top: 0px;
  }
}
@media screen and (min-width: 601px) {
  .card {
    border-radius: 10px !important;
  }
}
.card {
  /* border-radius: 10px !important; */
  background-color: var(--v-primary-base) !important;
}
.v-tab {
  color: white !important;
  padding-top: 10px;
}
.theme--light.v-tabs .v-tabs-bar {
  background-color: transparent !important;
}
.v-tabs >>> .v-tabs-slider-wrapper {
  top: 0 !important;
  height: 5px !important;
  border-radius: 20px !important;
  background-color: white !important;
}
.vbtn-color {
  background-color: #005270;
  color: white;
}
.vbtn-sign-in {
  background-color: #fb641e;
}
.vbtn-round-shadow {
  border-radius: 5px;
  box-shadow: black;
}
#span1 {
  font-size: 12px;
  color: white;
  font-weight: 350;
}
</style>
