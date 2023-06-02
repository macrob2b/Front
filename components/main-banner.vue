<template>
  <div class="main-banner">
    <div class="banner-container">
      <div
        :style="{ 'content': 'url(' + links.imagePath + ')' }"
        class="banner"
      >
      </div>
      <div class="banner-details-container">
        <v-row class="banner-details-row">
          <v-col>
            <div class="titles-container">
              <div class="title-container">
                <h1>{{ links.title }}</h1>
              </div>
              <div class="subtitle-container">
                <p class="text-center">{{ links.subtitle }}</p>
              </div>
              <div class="btn-container1">
                <nuxt-link :to="{ path: links.linkPath}">
                  <v-btn>button</v-btn>
                </nuxt-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: {
        links: {
          type: Object,
          default: null
        }
      }
  }
</script>
