<template>
  <div>
    <v-tabs
      v-model="tab"
      class="company-details-tabs"
    >
      <v-tab>
          <v-icon>mdi-office-building</v-icon>
          About company
      </v-tab>
      <v-tab>
          <v-icon>mdi-source-branch</v-icon>
          Factories & branches
      </v-tab>
      <v-tab>
          <v-icon>mdi-poll</v-icon>
          Trade capacity
      </v-tab>
      <v-tab>
          <v-icon>mdi-decagram</v-icon>
          Certificates
      </v-tab>
      <v-tab>
          <v-icon>mdi-tag</v-icon>
          Main products
      </v-tab>
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
        <v-tab-item>
          <tradeCapacity/>
        </v-tab-item>
        <v-tab-item>
          <certificates/>
        </v-tab-item>
        <v-tab-item>
          <mainProducts/>
        </v-tab-item>
        <v-tab-item>
          <contactUs/>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import aboutCompany from "../../pages/company-details/tabs/about-company"
import factoriesBranches from "../../pages/company-details/tabs/factories-branches"
import tradeCapacity from "../../pages/company-details/tabs/trade-capacity"
import certificates from "../../pages/company-details/tabs/certificates"
import mainProducts from "../../pages/company-details/tabs/main-products"
import contactUs from "../../pages/company-details/tabs/contact-us"

export default {
  components: {
    aboutCompany,
    factoriesBranches,
    tradeCapacity,
    certificates,
    mainProducts,
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


