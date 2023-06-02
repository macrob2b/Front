<template>
  <div class="small-banners">
    <v-row
      class="small-banners-container"
    >
      <v-col
        class="small-banners-column"
        cols="6"
      >
        <div class="banner-container">
          <div
            :style="{ 'content': 'url(' + links.firstimagePath + ')' }"
            class="banner"
          >
          </div>
          <div class="banner-details-container">
            <v-row>
              <v-col>
                <div class="titles-container">
                  <div class="title-container">
                    <p class="text-center">{{ links.firstDescription }}</p>
                  </div>
                  <div class="btn-container1">
                    <nuxt-link :to="{ path: links.firstlinkPath}">
                      <v-btn class="first-btn"><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </nuxt-link>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
      <v-col
        class="small-banners-column"
        cols="6"
      >
        <div class="banner-container">
          <div
            :style="{ 'content': 'url(' + links.secondimagePath + ')' }"
            class="banner"
          >
          </div>
          <div class="banner-details-container">
            <v-row>
              <v-col>
                <div class="titles-container">
                  <div class="title-container">
                    <p class="text-center">{{ links.secondDescription }}</p>
                  </div>
                  <div class="btn-container1">
                    <nuxt-link :to="{ path: links.secondlinkPath}">
                      <v-btn class="second-btn"><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </nuxt-link>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
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
