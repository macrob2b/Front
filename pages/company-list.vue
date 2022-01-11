<template>
  <div className="market">
    <v-block>
      <main_tabs/>
    </v-block>
    <div className="market-items">
      <v-row class="mt-8 no-gutters">
        <v-col  lg="2 " class="filter-container d-none d-lg-block">
          <FiltersContainer/>
        </v-col>
        <v-col lg="10">
          <SortCompanies v-if="!$vuetify.breakpoint.xs"/>
          <Companies/>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

  import Main_tabs from "../components/main_tabs";
  import FiltersContainer from "../components/company-list/FiltersContainer";
  import Companies from "../components/company-list/Companies";
  import SortCompanies from "../components/company-list/SortCompanies";

  export default {
    name: 'company-list',
    auth: false,
    components: {
      Main_tabs,
      FiltersContainer,
      Companies,
      SortCompanies
    }
  }
</script>

<style scoped>
  .filter-container{
    position: sticky;
    top:150px;
    height: fit-content;
  }

</style>
<style>
  .v-label{
    font-size: 14px !important;
  }
</style>
