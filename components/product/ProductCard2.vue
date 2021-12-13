<template>
  <div class="mx-2">
    <v-card elevation="12">
      <div class="pa-2">
        <img src="card_img.png" width="100%" />
      </div>
      <div class="px-2">Product name</div>
      <div class="d-flex justify-space-between py-3">
        <div  class="px-2" id="div1">
          250 <span  id="span1"> $ </span>
        </div>
        <div class="px-3" >
            <v-btn color="primary" small min-width="0" width="30">
                <v-icon color="white" small>
                    mdi-chevron-right
                </v-icon>
            </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#div1{
  color: #165048; font-size: 25px
}
#span1{
  font-size: 10px
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  img{
    width: 126px;
    height: auto;
  }
}
</style>