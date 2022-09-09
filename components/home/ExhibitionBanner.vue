<template>
  <div>
    <v-card height="auto" class="mt-4 mt-md-8 buying-leads-banner">
      <v-img :src="require('../../assets/img/exhibition.webp')" class="pa-8" cover
             :max-height="$vuetify.breakpoint.xsOnly ? 'auto' : '400px'">
        <div class="mb-1">
          <v-img class="d-flex" :src="require('../../assets/img/arc_logo.png')" height="60" width="60"/>

        </div>

        <h3 class="text-h6 text-md-h4"> Maku international exhibition</h3>
        <p class="text--accent-1 text-md-h5 mt-1">
          The first exhibition of
          food &
          <br>
          agriculture,
          animal,
          <br>
          husbandry,
          fisheries, and
          <br>
          related industry.
        </p>

        <br>
        <p class="text--accent-1 text-md-h5">
          Date: 7-9 September 2022
        </p>
        <br>
        <p class="blue--text">
          <v-icon color="blue">
            mdi-map-marker
          </v-icon>
          Address: Azerbaijan-Maku city-shahid Ghanbari Blv
        </p>
        <p class="blue--text">
          <v-icon color="blue">
            mdi-phone
          </v-icon>
          Tel: +9821-22399604, +989120187304
        </p>

      </v-img>
    </v-card>


  </div>
</template>

<script>
export default {
  name: "ExhibitionBanner"
}
</script>

<style scoped>

</style>
