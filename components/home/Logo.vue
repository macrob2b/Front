<template>
<<<<<<< HEAD
  <div class="my-10">
    <v-row>
      <v-col v-for="n in !$vuetify.breakpoint.xs ? itemsPerView.desktop : itemsPerView.mobile" :key="n">
        <v-card elevation="0">
          <img src="lorem-ipsum.png" width="100%"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
=======
<!--  <div class="my-10">-->
<!--    <v-row>-->
<!--      <v-col v-for="n in !$vuetify.breakpoint.xs ? `itemsPerView`.desktop : itemsPerView.desktop" :key="n">-->
<!--        <v-card elevation="0">-->
<!--          <img src="lorem-ipsum.png" width="100%"/>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--  </div>-->
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
</template>

<script>
export default {
<<<<<<< HEAD
  props: {
    itemsPerView: 7,
  },
=======
  // props: {
  //   itemsPerView: 7,
  // },
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
};
</script>

<style scoped>
</style>
