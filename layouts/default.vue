<template>
  <!-- App.vue -->

  <v-app>
    <v-app-bar
      absolute
      elevate-on-scroll
      scroll-target=""
      color="primary"
      app>

      <v-toolbar-title>
        <v-img src="favicon.ico" :width="50" :height="50"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>


      <div class="text-center">
        <v-menu
          :close-on-content-click="false"
          :min-width="290"
          offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on" icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-btn>
          </template>

          <AuthBar></AuthBar>

        </v-menu>
      </div>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt/>
      </v-container>
    </v-main>

    <v-footer color="primary" padless>

      <!--   social media icons   -->
      <v-btn
        v-for="icon in socialIcons"
        :key="icon"
        class="mx-4"
        dark
        icon>
        <v-icon size="24px">
          {{ icon }}
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <!--   local switch links   -->
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)">{{ locale.name }}
      </nuxt-link>


      <v-card-text class="py-2 white--text text-center">
        <span>{{ new Date().getFullYear() }} — <strong>E-Trade</strong></span>
      </v-card-text>
    </v-footer>
  </v-app>

</template>

<script>

import AuthBar from "../components/AuthBar";

export default {
  components: {AuthBar},
  data      : () => ({
    socialIcons: [
      'mdi-facebook',
      'mdi-twitter',
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
