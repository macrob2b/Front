<template>
  <v-card width="220px" height="auto">
    <!-- bbb_deals -->
    <div class="bbb_deals">
      <v-row class="px-2">
        <v-col cols="9">
          <div class="bbb_deals_title">Today's Combo Offer</div>
        </v-col>
        <v-col cols="3" class="text-right">
          <v-chip small class="primary d-inline-flex"><span><small class="cross">x </small>4</span></v-chip>
        </v-col>
      </v-row>
      <v-row class="bbb_deals_slider_container">
        <v-col cols="12" class=" bbb_deals_item">
          <v-img width="auto" height="200px" ><img src="https://i.imgur.com/9UYzfny.png" alt=""></v-img>
        </v-col>
      </v-row>
      <v-row class="px-4">
        <v-col cols="12">
          <div class="bbb_deals_content">
            <div class="bbb_deals_info_line d-flex flex-row justify-content-start">
              <div class="bbb_deals_item_category"><a href="#">Laptops</a></div>
              <div class="red--text ml-auto"><strike>₹30,000</strike></div>
            </div>
            <div class="bbb_deals_info_line d-flex flex-row justify-content-start">
              <div class="bbb_deals_item_name">HP Notebook</div>
              <div class="bbb_deals_item_price ml-auto">₹25,550</div>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="available">
              <div class="available_title">Available: <span>6</span></div>
          </div>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-rating
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            dense
            small
          />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "exhibition-product-card"
}
</script>

<style scoped>

</style>
