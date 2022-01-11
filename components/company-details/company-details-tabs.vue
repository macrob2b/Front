<template>
  <div>
    <v-tabs
      v-model="tab"
      class="company-details-tabs"
    >
      <v-tab>
        <NuxtLink to="/company-details">
          <v-icon>mdi-office-building</v-icon>
          About company
        </NuxtLink>
      </v-tab>
      <v-tab>
        <NuxtLink to="/company-details/factories-branches">
          <v-icon>mdi-source-branch</v-icon>
          Factories & branches
        </NuxtLink>
      </v-tab>
      <v-tab>
        <NuxtLink to="/company-details/trade-capacity">
          <v-icon>mdi-poll</v-icon>
          Trade capacity
        </NuxtLink>
      </v-tab>
      <v-tab>
        <NuxtLink to="/company-details/certificates">
          <v-icon>mdi-decagram</v-icon>
          Certificates
        </NuxtLink>
      </v-tab>
      <v-tab>
        <NuxtLink to="/company-details/main-products">
          <v-icon>mdi-tag</v-icon>
          Main products
        </NuxtLink>
      </v-tab>
      <v-tab>
        <NuxtLink to="/company-details/contact-us">
          <v-icon>mdi-phone</v-icon>
          Contact us
        </NuxtLink>
      </v-tab>
    </v-tabs>
    <div class="company-details-items">
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <aboutCompany/>
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
import aboutCompany from "../../pages/company-details/about-company"
import factoriesBranches from "../../pages/company-details/factories-branches"
import tradeCapacity from "../../pages/company-details/trade-capacity"
import certificates from "../../pages/company-details/certificates"
import mainProducts from "../../pages/company-details/main-products"
import contactUs from "../../pages/company-details/contact-us"

export default {
  components: {
    aboutCompany,
    factoriesBranches,
    tradeCapacity,
    certificates,
    mainProducts,
    contactUs,
  },

  data() {
    return {
      tab: null
    }
  },
  mounted() {
    switch (this.$router.history._startLocation) {
      case '/company-details':
        this.tab = 0;
        break;
      case '/company-details/factories-branches':
        this.tab = 1;
        break;
      case '/company-details/trade-capacity':
        this.tab = 2;
        break;
      case '/company-details/certificates':
        this.tab = 3;
        break;
      case '/company-details/main-products':
        this.tab = 4;
        break;
      case '/company-details/contact-us':
        this.tab = 5;
        break;
    }
  }
}
</script>


