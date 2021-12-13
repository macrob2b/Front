<template>
  <!-- <div class="pa-2 section-one ma-5"> -->
  <div>
    <ContainerCard>
      <v-row >
        <v-col cols="12" md="6" class="px-5">
          <v-carousel
            hide-delimiter-background
            :show-arrows="false"
            class="carousel"
            height="auto"
          >
            <button class="nextBtn" v-show="!$vuetify.breakpoint.xs">
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

        <v-col  cols="3"  id="col1" v-show="!$vuetify.breakpoint.xs">
          <div
            class="d-flex-column image-container"
            id="div1"
          >
            <img src="bannerImage.png"  id="img1" />
            <img src="bannerImage.png"  id="img2" />
          </div>
        </v-col>

        <v-col cols="3" v-show="!$vuetify.breakpoint.xs">
          <RequirementCard />
        </v-col>
      </v-row>
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
#div1{
  display: flex; flex-direction: column
}
#img1{
  height: 80%
}
#img2{
  height: 80%
}
#img3{
  width: 100%
}
#img4{
  width: 100%
}
#img5{
  width: 100%
}
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
