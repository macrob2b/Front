<template>
  <div class="mx-2 card">
    <v-card min-width="0">
      <div class="pa-2">
        <img src="card_img.png" />
      </div>
      <div class="text-center">Product Name</div>
      <div class="text-center" style="color: #165048; font-size: 26px">
        250 <span style="font-size: 13px">$</span>
      </div>
      <div class="pb-3 pa-4 btn">
        <v-btn color="#00394D" width="100%">
          <span style="color: white">Button</span>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card{
    z-index: 50;
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  img{
    width: 126px;
    height: auto;
  }
  .text-center{
    font-size : 13px !important;
  }
  .v-btn{
    font-size : 12px !important;
    min-width: 0px !important;
    width: 110px !important;
    text-align: center !important;
  }
}
</style>