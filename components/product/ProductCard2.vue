<template>
  <div class="mx-2">
    <v-card elevation="12">
      <div class="pa-2">
        <img src="card_img.png" width="100%" />
      </div>
      <div class="px-2">Product name</div>
      <div class="d-flex justify-space-between py-3">
        <div style="color: #165048; font-size: 25px" class="px-2">
          250 <span style="font-size: 10px"> $ </span>
        </div>
        <div class="px-3" >
            <v-btn color="#00394D" small min-width="0" width="30">
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
</style>