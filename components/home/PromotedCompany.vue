<template>
<div id="promoted-company">
  <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
    >
      <v-img
        class="d-none d-md-flex"
        :aspect-ratio="16/9"
        :src="require('assets/img/natural-stone-show-room.webp')"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal pa-4 text-h6 white--text"
            style="height: 100%;"
          >
            With the best quality, services and reasonable prices for customers in the Middle East, the Persian Gulf Cooperation Council and other countries.

          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-6"
        style="position: relative;"
      >
        <v-btn

          to="/company/allastone.com"
          absolute
          color="orange"
          class="white--text d-none d-md-flex"
          fab
          large
          right
          top
        >
          <v-icon>mdi-phone</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text text-h6 mb-2">
          Best quality
        </div>
        <nuxt-link to="/company/allastone.com" class="text-h4 font-weight-light orange--text mb-2">
          Alla stone
        </nuxt-link>
        <div class="font-weight-light text-h6 mb-2">
          Specialist in consulting and supplying all kinds of building stones
          <br/>
          <br/>
        </div>

        <v-chip-group
          column
        >
          <v-chip class="deep-orange accent-4 white--text">Natural</v-chip>

          <v-chip class="deep-orange accent-4 white--text">Artificial</v-chip>

          <v-chip class="deep-orange accent-4 white--text">Decorative</v-chip>

          <v-chip class="deep-orange accent-4 white--text">etc</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions class="d-block d-md-none">
        <v-btn
          to="/company/allastone.com"
          outlined
          rounded
          text
        >
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>

</div>
</template>

<script>
export default {
  name: "PromotedCompany"
}
</script>

