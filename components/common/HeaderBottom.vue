<template>
  <!-- <Tutorial/> -->
  <v-row class="justify-between">
    <v-col class="pb-0">
      <v-tabs
        background-color="transparent"
        class="mt-5"
        slider-color="transparent"
      >
        <v-tab>
          <span style="font-weight: 300; text-transform: lowercase !important">
            category name
          </span>
        </v-tab>
        <v-tab>
          <span style="font-weight: 300; text-transform: lowercase !important">
            category name
          </span>
        </v-tab>
        <v-tab>
          <span style="font-weight: 300; text-transform: lowercase !important">
            category name
          </span>
        </v-tab>
        <v-tab>
          <span style="font-weight: 300; text-transform: lowercase !important">
            category name
          </span>
        </v-tab>
        <v-tab> All </v-tab>
      </v-tabs>
    </v-col>
    <v-col class="d-flex justify-end">
      <div class="px-3 mx-2 mt-3">
        <v-btn color="white" min-width="0" width="auto" height="45">
          <span style="color: #00394d; font-size: 13px" class="my-10">
            POST BUYING LEADS
          </span>
        </v-btn>
      </div>
      <!-- <button class="post-btn">
            POST BUYING LEADS
        </button> -->
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
.post-btn {
  border-radius: 5px;
  margin-right: 10px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: white;
  color: #00394d;
  font-size: 13px;
}
.v-tab {
  color: white !important;
  padding-bottom: 10px;
}
</style>