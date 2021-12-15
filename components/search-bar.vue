<template>
  <div class="search-bar">
    <div class="search-bar-detail my-5 mx-0">
      <div class="detail-inner">
        <v-sheet
          elavation="0"
          class="search-bar-container px-3"
        >
          <v-row
            no-gutters
          >
            <v-col
              class="column"
              cols="3"
            >
              <img class="icons" src="~/assets/icons/search.svg" alt="search-icon">
              <v-autocomplete
                v-model="searchSelected"
                :items="products"
                label="search"
                filled
                rounded
              ></v-autocomplete>
            </v-col>
            <v-col
              class="column"
              cols="3"
            >
              <img class="icons" src="~/assets/icons/category.svg" alt="category-icon">
              <v-select
                :items="items"
                label="category list"
              ></v-select>
            </v-col>
            <v-col
              class="column"
              cols="3"
            >
              <img class="icons" src="~/assets/icons/supplier.svg" alt="supplier-icon">
              <v-select
                :items="items"
                label="Supplier"
              ></v-select>
            </v-col>
            <v-col
              class="column"
              cols="3"
            >
              <img class="icons" src="~/assets/icons/search-options.svg" alt="search-options-icon">
              <v-select
                :items="items"
                label="Search Options"
              ></v-select>
            </v-col>
          </v-row>
          <v-btn
            elevation="0"
            class="submit-btn"
          >Submit</v-btn>
        </v-sheet>
      </div>
      <div class="grid-section d-flex align-center justify-end">
        <v-tabs
          v-model="tabs"
          class="tabs"
        >
          <v-tab
            class="tab"
          >
            <font-awesome-icon :icon="['fas', 'border-all']"/>
          </v-tab>
          <v-tab
            class="tab"
          >
            <font-awesome-icon :icon="['fas', 'list']"/>
          </v-tab>
        </v-tabs>
      </div>
    </div>

<!--    /**************************-->
<!--    mobile-responsive CSS start-->
<!--    ***************************/-->
    <div class="search-bar-mobile">
      <v-btn
        class="category-mobile"
        elevation="0"
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
          <font-awesome-icon :icon="['fas', 'border-all']"/>
        </v-tab>
        <v-tab
          class="tab"
        >
          <font-awesome-icon :icon="['fas', 'list']"/>
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
              <v-row
                no-gutters
              >
                <v-col
                  v-for="index in 15"
                  :key="index"
                  class="my-2"
                  cols="6"
                  sm="4"
                  md="4"
                  lg="3"
                >
                  <productBox></productBox>
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
  </div>
</template>

<script>
  import productBox from '../components/product-box'
  export default {
    components: {
      productBox
    },
      data() {
        return {
          searchSelected: '',
          products: [
            'test1',
            'test2',
            'test3',
            'test4'
          ],
          items: [
            'item1',
            'item2',
            'item3',
            'item4'
          ],
          tabs: null
        }
      },
    watch: {
        searchSelected(val) {
          // eslint-disable-next-line no-console
          console.log('selected', val);
        }
    }
  }
</script>
