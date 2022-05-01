<template>
  <div>

    <!--  Navigation Drawer   -->
    <v-navigation-drawer v-model="drawer"
                         fixed
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

        <v-divider></v-divider>

        <!--   Navigation List     -->
        <v-col cols="12">

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
          <v-treeview :items="user_menu"
                      class="overflow-y-auto"
                      color="primary"
                      shaped>
            <template v-slot:label="{item,active,selected}">
              <NuxtLink :class="item.children ? 'font-weight-black' : ''"
                        :to="item.link!==undefined ? item.link : ''">
                {{ item.name }}
              </NuxtLink>
            </template>
          </v-treeview>


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

    <!--  ToolBar  -->
    <v-app-bar
      color="primary"
      elevation="4"
      :prominent="$vuetify.breakpoint.mdAndUp"
      :height="$vuetify.breakpoint.smAndDown ? '75' : '130'"
      fixed>

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
                class="mt-2 "
                dark
                v-if="!this.$auth.loggedIn" to="/login" min-width="0" width="100" color="#fb641e">
               {{ signin_btn }}
            </v-btn>
               <v-btn v-else
                      to="/user-dashboard"
                      class="mt-2 "
                      dark
                      min-width="0" width="100" color="#fb641e">
               Hi, {{ $auth.user.first_name }}
            </v-btn>
            </span>
          </div>


        </v-col>

        <!--  Toolbar Menu MD   -->
        <v-col class="pt-5 px-0 d-none d-md-block"  cols="12">
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
               z-index="2"
               opacity="0.85">
      <v-row :class="searchItems.length > 0 ? '' : 'mb-16'"
             style="width: 75vw">
        <v-col cols="12">

          <!--    Search Field      -->
          <v-text-field class="black--text"
                        label="Search..."
                        prepend-inner-icon="mdi-magnify"
                        full-width>
          </v-text-field>

          <!--     List Search     -->
          <v-list color="white" v-if="searchItems.length > 0">
            <v-list-item v-for="i in 5">
              <v-list-item-title class="black--text">Loaded item {{ i }}</v-list-item-title>
            </v-list-item>
          </v-list>

        </v-col>
      </v-row>

    </v-overlay>

  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      signin_btn: 'Sign In',
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
        }
      ],
      user_menu: [
        {
          name: 'My Products',
          children: [
            {name: 'Product list', link: '/user/product'},
            {name: 'Add a new product', link: '/user/product/add'},
          ]
        },
        {
          name: 'My company',
          children: [
            {name: 'Update company info', link: '/user/company'},
            // {name: 'My message', link: '/messenger'},
          ]
        },
        {
          name: 'My selling leads',
          children: [
            {name: 'Add new selling lead', link: '/user/selling-lead/add'},
            {name: 'Selling leads list', link: '/user/selling-lead'},
          ]
        },
        {
          name: 'My buying leads',
          children: [
            {name: 'Add new buying lead', link: '/user/buying-lead/add'},
            {name: 'Buying leads list', link: '/user/buying-lead'},
          ]
        },
      ],
      searchActive: false,
      searchItems: [1]
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
          console.log('error in load categories');
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
    }
  },
};
</script>

<style scoped>
.menuIcon {
  width: 40px !important;
  min-width: 40px !important;
  height: 36px !important;
}
</style>
