<template>
  <section class="product-gallery rounded-lg overflow-hidden ">
    <Share
         :companyId="productDetails.company_id"
         class="mobile-share"/>
    <div class="card-carousel">
      <v-carousel
        :height="$vuetify.breakpoint.xsOnly ? 300 : 500"
        v-model="carouselVal"
        hide-delimiters>
        <v-carousel-item v-if="productDetails.video">
          <video-player  :options="videoOptions"/>
        </v-carousel-item>
        <v-carousel-item
          :value="active_img"
          v-for="(image, index) in  productDetails.images"
          :key="index"
          :src="getImgFile(image)"
        ></v-carousel-item>
      </v-carousel>


      <div class="thumbnails" v-if="productDetails.images && productDetails.images.length>1">
        <v-slide-group
          class="pa-4"

          active-class="success"
        >
          <v-slide-item
            class="mx-2 thumbnail_itm"
            v-for="(image, index) in  productDetails.images"
            :key="index"

          >
            <v-img
              :class="carouselVal==index ? 'active_slide' : ''"
              @click="changeSlide(index)"
              :src="getImgFile(image)"/>

          </v-slide-item>
        </v-slide-group>

      </div>
    </div>
  </section>
</template>


<script>
  import Share from "./Share";
  import VideoPlayer from "../VideoPlayer";


  export default {
    components: {
      Share,
      VideoPlayer
    },
    props:['productDetails'],
    mounted() {
    },
    methods:{
      changeSlide(index) {
        this.carouselVal = index;
      },
      getImgFile(item) {
        var img = require('assets/img/no-image.png');
        if (item && item.length > 0)
          img = "https://dl.macrob2b.com/products/" + this.$route.params.id + "/images/" + item;
        return img;

      }
    },
    data(){
      return{
        videoOptions: {
          autoplay: true,
          muted:true,
          loop:true,
          sources: [
            {
              src:
                `${process.env.baseUrl}/products/${this.productDetails._id}/video/${(this.productDetails && this.productDetails.video ? this.productDetails.video : '')}`,
            }
          ]
        },


        carouselVal: null,
        images:[],
        active_img:null,
      }
    }

  }
</script>

<style lang="scss" scoped>
.product-gallery {
  position: relative;
}
.mobile-share {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}



.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.thumbnails .thumbnail_itm {
  max-width: 80px !important;
  max-height: 80px !important;
}

@media screen and (max-width: 600px) {
  .thumbnails {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  .thumbnails .thumbnail_itm {
    max-width: 50px !important;
    max-height: 40px !important;
  }
}

.active_slide {
  border: 2px solid #fff;
  border-radius: 5px;
}


</style>
