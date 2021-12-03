<template>
  <!-- <Tutorial/> -->
  <div>
      <div class="px-5 py-5">
        <v-card class="card">
          <v-row class="justify-between">
            <v-col class="pt-0">
              <v-tabs
                center-active
                background-color="transparent"
                slider-color="white"
              >
                <v-tab>By Now</v-tab>
                <v-tab>Sell Now</v-tab>
                <v-tab>Community</v-tab>
                <v-tab>Help</v-tab>
              </v-tabs>
            </v-col>
            <v-col class="d-flex justify-center">
              <img src="Image1.png" />
            </v-col>
            <v-col>
              <div class="d-flex justify-end">
                <button  class="pa-1 px-2 mx-3 vbtn-color vbtn-round-shadow ">
                    <v-icon color="white"> mdi-magnify </v-icon>
                </button>
                <button  class="pa-1 px-2 mx-3 vbtn-color vbtn-round-shadow ">
                    <v-icon color="white"> mdi-account </v-icon>
                </button>
                <button  class="pa-1 px-2 mx-3 vbtn-color vbtn-round-shadow ">
                    <v-icon color="white"> mdi-earth </v-icon>
                </button>
                <button  class="pa-1 px-2 px-7 mx-3 vbtn-color vbtn-sign-in vbtn-round-shadow ">
                    Sign In
                </button>
              </div>
            </v-col>
          </v-row>
            <!-- <v-col>

            </v-col>
            <v-col class="d-flex justify-center">
              <img src="Image1.png" />
            </v-col>
            <v-col> </v-col> -->
            <HeaderBottom />
        </v-card>
      </div>
  </div>
</template>

<script>
import HeaderBottom from './HeaderBottom.vue'
export default {
    components:{
        HeaderBottom
    }
};
</script>

<style scoped>
.card {
  border-radius: 10px !important;
  background-color: #6633CC !important;
}
.v-tab {
  color: white !important;
  padding-top: 10px;
}
.theme--light.v-tabs .v-tabs-bar {
  background-color: transparent !important;
}
.v-tabs >>> .v-tabs-slider-wrapper {
  top: 0 !important;
  height: 5px !important;
  border-radius: 20px !important;
  background-color: white !important;
}
.vbtn-color{
    background-color: #7648d1;
    color: white;
}
.vbtn-sign-in{
    background-color: #FDB433;
}
.vbtn-round-shadow{
    border-radius: 5px;
    box-shadow: black;
}
</style>