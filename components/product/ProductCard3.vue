<template>
  <div>
    <v-card color="white">
      <img src="bannerImage.png" width="100%" />
      <div class="text-center mb-3"  id="div1">Product Name</div>
      <div class="text-center"  id="div2">
        250 <span  id="span1">$</span>
      </div>
      <div class="pb-3 pa-4">
        <v-btn color="primary" width="100%">
          <span  id="span2">Buy Now</span>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#div1 {
  color: black;
  letter-spacing: 2px;
  font-weight: 400;
}
#div2 {
  color: #165048;
  font-size: 26px;
}
#span1 {
  font-size: 13px;
}
#span2 {
  color: white;
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  img {
    width: 126px;
    height: auto;
  }
}
</style>