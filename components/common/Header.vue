<template>
  <div>


    <!--  Navigation Drawer   -->
    <v-navigation-drawer v-model="drawer"
                         fixed
                         style="z-index: 1001;"
                         temporary>

      <v-row class="mt-1">

        <!--    Navigation Icon    -->
        <v-col cols="12" class="d-flex justify-center">
          <nuxt-link to="/">
            <v-img
              width="180"
              height="52"
              :src="require('@/assets/img/color-logo.png')">
            </v-img>
          </nuxt-link>
        </v-col>
        <v-col cols="12" class="d-flex justify-center py-0 my-0 font-weight-bold">
          <!-- User info-->
          <div v-if="!this.$auth.loggedIn">
            <nuxt-link
              dark
               to="/login" min-width="0" color="#fb641e">
              Login
            </nuxt-link>
            <span>&nbsp;|&nbsp; </span>
            <nuxt-link
              dark
              v-show="!this.$auth.loggedIn" to="/register" min-width="0" color="#fb641e">
              Join us for Free
            </nuxt-link>

          </div>
          <div v-else>
            <nuxt-link
                       to="/user-dashboard"
                       dark
                       min-width="100" color="#fb641e">
              Hi, {{ ($auth.user && $auth.user.first_name) ?  $auth.user.first_name : 'Dear friend'}}
            </nuxt-link>
            <span>&nbsp;|&nbsp; </span>
            <span class="red--text" @click="logout">
               Logout
             </span>
          </div>

          <!-- End user info-->
        </v-col>


        <!--   Navigation List     -->
        <v-col cols="12">
          <v-divider></v-divider>

          <!--     Menu Buttons     -->
          <v-list dense>

            <!--      Menu Buttons      -->
            <v-list-item v-for="(button,i) in menuButtons"
                         :key="i"
                         :to="button.to"
                         nuxt>
              <v-list-item-content>
                <v-list-item-title class="font-weight-black" v-text="button.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

          <!--   User menu-->
          <v-divider class="mb-3"></v-divider>
          <span class="text--black font-weight-bold mx-3 text--accent-4 teal--text">User menu</span>
          <user-menu/>


          <v-divider class="mb-3"></v-divider>

          <!--   Categories    -->
          <span class="text--black font-weight-bold mx-3 text--accent-4 teal--text">Categories</span>
          <v-treeview :items="categories"
                      class="overflow-y-auto"
                      color="primary"
                      shaped>
            <template v-slot:label="{item,active,selected}">
              <NuxtLink :class="item.children ? 'font-weight-black' : ''"
                        :to="'/product-list?cate_id=' + (item._id ? item._id : item.id)">
                {{ item.title }}
              </NuxtLink>
            </template>
          </v-treeview>

        </v-col>

      </v-row>

    </v-navigation-drawer>


    <!--  Alert for register-->
    <v-card v-show="!$auth.loggedIn" flat class="transparent" style="position: fixed;top: 0;z-index: 1000">
      <v-row>
        <v-col cols="12">
          <v-alert
            width="100vw"
            type="success"
            dense
            dark
            class="text-body-2 ma-0"
          >
            Join us for free today and be a part of the fastest growing B2B platform
            <v-btn
              to="/register"
              rounded x-small>
              Join now
            </v-btn>
          </v-alert>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-show="$auth.loggedIn" flat class="transparent" style="position: fixed;top: 0;z-index: 1000">
      <v-row>
        <v-col cols="12">
          <v-alert
            width="100vw"
            type="info"
            dense
            dark
            class="text-body-2 ma-0"
          >
            Complete your company profile such email, phone and ...
            <v-btn
              to="/user/company"
              rounded x-small>
              Start
            </v-btn>
          </v-alert>
        </v-col>
      </v-row>
    </v-card>

    <!--   End alert for register-->
    <!--  ToolBar  -->

    <v-app-bar
      color="primary"
      elevation="4"
      :prominent="$vuetify.breakpoint.mdAndUp"
      :height="$vuetify.breakpoint.smAndDown ? '75' : '130'"
      fixed
      :style="`top:${$vuetify.breakpoint.smAndDown ? 50 : 40}px`"
    >


      <v-row>
        <!--  Toolbar Items   -->
        <v-col cols="12" class="d-flex justify-space-between mx-0 mb-0"
               :class="$vuetify.breakpoint.smAndDown ? 'mt-1 mb-2' : 'mt-1'">


          <!--  Menu Buttons (Left Side)  -->
          <div class="d-lg-inline-block">

            <!--    Navigation Trigger      -->
            <v-btn
              @click="drawer = !drawer"
              class="d-inline-flex d-md-none menuIcon white--text mt-2"
              color="accent">
              <v-icon>mdi-menu</v-icon>
            </v-btn>



            <!--  Menu Buttons  -->
            <v-btn v-for="(button , i) in menuButtons"
                   :key="i"
                   v-if="$vuetify.breakpoint.mdAndUp && i < 2"
                   :to="button.to"
                   class="white--text px-2 mx-1 mt-2"
                   text
                   nuxt>
              {{ button.title }}
            </v-btn>

          </div>

          <!--    Main Icon     -->
          <nuxt-link to="/">
            <v-img
              width="180"
              height="52"
              :src="require('@/assets/img/color-logo.png')">
            </v-img>
          </nuxt-link>

          <!--    Menu Buttons (Right Side)    -->
          <div class="ml-md-3">
            <v-btn class="menuIcon text--white mx-sm-2 mx-md-2 mt-2"
                   color="accent"
                   @click="toggleSearch">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn class="menuIcon text--white mx-sm-2 mx-md-2 mt-2"
                   color="accent"
                   to="/user-dashboard"
                   width="20px"
                   nuxt>
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn
              class="d-none d-md-inline-flex menuIcon text--white mx-sm-2 mx-md-2 mt-2"
              color="accent"
              to="/company-list"
              width="20px"
              nuxt>
              <v-icon>mdi-earth</v-icon>
            </v-btn>
            <span class="d-none d-md-inline">
              <v-btn
                class="mt-2"
                dark
                v-if="!this.$auth.loggedIn" to="/login" min-width="0" color="#fb641e">
               {{ signin_btn }}
            </v-btn>
               <v-btn v-else
                      to="/user-dashboard"
                      class="mt-2 "
                      dark
                      min-width="100" color="#fb641e">
               Hi, {{ $auth.user.first_name }}
            </v-btn>
            </span>
          </div>


        </v-col>

        <!--  Toolbar Menu MD   -->
        <v-col class="pt-5 px-0 d-none d-md-block" cols="12">
          <!--     Category menu     -->
          <v-menu
            :nudge-width="selectedCategory !== '' ? $vuetify.breakpoint.width - 350 : ($vuetify.breakpoint.width) / 12"
            rounded="0"
            open-on-hover
            open-delay="500"
            offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="white--text"
                color="secondary"
                v-bind="attrs"
                v-on="on"
                tile
                text>
                <v-icon>mdi-format-list-checkbox</v-icon>
                {{ $t(`CATEGORIES`) }}
              </v-btn>
            </template>

            <v-card tile>
              <v-row class="ma-0 pa-0">

                <!--       Category (Parent)         -->
                <v-col :cols="selectedCategory !== '' ? 3 : 12" class="categoryList ma-0 pa-0">

                  <v-list flat>

                    <!--          Category List          -->
                    <v-list-item
                      v-for="(category, i) in categories"
                      :key="i"
                      :to="'/product-list?cate_id=' + category._id"
                      @mouseover="loadSubCategories(i)"
                      dense
                      nuxt>

                      <v-list-item-content>
                        <v-list-item-title v-text="category.title">
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-icon v-if="category.children">
                        <v-icon>mdi-menu-right</v-icon>
                      </v-list-item-icon>

                    </v-list-item>

                    <!--         All Categories Item           -->
                    <v-list-item @click="clearSubCategory" to="/category-list" nuxt>
                      <v-list-item-content>
                        <v-list-item-title v-text="'All Categories'"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list>

                </v-col>

                <!--       Sub Category         -->
                <v-col :cols="9" class="ma-0 pa-3" v-if="selectedCategory !== ''">
                  <v-row>

                    <!--         Loader           -->
                    <v-col v-if="categories[selectedCategory].subLoaderStatus === 'loading'"
                           cols="1"
                           offset="5"
                           class="mt-16">
                      <v-progress-circular color="primary"
                                           size="50"
                                           class="d-block align-content-center align-center"
                                           indeterminate>
                      </v-progress-circular>
                    </v-col>

                    <!--         Sub Categories           -->
                    <v-col v-for="(subCategory,i) in categories[selectedCategory].children"
                           v-if="categories[selectedCategory].subLoaderStatus === true"
                           :key="i"
                           cols="4">

                      <v-row>
                        <v-col cols="12">
                          <nuxt-link :to="'/product-list?cate_id=' + subCategory._id"
                                     class="font-weight-black text-h7">
                            {{ subCategory.title }}
                          </nuxt-link>

                          <v-divider class="mb-1"></v-divider>

                          <!--          Child of SubCategory            -->
                          <nuxt-link v-for="(subChildCategory,i) in subCategory.children"
                                     :key="i"
                                     v-if="subCategory.children && i < 10"
                                     :to="'/product-list?cate_id=' + subChildCategory.id"
                                     class="text--darken-3 d-block">
                            {{ subChildCategory.title }}
                          </nuxt-link>


                        </v-col>

                      </v-row>

                    </v-col>

                  </v-row>
                </v-col>

              </v-row>
            </v-card>
          </v-menu>

          <!--          <v-btn color="teal accent-4 text-lowercase" tile text>Deals</v-btn>-->
          <v-btn nuxt to="/buying-leads" color="white" tile text>Buying Leads</v-btn>
          <v-btn nuxt to="/selling-leads" color="white" tile text>Selling Leads</v-btn>
          <!--          <v-btn color="white" tile text>Services</v-btn>-->
          <v-btn nuxt to="/help" color="white" tile text>Help</v-btn>

        </v-col>

      </v-row>


    </v-app-bar>

    <!--   Search Overlay   -->
    <v-overlay :value="searchActive"
               id="search_verlay"
               opacity="0.98"
               z-index="20001"
               style="top: 0"
    >

      <div class="search_close">
        <v-btn icon @click="searchActive=!searchActive">
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <div class="search_area ">
        <v-text-field class="black--text search-input"
                      label="Search..."
                      autocomplete="off"
                      :loading="search_loading"
                      loader-height="4"
                      @keyup="searchSubmit"
                      v-model="search_keyword"
                      prepend-inner-icon="mdi-magnify"
                      full-width>
        </v-text-field>
        <v-list class="mt-0" color="white" v-if="searchItems.length > 0">
          <v-list-item v-for="item in searchItems" class="pointer" @click="goToItemLink(item._id)">
            <v-list-item-title class="black--text">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>

      </div>
    </v-overlay>


  </div>
