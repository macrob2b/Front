<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content main-product-tab-content">
      <div class="mb-8 title">
        <v-icon class="secondary-color">mdi-tag</v-icon>
        Main products
      </div>
          <v-row
            no-gutters
          >
            <v-col
              v-for="index in 15"
              :key="index"
              class="my-2"
              cols="6"
              sm="4"
              md="4"
              lg="3"
            >
              <productBox></productBox>
            </v-col>
          </v-row>
    </div>
  </div>
</template>

<script>

import productBox from '~/components/product-box'
export default {
  components: {
    productBox
  },
  data() {
    return {

    }
  }
}
</script>
