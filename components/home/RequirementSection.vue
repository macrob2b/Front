<template>
  <!-- <div class="pa-2 section-one ma-5"> -->
  <div>
    <v-row>
      <v-col cols="12" md="8" class="pa-0  py-md-3 px-md-3">
        <div v-if="!mainVideo">
          <v-skeleton-loader
            class="slider-skeleton"
            :type="$vuetify.breakpoint.mdAndUp ? 'image,image,image,image' : 'image'"
          ></v-skeleton-loader>
        </div>
        <video v-else class="main-video" muted autoplay loop >
          <source :src="mainVideo" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <!--        <v-carousel-->
        <!--          v-else-->
        <!--          hide-delimiter-background-->
        <!--          show-arrows-on-hover-->
        <!--          class="carousel"-->
        <!--        >-->
        <!--          <template v-for="item in mainCarousel" v-if="item.file_type!='video'">-->
        <!--            <v-carousel-item eager>-->
        <!--              <template>-->
        <!--                <img v-if="item.file_type=='image'" :src="getFile(item.file)"-->
        <!--                     eager/>-->
        <!--                <video v-else-if="item.file_type=='video'" class="slide-video" muted autoplay loop>-->
        <!--                  <source :src="getFile(item.file)" type="video/mp4">-->
        <!--                  Your browser does not support the video tag.-->
        <!--                </video>-->
        <!--              </template>-->
        <!--            </v-carousel-item>-->
        <!--          </template>-->
        <!--          &lt;!&ndash;            <template v-slot:next="{ on, attrs }">&ndash;&gt;-->
        <!--          &lt;!&ndash;              <button&ndash;&gt;-->
        <!--          &lt;!&ndash;                v-bind="attrs"&ndash;&gt;-->
        <!--          &lt;!&ndash;                v-on="on"&ndash;&gt;-->
        <!--          &lt;!&ndash;                class="nextBtn" v-show="!$vuetify.breakpoint.xs">&ndash;&gt;-->
        <!--          &lt;!&ndash;                <img src="nextButton.png"/>&ndash;&gt;-->
        <!--          &lt;!&ndash;              </button>&ndash;&gt;-->
        <!--          &lt;!&ndash;            </template>&ndash;&gt;-->
        <!--          &lt;!&ndash;            <template class="d-none" v-slot:prev="{ on, attrs }">&ndash;&gt;-->
        <!--          &lt;!&ndash;              <button&ndash;&gt;-->
        <!--          &lt;!&ndash;                v-bind="attrs"&ndash;&gt;-->
        <!--          &lt;!&ndash;                v-on="on"&ndash;&gt;-->
        <!--          &lt;!&ndash;                class="nextBtn" v-show="!$vuetify.breakpoint.xs">&ndash;&gt;-->
        <!--          &lt;!&ndash;                <img src="nextButton.png"/>&ndash;&gt;-->
        <!--          &lt;!&ndash;              </button>&ndash;&gt;-->
        <!--          &lt;!&ndash;            </template>&ndash;&gt;-->
        <!--        </v-carousel>-->
      </v-col>

      <v-col  md="4" cols="12" class="d-none d-md-block" >
        <RequirementCard/>
<!--        <PromotedCompany/>-->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RequirementCard from "./RequirementCard.vue";
import PromotedCompany from "./PromotedCompany";

export default {
  components: {
    PromotedCompany,
    RequirementCard,
  },
  props: ['mediaList'],
  watch: {
    'mediaList': {
      handler(val) {
        if (!(val == null || val == "null")) {
          //Main banner 1
          var main_banner_1 = this.mediaList.filter(item => {
            return item.file_section == "main_banner_1"
          });
          if (main_banner_1 && main_banner_1[0] && main_banner_1[0]['file'])
            this.bannerImage1 = (`${process.env.baseUrl}/general/${main_banner_1[0]['file']}`);
          //End main banner 1


          //Main banner 2
          var main_banner_2 = this.mediaList.filter(item => {
            return item.file_section == "main_banner_2"
          });
          if (main_banner_2 && main_banner_2[0] && main_banner_2[0]['file'])
            this.bannerImage2 = (`${process.env.baseUrl}/general/${main_banner_2[0]['file']}`);
          //End main banner 2

          //Main carousel
          // var main_slide_items = this.mediaList.filter(item => {
          //   return item.file_section == "main_slide"
          // });
          // this.mainCarousel = main_slide_items;
          //End main carousel

          //Main video
          var main_video = this.mediaList.filter(item => {
            return item.file_section == "main_slide"
          });
          if (main_video && main_video[0] && main_video[0]['file'])
            this.mainVideo = (`${process.env.baseUrl}/general/${main_video[0]['file']}`);
          //End main video
        }


      },
      deep: true
    }
  },
  data() {
    return {
      bannerImage1: null,
      bannerImage1Loaded: false,

      bannerImage2: null,
      bannerImage2Loaded: false,

      mainCarousel: [],
      mainVideo: null,
      responsive_img1: "lorem-ipsum.png",
      responsive_img2: "lorem-ipsum.png",
      responsive_img3: "lorem-ipsum.png"
    }
  },
  methods: {
    getFile(file) {
      return `${process.env.baseUrl}/general/${file}`;
    },
    onImgLoad(img) {
      if (img == 'bannerImage1')
        this.bannerImage1Loaded = true;
      else if (img == 'bannerImage2')
        this.bannerImage2Loaded = true;
    }
  }
};
</script>
<style scoped>
.image-container img {
  height: 48%;
}


.slider-skeleton {
  max-height: 450px;
}

.main-video {
  width: 100%;
  max-width: 100%;
  height: auto;
}


@media screen and (min-width: 960px) {
  .main-video{
    border-radius: 5px;
  }
}

</style>
