<template>
<<<<<<< HEAD
  <div class="d-flex justify-space-around"  >
    <div>
      <img src="Ads2.png" v-show="!$vuetify.breakpoint.xs"  />
      <span class="chevron-btn">
=======
  <div class="d-flex flex-wrap justify-space-around"  >
    <v-col cols="12" md="6" style="position: relative">
      <img src="Ads2.png"  style="width: 100%"   />
      <span class="chevron-btn" v-show="!$vuetify.breakpoint.xs">
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
        <v-btn fab elevation="8" small color="white">
          <v-icon color="red"> mdi-chevron-right </v-icon>
        </v-btn>
      </span>
<<<<<<< HEAD
    </div>
    <div>
      <img src="Ads1.png" />
      <span class="chevron-btn">
=======
    </v-col>
    <v-col cols="12" md="6" style="position: relative">
      <img class="" style="width: 100%" src="Ads1.png" />
      <span class="chevron-btn" v-show="!$vuetify.breakpoint.xs">
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
        <v-btn fab elevation="8" small color="red">
          <v-icon color="white"> mdi-chevron-right </v-icon>
        </v-btn>
      </span>
<<<<<<< HEAD
    </div>
=======
    </v-col>
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.chevron-btn {
<<<<<<< HEAD
  position: relative !important;
  right: 100px !important;
  bottom: 40px !important;
}
</style>
=======
  position: absolute !important;
  right: 100px !important;
  bottom: 100px !important;
}
</style>
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
