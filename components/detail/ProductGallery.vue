<template>
  <section class="product-gallery rounded-lg overflow-hidden ">
    <Share v-show="$vuetify.breakpoint.xs" class="mobile-share"/>
    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>


<script>
  import Share from "./Share";

  export default {
    components: {Share},
    data() {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  }
</script>

<style scoped>
  .product-gallery{
    position: relative;
  }
  .mobile-share{
    position: absolute;
    top:10px;
    left:10px;
    z-index: 50;
  }
</style>
