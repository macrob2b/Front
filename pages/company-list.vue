<template>
  <div className="market">
    <v-block>
      <main_tabs/>
    </v-block>
    <div className="market-items">
      <v-row class="mt-8 no-gutters">
        <v-col lg="2 " class="filter-container d-none d-lg-block">
          <FiltersContainer/>
        </v-col>
        <v-col lg="10">
          <SortCompanies v-if="!$vuetify.breakpoint.xs"/>
          <CompanyItem :companyList="company_list" :loadingStatus="loading" />
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
  </div>
</template>

<script>

import Main_tabs from "../components/main_tabs";
import FiltersContainer from "../components/company-list/FiltersContainer";
import Companies from "../components/company-list/CompanyItem";
import SortCompanies from "../components/company-list/SortCompanies";
import CompanyItem from "../components/company-list/CompanyItem";

export default {
  name: 'company-list',
  auth: false,
  head() {
    return {
      title: "Company list"
    }
  },
  data() {
    return {
      loading: false,
      page:1,
      total_page:0,
      company_list:[]
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    CompanyItem,
    Main_tabs,
    FiltersContainer,
    Companies,
    SortCompanies
  },
  watch:{
    page(val){
      this.getData();
    }
  },
  methods: {
    async getData() {
      window.scrollTo(0,0)
      this.loading = true;
      //Get brand list
      let companyApiURL = `/api/company_list`;
      await this.$axios.$post(companyApiURL,
        {
          page:this.page,
          paginate: true
        }
      ).then(response => {

        this.company_list = response.data;
        this.total_page=Math.ceil(response.total/response.per_page);
        this.loading = false;
      })
        .catch(e => {
          this.loading = false;
          console.log('error');
        })
    },
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
</style>