</template>

<script>
import UserMenu from "../dashboard/user-menu";
export default {
  components: {UserMenu},
  data() {
    return {
      drawer: false,
      signin_btn: 'Join us for FREE',
      categoriesMenu: false,
      categories: [],
      selectedCategory: '',
      menuButtons: [
        {
          title: this.$t(`BUY_NOW`),
          to: '/product-list'
        },
        {
          title: this.$t(`SELL_NOW`),
          to: '/user/product/add'
        },
        {
          title: this.$t(`COMPANY_LIST`),
          to: '/company-list'
        },
        {
          title: 'Selling leads',
          to: '/selling-leads'
        },
        {
          title: 'Buying leads',
          to: '/buying-leads'
        }
      ],

      searchActive: false,
      searchItems: [],
      timer: 0,
      search_keyword: null,
      search_loading: false
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      await this.$axios.$post('/api/category_list')
        .then(response => {
          // set flag for sub loader
          response.forEach((category) => {
            category.subLoaderStatus = false;
          });

          this.categories = response;
        })
        .catch(e => {
          console.log('Error in load categories');
        })
    },
    clearSubCategory() {
      this.selectedCategory = '';
    },
    async loadSubCategories(i) {

      // get category Id
      let categoryId = this.categories[i]._id;

      // load sub Categories if not loaded before
      if (this.categories[i].subLoaderStatus === false) {

        // set loader status
        this.categories[i].subLoaderStatus = 'loading';


        // send request
        await this.$axios.$post('/api/category_list',
          {
            parent: categoryId
          }
        ).then(response => {
          this.categories[i]['children'] = response;

          // set loader status (force update)
          this.categories[i].subLoaderStatus = true;
          this.$forceUpdate();
        })
          .catch(e => {
            console.log('error in load sub categories');
          })
      }

      // set Selected Category for loading subCategory
      this.selectedCategory = i;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
    },
    searchSubmit() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getItems();
      }, 800);
    },
    getItems() {
      if (this.search_keyword === "" || this.search_keyword === null) {
        this.searchItems = [];
      } else {
        this.search_loading = true;
        this.$axios.$post('/api/product_list',
          {
            keyword: this.search_keyword,
            take: 8
          }).then(response => {
          this.searchItems = response
        }).catch(err => {
          this.$toast.error("An error occurred");
        }).finally(() => {
          this.search_loading = false;
        })
      }
    },
    goToItemLink(id) {
      this.searchActive = false;
      this.search_keyword = null;
      this.searchItems = [];
      this.$router.push({
        path: `/product-details/${id}`
      });
    },
    logout() {
      this.$auth.logout();
      this.drawer=!this.drawer;
    },
  },
};
</script>

<style scoped>
.menuIcon {
  width: 40px !important;
  min-width: 40px !important;
  height: 36px !important;
}

.pointer {
  cursor: pointer !important;
}


#search_verlay {
  position: fixed;
  width: 100vw;
}

#search_verlay .search_close {
  top: 10px;
  z-index: 20002;
  position: fixed;
  right: 5vw;
}

#search_verlay .search_area {
  top: 10px;
  position: fixed;
  width: 90vw;
  left: 5vw;
}

</style>
