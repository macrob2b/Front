<template>
  <div class="my-4 pa-3">
    <v-carousel :show-arrows="false" height="auto">
      <v-carousel-item v-for="item in slides" :key="item">
        <img :srcset="item" width="100%" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        "lorem-ipsum.png",
        "lorem-ipsum.png",
        "lorem-ipsum.png",
        "lorem-ipsum.png",
      ],
    };
  },
};
</script>

<style scoped>
</style>