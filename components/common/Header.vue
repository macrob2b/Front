<template>
  <div>

    <!--  Navigation Drawer   -->
    <v-navigation-drawer v-model="drawer"
                         fixed
                         temporary>

      <v-row class="mt-1">

        <!--    Navigation Icon    -->
        <v-col cols="12">
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
                <v-list-item-title class="font-weight-bold" v-text="button.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

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
      :height="$vuetify.breakpoint.smAndDown ? '70' : '130'"
      fixed>

      <v-row>

        <!--  Toolbar Items   -->
        <v-col cols="12" class="d-flex justify-space-between mx-0 mb-0"
               :class="$vuetify.breakpoint.smAndDown ? 'mt-1 mb-2' : 'mt-1'">

          <!--  Menu Buttons (Left Side)  -->
          <div class="d-lg-inline-block">

            <!--    Navigation Trigger      -->
            <v-btn v-if="$vuetify.breakpoint.smAndDown"
                   @click="drawer = !drawer"
                   class="menuIcon white--text mt-2"
                   color="accent">
              <v-icon>mdi-menu</v-icon>
            </v-btn>

            <!--  Menu Buttons  -->
            <v-btn v-if="$vuetify.breakpoint.mdAndUp"
                   v-for="(button , i) in menuButtons"
                   :key="i"
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
              :src="require('@/static/Designs/white-logo.png')">
            </v-img>
          </nuxt-link>

          <!--    Menu Buttons (Right Side)    -->
          <div>
            <v-btn class="menuIcon text--white mx-sm-2 mx-md-1 mt-2"
                   color="accent"
                   @click="toggleSearch">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn v-if="$vuetify.breakpoint.smAndDown"
                   class="menuIcon text--white mx-sm-2 mx-md-1 mt-2"
                   color="accent"
                   to="/user-dashboard"
                   width="20px"
                   nuxt>
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-btn v-if="$vuetify.breakpoint.mdAndUp"
                   to="/user-dashboard"
                   class="text--white mx-sm-2 mx-md-1 mt-2"
                   color="accent"
                   nuxt>
              {{ this.$auth.loggedIn ? 'Hi ' + this.$auth.user.first_name : $t(`SIGN_IN`) }}
            </v-btn>
          </div>

        </v-col>

        <!--  Toolbar Menu MD   -->
        <v-col class="pt-5" v-if="$vuetify.breakpoint.mdAndUp" cols="12">
          <!--     Category menu     -->
          <v-menu
            :nudge-width="selectedCategory ? $vuetify.breakpoint.width - 350 : ($vuetify.breakpoint.width - 700) / 12"
            rounded="0"
            open-on-hover
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
                <v-col :cols="selectedCategory ? 2 : 12" class="categoryList ma-0 pa-0">
                  <v-list-item-group
                    v-model="selectedCategory"
                    color="primary">

                    <!--          Category List          -->
                    <v-list-item
                      v-for="(category, i) in categories"
                      :key="i"
                      :to="'/product-list?cate_id=' + category._id"
                      @mouseover="setSubCategory(i)"
                      dense
                      nuxt>
                      <v-list-item-content>
                        <v-list-item-title :color="selectedCategory == category._id ? 'accent' : ''"
                                           v-text="category.title">
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

                  </v-list-item-group>
                </v-col>

                <!--       Sub Category         -->
                <v-col :cols="10" class="ma-0 pa-3" v-if="selectedCategory">
                  <v-row>

                    <!--         Sub Categories           -->
                    <v-col v-for="(subCategory,i) in subCategories" cols="4">
                      <nuxt-link :to="'/product-list?cate_id=' + subCategory.id"
                                 class="font-weight-black text-h9">
                        {{ subCategory.title }}
                      </nuxt-link>

                      <!--          Child of SubCategory            -->
                      <v-row v-if="subCategories.children">
                        <v-col cols="12" v-for="(subChildCategory,i) in subCategories.children" :key="i">
                          <nuxt-link :to="'/product-list?cate_id=' + subChildCategory.id"
                                     class="text--darken-3">
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

          <v-btn color="teal accent-4" tile text>Deals</v-btn>
          <v-btn color="white" tile text>Buying Leads</v-btn>
          <v-btn color="white" tile text>Selling Leads</v-btn>
          <v-btn color="white" tile text>Services</v-btn>
          <v-btn color="white" tile text>Help</v-btn>

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
      drawer          : false,
      categoriesMenu  : false,
      categories      : [],
      selectedCategory: '',
      subCategories   : [],
      menuButtons     : [
        {
          title: this.$t(`BUY_NOW`),
          to   : '/product-list'
        },
        {
          title: this.$t(`SELL_NOW`),
          to   : '/selling-leads'
        },
        {
          title: this.$t(`COMPANY_LIST`),
          to   : '/company-list'
        }
      ],
      searchActive    : false,
      searchItems     : [1]
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      await this.$axios.$post('/api/category_list',
        {
          "without_child": true,
        }
      ).then(response => {
        this.categories = response;
        this.categories.concat(response);
      })
        .catch(e => {
          console.log('error in load categories');
        })
    },
    clearSubCategory() {
      this.selectedCategory = '';
      this.subCategories    = []
    },
    setSubCategory(i) {
      this.selectedCategory = this.categories[i]._id;
      this.subCategories    = this.categories[i].children;
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
