<template>
  <div class="mx-2 card">
    <v-card>
      <div class="pa-2">
        <img src="card_img.png" />
      </div>
      <div class="text-center">Product Name</div>
      <div class="text-center" style="color: #165048; font-size: 26px">
        250 <span style="font-size: 13px">$</span>
      </div>
      <div class="pb-3 pa-4">
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
</style>