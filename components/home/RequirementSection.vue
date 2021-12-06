<template>
  <!-- <div class="pa-2 section-one ma-5"> -->
  <ContainerCard>
    <v-row>
      <v-col cols="6" class="px-5">
        <v-carousel
          hide-delimiter-background
          show-arrows-on-hover
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
        <div class="d-flex-column image-container">
          <img src="bannerImage.png" />
          <img src="bannerImage.png" />
        </div>
      </v-col>

      <v-col cols="3">
        <RequirementCard />
      </v-col>
    </v-row>
    <!-- </div> -->
  </ContainerCard>
</template>

<script>
import RequirementCard from "./RequirementCard.vue";
import ContainerCard from "./ContainerCard.vue";

export default {
  components:{
    RequirementCard,
    ContainerCard
  }
};
</script>
<style scoped>
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