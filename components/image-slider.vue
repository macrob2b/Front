<template>
  <v-container fluid class="image-slider">
    <v-sheet>
      <v-container fluid class="slider-header">
        <div class="header-container">
          <div class="header-column">
            <div class="header-title">
              <span class="design-square">&nbsp;</span>
              <p class="mb-0">Similar to searched before</p>
            </div>
          </div>
          <div class="header-column">
            <div class="btn-container">
              <v-btn
                class="more-btn"
                elevation="0"
                text
              >
                View all
              </v-btn>
            </div>
          </div>
        </div>
        <v-divider class="design-divider"></v-divider>
        <v-divider class="divider"></v-divider>
      </v-container>
    </v-sheet>
    <v-row>
      <v-col
        lg="2"
        md="3"
      >
        <div class="slider-static-img">
          <img src="~/assets/img/Group-9580.png" alt="slider-img">
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="10"
        md="9"
        sm="12"
        xs="12"
      >
        <v-sheet
          class="mx-auto product-slider"
          elevation="0"
        >
          <v-slide-group
            class="pa-4"
            active-class="success"
            show-arrows
          >
            <v-slide-item
              v-for="index in 10"
              :key="index"
            >
              <productBox></productBox>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import productBox from '../components/product-box'
  export default {
    components: {
      productBox
    }
  }
</script>
