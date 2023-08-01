<template>
  <div class="mt-4">
    <v-row>
      <v-col cols="12">
        <v-slide-group :continuous="true" v-model="slideVal" center-active show-arrows="desktop">
          <v-slide-item v-slot="{ active, toggle }" key="0">
            <v-card to="/company/anildarya.com" :color="'default'" class="ma-4 " height="300" width="400"
              @click="toggle">
              <v-img :src="require('assets/img/anildarya.webp')" height="300" width="400" />
            </v-card>
          </v-slide-item>

          <v-slide-item v-slot="{ active, toggle }" key="0">
            <v-card to="/company/6310d3e01fe74211dc0eba54" :color="'default'" class="ma-4 " height="300" width="400"
              @click="toggle">
              <v-img :src="require('assets/img/saha.webp')" height="300" width="400" />
            </v-card>
          </v-slide-item>
          <v-slide-item v-slot="{ active, toggle }" key="1">
            <v-card :color="'default'" class="ma-4" height="300" width="400" to="/company/allastone.com" @click="toggle">
              <v-card-text>
                <v-btn absolute color="orange" class="white--text" fab x-small right top>
                  <v-icon>mdi-phone</v-icon>
                </v-btn>
                <div class="font-weight-light grey--text text-h6 mb-2">
                  Best quality
                </div>
                <div class="text-h4 font-weight-light orange--text mb-2">
                  Alla stone
                </div>
                <div class="font-weight-light text-h6 mb-2">
                  Specialist in consulting and supplying all kinds of building stones
                  <br />
                  <br />
                </div>

                <v-chip-group column>
                  <v-chip class="deep-orange accent-4 white--text">Natural</v-chip>

                  <v-chip class="deep-orange accent-4 white--text">Artificial</v-chip>

                  <v-chip class="deep-orange accent-4 white--text">Decorative</v-chip>

                  <v-chip class="deep-orange accent-4 white--text">etc</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions class="d-block d-md-none">
                <v-btn outlined x-small rounded text>
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
          <v-slide-item v-slot="{ active, toggle }" key="2">
            <v-card :color="'warning'" height="300" width="400" to="/company/agorsoftware.com" @click="toggle">
              <div class="ma-4">
                <p class="text-h4 text-md-h4  black--text">Agorsoftware</p>
                <ul class="mt-2">
                  <li>Web Software</li>
                  <li>Project Consulting Service</li>
                  <li>Marketplace Software</li>
                  <li>Project Development</li>
                </ul>


                <div class="mt-5">
                  <v-chip color="info">
                    24/7 Live Support
                  </v-chip>
                  <v-chip color="info">
                    High Performance
                  </v-chip>
                </div>

              </div>


            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <div class="d-flex justify-end px-5">
      <v-btn color="#165048" @click="clickLeft" medium width="40" min-width="0" v-show="!$vuetify.breakpoint.xs">
        <v-icon color="white"> mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn color="#165048" @click="clickRight" class="mx-2" medium width="40" min-width="0"
        v-show="!$vuetify.breakpoint.xs">
        <v-icon color="white"> mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>


<script>
export default {
  name: "PromotedSlider",
  data() {
    return {
      slideVal: 0,
      slideTimer: null
    };
  },
  mounted() {
    this.slideVal++;
  },
  watch: {
    slideVal(val, old_val) {
      if (val !== old_val) {
        clearTimeout(this.slideTimer);
        this.slideTimer = setTimeout(() => {
          if (this.slideVal === 2)
            this.slideVal = 0
          else
            this.slideVal++;
        }, 4000)
      }
    }
  },
  methods: {
    clickLeft() {
      if (this.slideVal === 0)
        this.slideVal = 2
      else
        this.slideVal--;

    },
    clickRight() {
      if (this.slideVal === 2)
        this.slideVal = 0
      else
        this.slideVal++;
    },

  },
}
</script>

<style scoped></style>
