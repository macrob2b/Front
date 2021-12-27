<template>
  <section class="product-gallery rounded-lg overflow-hidden ">
    <Share v-show="$vuetify.breakpoint.xs" class="mobile-share"/>
    <Carousel  :images="images" ></Carousel>
  </section>
</template>


<script>
  import Share from "./Share";
  import Carousel from "./Carousel";
  export default {
    components: {
      Carousel,
      Share
    },
    data(){
      return{
        images:[
          {
            id: '1',
            big: '/p1.jpeg',
            thumb: '/thumbs/p1.jpeg'
          },
          {
            id: '2',
            big: '/p2.jpeg',
            thumb: '/thumbs/p2.jpeg'
          },
          {
            id: '3',
            big: '/p3.jpeg',
            thumb: '/thumbs/p3.jpeg'
          },
          {
            id: '4',
            big: '/p4.jpeg',
            thumb: '/thumbs/p4.jpeg'
          }
        ]
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
  z-index: 50;
}

</style>
