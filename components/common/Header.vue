<template>
  <!-- <Tutorial/> -->
  <div  class="header">
    <div  class="d-none d-sm-flex pb-2 pt-0 w-100 pa-0 ma-0 "  >
      <v-card class="card pa-2 ma-0" style="width: 100%">
        <v-row class="justify-between" >
          <v-col cols="4" class="pt-0 d-flex ">
            <div>
              <v-tabs

                fluid
                fixed-tabs
                background-color="transparent"
                slider-color="white"
              >
                <v-tab
                  v-for="(item,index) in main_items"
                  :to="item.to">{{item.title}}</v-tab>

              </v-tabs>
            </div>
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <nuxt-link
              tag="img"
              class="pointer"
              :src="require('../../assets/img/white-logo.png')" to="/" />
          </v-col>
          <v-col cols="4" class="pr-0">
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
                <v-btn color="#005270" min-width="0" width="40" to="/user-dashboard">
                  <v-icon color="white"> mdi-account </v-icon>
                </v-btn>
              </div>

              <div class="pa-1 px-2 mx-1">
                <v-btn to="/company-list" color="#005270" min-width="0" width="40">
                  <v-icon color="white"> mdi-earth </v-icon>
                </v-btn>
              </div>
              <div class="pa-1 px-2 mx-1 mr-3">
                <v-btn v-if="!this.$auth.loggedIn" to="/login" min-width="0" width="100" color="#fb641e">
                  <span  id="span1"> {{signin_btn}} </span>
                </v-btn>
                <v-btn v-else to="/user-dashboard" min-width="0" width="100" color="#fb641e">
                  <span  id="span1"> Hi, {{$auth.user.first_name}} </span>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <HeaderBottom />
      </v-card>
    </div>

    <!-- responsive -->
    <div class="d-flex d-sm-none" style="width: 100%">
      <div style="width: 100%">
        <v-card class="card" style="width: 100%">
          <div class="d-flex justify-space-between px-3" style="width: 100%">
            <div class="d-flex justify-start py-3">
              <div class="mx-1">
                <v-btn color="#005270" min-width="0" width="20" @click.stop="drawer= !drawer">
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
                <v-btn color="#005270" min-width="0" width="20" to="/user-dashboard">
                  <v-icon color="white" small> mdi-account </v-icon>
                </v-btn>
              </div>
              <div class="mx-1">
                <v-btn to="/company-list" color="#005270" min-width="0" width="20">
                  <v-icon color="white" small> mdi-earth </v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <HeaderBottom />
        </v-card>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      fixed

    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 text-center">
            <nuxt-link tag="img" class="mr-3 pointer" :src="require('../../assets/img/black-logo.png')"  to="/" nuxt height="40px">
            </nuxt-link>
          </v-list-item-title>

        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list >
        <v-list-item
          v-for="(item, i) in main_items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <SearchModal v-on:toggle="clicked" v-show="searchActive" />
  </div>
</template>

<script>
import HeaderBottom from "./HeaderBottom.vue";
import SearchModal from "./SearchModal.vue";
export default {
  data() {
    return {
      drawer:false,
      searchActive: false,
      signin_btn: 'Sign In',
      main_items: [
        {
          title: 'Buy Now',
          to: '/product-list'
        },
        {
          title: 'Sell Now ',
          to: '/user/product/add'
        },
        // {
        //   title: 'Community',
        //   to: '/community'
        // },
        // {
        //   title: 'Help',
        //   to: '/help'
        // }
      ],

    };
  },
  mounted() {

  },
  options: {
    customProperties: true,
  },
  components: {
    HeaderBottom,
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
  top: 0;
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
  width: fit-content!important;
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
