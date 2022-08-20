<template>
  <v-container fluid className="market" style="position: relative">
    <div>
       <h1>
         Exhibition
       </h1>
    </div>
    <v-divider class="mb-8"/>
    <div>
      <v-row>
        <v-slide-group
          v-model="product_slide"
          class="pa-4"
          active-class="success"
          show-arrows
        >
          <v-slide-item
            class="mx-2"
            v-for="n in 15"
            :key="n"
            v-slot="{ active, toggle }"
          >
            <ExhibitionProductCard/>
          </v-slide-item>
        </v-slide-group>
      </v-row>
    </div>
    <div className="market-items" >
      <v-row class="mt-8 no-gutters">
        <v-col lg="12">
          <CompanyItem :companyList="company_list" :loadingStatus="loading"/>
          <div class="text-center mt-8" v-if="total_page>1">
            <v-pagination
              circle
              v-model="page"
              :length="total_page"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
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
        fab
      >
        <v-icon small>mdi-filter</v-icon>
      </v-btn>
    </v-fab-transition>


    <v-overlay v-show="show_filter" opacity="1">
      <v-card width="100vw" class="pa-6">
        <v-row >
          <v-col cols="12"  >
            <FiltersContainer @filterChanged="applyFilter" />
            <div class="text-center">
              <v-btn class="success  " @click="show_filter=!show_filter"  >
                Apply
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>

import Main_tabs from "../components/main_tabs";
import FiltersContainer from "../components/company-list/FiltersContainer";
import Companies from "../components/company-list/CompanyItem";
import SortCompanies from "../components/company-list/SortCompanies";
import CompanyItem from "../components/company-list/CompanyItem";
import ExhibitionProductCard from "../components/exhibition/product-card";

export default {
  name: 'exhibition-page',
  auth: false,
  head() {
    return {
      title: "Company list"
    }
  },
  data() {
    return {
      product_slide:null,
      show_filter:false,
      loading: false,
      page: 1,
      total_page: 0,
      market: [],
      employee: [],
      company_list: [],
      sort: {
        register_date: ''
      }
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    ExhibitionProductCard,
    CompanyItem,
    Main_tabs,
    FiltersContainer,
    Companies,
    SortCompanies
  },
  watch: {
    page(val) {
      this.getData();
    }
  },
  methods: {
    async getData() {
      window.scrollTo(0, 0)
      this.loading = true;
      //Get brand list
      let companyApiURL = `/api/company_list`;
      await this.$axios.$post(companyApiURL,
        {
          page: this.page,
          paginate: true,
          market: this.market,
          employee: this.employee,
          created_at_sort: this.sort.register_date
        }
      ).then(response => {

        this.company_list = response.data;
        this.total_page = Math.ceil(response.total / response.per_page);
        this.loading = false;
      })
        .catch(e => {
          this.loading = false;
          console.log('error');
        })
    },
    applyFilter(event) {
      this.market = event.market;
      this.employee = event.employee;
      this.getData();
    },
    applySort(event) {
      this.sort.register_date = event.register_date;
      this.getData();
    }
  }
}
</script>

<style scoped>
.filter-container {
  position: sticky;
  top: 150px;
  height: fit-content;
}

</style>
<style>
.v-label {
  font-size: 14px !important;
}
.filter_apply{
  margin: auto;
  width: 80vw;
}
</style>

