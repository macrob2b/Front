<template>
  <v-sheet
    class="mx-auto slider-co"
    elevation="0"
    max-width="100vw"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="n in 15"
        :key="n"
      >
        <v-card
          class="ma-4"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <img class="slider-img" src="~/assets/img/Group-9614.png" alt="logo">
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  export default {
    data() {
      return {
        photos: [
          '~/assets/img/Group-9610.png',
          '~/assets/img/Group-9606.png'
        ],
        model: null
      }
    }
  }
</script>
