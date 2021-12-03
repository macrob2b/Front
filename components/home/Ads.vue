<template>
  <div class="d-flex justify-space-around">
    <div>
      <img src="Ads2.png" />
      <span class="chevron-btn">
        <v-btn fab elevation="8" small color="white">
          <v-icon color="red"> mdi-chevron-right </v-icon>
        </v-btn>
      </span>
    </div>
    <div>
      <img src="Ads1.png" />
      <span class="chevron-btn">
        <v-btn fab elevation="8" small color="red">
          <v-icon color="white"> mdi-chevron-right </v-icon>
        </v-btn>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.chevron-btn {
  position: relative !important;
  right: 100px !important;
  bottom: 40px !important;
}
</style>