<template>
  <div class="company-details">
<!--    <TopInfo></TopInfo>-->
    <v-card
      elevation="0"
    >
      <v-tabs
        v-model="tab"
        left
      >
        <NuxtLink to="/market/about-company">
          <v-tab>
            <v-icon>mdi-office-building</v-icon>
            About company
          </v-tab>
        </NuxtLink>
        <NuxtLink to="/market/location">
          <v-tab>
            <v-icon>mdi-map-marker</v-icon>
            Location
          </v-tab>
        </NuxtLink>
        <NuxtLink to="/market/factories-branches">
          <v-tab>
            <v-icon>mdi-source-branch</v-icon>
            Factories & branches
          </v-tab>
        </NuxtLink>
        <NuxtLink to="/market/trade-capacity">
          <v-tab>
            <v-icon>mdi-poll</v-icon>
            Trade capacity
          </v-tab>
        </NuxtLink>
        <NuxtLink to="/market/certificates">
          <v-tab>
            <v-icon>mdi-decagram</v-icon>
            Certificates
          </v-tab>
        </NuxtLink>
        <NuxtLink to="/market/main-products">
          <v-tab>
            <v-icon>mdi-tag</v-icon>
            Main products
          </v-tab>
        </NuxtLink>
      </v-tabs>
    </v-card>
    <div class="market-items">
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <Products />
        </v-tab-item>
        <v-tab-item>
          <SellingLeads />
        </v-tab-item>
        <v-tab-item>
          <BuyingLeads />
        </v-tab-item>
        <v-tab-item>
          <Companies />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
// import TopInfo from "~/components/company-details/top-info"
export default {
  components: {
    // TopInfo
  },
  data() {
    return {
      tab: null
    }
  },
}
</script>
