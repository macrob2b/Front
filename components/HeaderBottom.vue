<template>
  <!-- <Tutorial/> -->
  <v-row class="justify-between">
    <v-col class="pb-0">
      <v-tabs background-color="transparent" class="mt-5" slider-color="transparent">
        <v-tab> category name </v-tab>
        <v-tab> category name </v-tab>
        <v-tab> category name </v-tab>
        <v-tab> category name </v-tab>
        <v-tab> All </v-tab>
      </v-tabs>
    </v-col>
    <v-col class="d-flex justify-end"> 
        <button class="post-btn">
            POST BUYING LEADS
        </button>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
.v-tabs >>> .v-tabs-slider-wrapper {
  height: 5px !important;
  border-radius: 20px !important;
  background-color: white !important;
}
.post-btn{
    border-radius: 5px;
    margin-right: 10px;
    padding-right:20px;
    padding-left:20px;
    background-color: white;
    color: #6633CC;
    font-size: 13px;
}
.v-tab {
  color: white !important;
  padding-bottom: 10px;
}
</style>