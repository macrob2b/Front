<template>
  <!-- App.vue -->

  <v-app>
    <Header/>

    <v-main class="mainContainer">
      <v-container fluid>
        <Nuxt/>
      </v-container>
    </v-main>


  </v-app>

</template>

<script>

// import AuthBar from "../components/AuthBar";
import Header from '../components/common/Header.vue';

export default {
  name:'search_layout',
  components: {
    // AuthBar,
    Header
  },
  data      : () => ({
    socialIcons: [
      'mdi-facebook',
      'mdi-telegram',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
  computed  : {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>


<style>
.mainContainer {
  padding-top: 170px !important;
}
@media screen and (max-width: 960px) {
  .mainContainer {
    padding-top: 125px !important;
  }
}
</style>
