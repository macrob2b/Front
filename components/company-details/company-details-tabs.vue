<template>
  <div >
    <v-tabs
      :show-arrows="false"
      v-model="tab"
      class="company-details-tabs"
    >
      <v-tab>
          <v-icon>mdi-office-building</v-icon>
          About company
      </v-tab>
      <v-tab>
          <v-icon>mdi-source-branch</v-icon>
          Factories & Branches
      </v-tab>
<!--      <v-tab>-->
<!--          <v-icon>mdi-poll</v-icon>-->
<!--          Trade capacity-->
<!--      </v-tab>-->
      <v-tab>
          <v-icon>mdi-decagram</v-icon>
          Certificates & Trademarks
      </v-tab>
<!--      <v-tab>-->
<!--          <v-icon>mdi-tag</v-icon>-->
<!--          Main products-->
<!--      </v-tab>-->
      <v-tab>
          <v-icon>mdi-phone</v-icon>
          Contact us
      </v-tab>
    </v-tabs>
    <div class="company-details-items">
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <aboutCompany :companyInfo="companyInfo"/>
        </v-tab-item>
        <v-tab-item>
          <factoriesBranches/>
        </v-tab-item>
<!--        <v-tab-item>-->
<!--          <tradeCapacity/>-->
<!--        </v-tab-item>-->
        <v-tab-item>
          <certificates/>
        </v-tab-item>
<!--        <v-tab-item>-->
<!--          <mainProducts/>-->
<!--        </v-tab-item>-->
        <v-tab-item>
          <contactUs :companyInfo="companyInfo"/>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import aboutCompany from "../company/tabs/about-company";
import factoriesBranches from "../company/tabs/factories-branches"
// import tradeCapacity from "../../pages/company/tabs/trade-capacity"
import certificates from "../company/tabs/certificates"
// import mainProducts from "../../pages/company/tabs/main-products"
import contactUs from "../company/tabs/contact-us"

export default {
  components: {
    aboutCompany,
    factoriesBranches,
    // tradeCapacity,
    certificates,
    // mainProducts,
    contactUs,
  },
  props:['companyInfo'],
  data() {
    return {
      tab: null
    }
  },
  mounted() {
  }
}
</script>



<style>
.v-slide-group__prev,.v-slide-group__next {
  display: none!important;
}
</style>
