<template>
  <v-sheet
    class="mx-auto logo-slider"
    elevation="0"
    max-width="100%"
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
            <img class="logo" src="~/assets/img/lorem.png" alt="logo">
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  export default {

  }
</script>
