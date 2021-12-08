<template>
  <div class="d-flex justify-space-between align-center">
    <v-tabs
      background-color="transparent"
      class="mt-5"
      slider-color="transparent"
    >
      <v-tab v-for="item in tabs" :key="item"> {{item}} </v-tab>
    </v-tabs>
    <div class="mx-2 pa-3">
      <v-btn color="#005270" min-width="0" width="40">
        <v-icon color="white"> mdi-filter-variant </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            tabs : [
                "Products",
                "Selling Leads",
                "Buying Leads",
            ]
        }
    }
};
</script>

<style scoped>
.v-tabs >>> .v-tabs-slider-wrapper {
  height: 5px !important;
  border-radius: 20px !important;
  background-color: white !important;
}
.v-tab {
  font-size: small;
  color: white !important;
  padding-bottom: 10px;
}
</style>