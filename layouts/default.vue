<template>
  <!-- App.vue -->

  <v-app>
    <Header/>

    <v-main style="margin-top: 140px">
      <v-container fluid>
        <Nuxt/>
      </v-container>
    </v-main>

    <Footer/>
  </v-app>

</template>

<script>

// import AuthBar from "../components/AuthBar";
import Footer from '../components/common/Footer.vue';
import Header from '../components/common/Header.vue';

export default {
  components: {
    // AuthBar,
    Footer,
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


<style >
.pointer{
  cursor: pointer!important;
}
</style>
