<template>
  <!-- <Tutorial/> -->
  <div>
    <v-app>
      <!-- <v-alert border="top" color="red lighten-2" dark>
        I'm an alert with a top border and red color
      </v-alert>
      <v-color-picker></v-color-picker> -->
      <Header />
    </v-app>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {
    Header,
  },
};
</script>
