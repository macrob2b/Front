<template>
  <div class="card-carousel" >
    <v-carousel
      height="auto"
      v-model="carouselVal"
      hide-delimiters>
      <v-carousel-item
        :value="active_img"
        v-for="(image, index) in  images"
        :key="index"
        :src="image.big"
      ></v-carousel-item>
    </v-carousel>



    <div class="thumbnails ">
       <v-slide-group
         class="pa-4"

         active-class="success"
       >
         <v-slide-item
           class="mx-2"
           v-for="(image, index) in  images"
           :key="index"

         >
             <v-img class="thumbnail_itm"
               :class="carouselVal==index ? 'active_slide' : ''"
               @click="changeSlide(index)"
               :src="image.thumb"/>

         </v-slide-item>
       </v-slide-group>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Carousel',
    data() {
      return {
        carouselVal:null,
        //Index of the active image

      }
    },
    methods: {
     changeSlide(index){
       this.carouselVal=index;
     }
    },
    props: [ 'images']
  }
</script>


<style scoped>


  .thumbnails {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    position: absolute;
    bottom:10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }


  @media screen and (max-width: 600px) {
    .thumbnails {
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      bottom:0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }

    .thumbnails .thumbnail_itm{
      width: 50px!important;
      height: 40px!important;
    }
  }

  .active_slide {
    border: 2px solid #fff;
    border-radius: 5px;
  }

</style>
