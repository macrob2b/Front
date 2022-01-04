<template>
  <v-tabs class="company-overview-tabs"
          left
  >
    <v-tab to="/company-overview">
      <v-icon>mdi-office-building</v-icon>
      About company
    </v-tab>
    <v-tab to="/location">
      <v-icon>mdi-map-marker</v-icon>
      Location
    </v-tab>
    <v-tab to="/factories-branches">
      <v-icon>mdi-source-branch</v-icon>
      Factories & branches
    </v-tab>
    <v-tab to="/trade-capacity">
      <v-icon>mdi-poll</v-icon>
      Trade capacity
    </v-tab>
    <v-tab to="/certificates">
      <v-icon>mdi-decagram</v-icon>
      Certificates
    </v-tab>
    <v-tab to="main-products">
      <v-icon>mdi-tag</v-icon>
      Main products
    </v-tab>
  </v-tabs>
</template>
