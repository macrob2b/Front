<template>
  <div class="my-10">
    <v-row>
      <v-col v-for="n in !$vuetify.breakpoint.xs ? itemsPerView.desktop : itemsPerView.mobile" :key="n">
        <v-card elevation="0">
          <img src="lorem-ipsum.png" width="100%"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    itemsPerView: 7,
  },
};
</script>

<style scoped>
</style>
