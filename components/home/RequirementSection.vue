<template>
  <!-- <div class="pa-2 section-one ma-5"> -->
  <div>
    <ContainerCard>
      <v-row v-show="!$vuetify.breakpoint.xs">
        <v-col cols="6" class="px-5">
          <v-carousel
            hide-delimiter-background
            :show-arrows="false"
            class="carousel"
            height="auto"
          >
            <button class="nextBtn">
              <img src="nextButton.png" />
            </button>
            <template v-slot:prev="{ on, attrs }">
              <v-btn color="success" v-bind="attrs" v-on="on"
                >Previous slide</v-btn
              >
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
            </template>
            <v-carousel-item>
              <img src="carousel.png" width="100%" />
            </v-carousel-item>
            <v-carousel-item>
              <img src="carousel.png" width="100%" />
            </v-carousel-item>
            <v-carousel-item>
              <img src="carousel.png" width="100%" />
            </v-carousel-item>
            <v-carousel-item>
              <img src="carousel.png" width="100%" />
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <v-col cols="3">
          <div
            class="d-flex-column image-container"
            style="display: flex; flex-direction: column"
          >
            <img src="bannerImage.png" style="height: 80%" />
            <img src="bannerImage.png" style="height: 80%" />
          </div>
        </v-col>

        <v-col cols="3">
          <RequirementCard />
        </v-col>
      </v-row>
      <div v-show="$vuetify.breakpoint.xs" class="d-flex-column">
        <div class="banner1 pa-2">
          <img :srcset="responsive_img1" style="width: 100%" />
        </div>
        <div class="d-flex justify-center pa-2">
          <div class="mx-2">
            <img :srcset="responsive_img2" style="width: 100%" />
          </div>
          <div class="mx-2">
            <img :srcset="responsive_img3" style="width: 100%" />
          </div>
        </div>
      </div>
    </ContainerCard>
  </div>
</template>

<script>
import RequirementCard from "./RequirementCard.vue";
import ContainerCard from "./ContainerCard.vue";

export default {
  components: {
    RequirementCard,
    ContainerCard,
  },
  data(){
    return{
      responsive_img1 : "lorem-ipsum.png",
      responsive_img2 : "lorem-ipsum.png",
      responsive_img3 : "lorem-ipsum.png"
    }
  }
};
</script>
<style scoped>
.marg {
  margin-top: 180px;
}
.image-container {
  height: 100%;
}
.image-container img {
  height: 48%;
}
.nextBtn {
  position: absolute;
  right: 60px;
  bottom: 50px;
  z-index: 30;
}
.section-one {
  background-color: #f8f8f8;
  border-radius: 10px;
}
</style>
