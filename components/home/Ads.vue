<template>
  <div class="d-flex flex-wrap justify-space-around"  >
    <v-col cols="12" md="6" style="position: relative">
      <img src="Ads2.png"  style="width: 100%"   />
      <span class="chevron-btn" v-show="!$vuetify.breakpoint.xs">
        <v-btn fab elevation="8" small color="white">
          <v-icon color="red"> mdi-chevron-right </v-icon>
        </v-btn>
      </span>
    </v-col>
    <v-col cols="12" md="6" style="position: relative">
      <img class="" style="width: 100%" src="Ads1.png" />
      <span class="chevron-btn" v-show="!$vuetify.breakpoint.xs">
        <v-btn fab elevation="8" small color="red">
          <v-icon color="white"> mdi-chevron-right </v-icon>
        </v-btn>
      </span>
    </v-col>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.chevron-btn {
  position: absolute !important;
  right: 100px !important;
  bottom: 100px !important;
}
</style>
