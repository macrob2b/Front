<template>
  <div class="product-tab">
    <div class="searchbar-pagination-container">
      <searchBar></searchBar>
      <div class="text-center mt-4">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.length"
          :total-visible="pagination.total"
        ></v-pagination>
      </div>
    </div>
<!--    <div class="box-margin">-->
<!--      <mainBanner :links="mainBannerlinks"></mainBanner>-->
<!--      <div class="mt-5">-->
<!--        <smallBanners :links="smallBannerslinks"></smallBanners>-->
<!--      </div>-->

<!--      <slider class="slider"></slider>-->
<!--    </div>-->
<!--    <ContainerCard>-->
<!--      <ProductContainer title="New products">-->
<!--        <ProductSection1 :id="1"/>-->
<!--      </ProductContainer>-->
<!--    </ContainerCard>-->

<!--    <imglider class="box-margin"></imglider>-->
<!--    <logoSlider></logoSlider>-->
  </div>
</template>

<script>
  import searchBar from '../components/search-bar'
  import mainBanner from '../components/home/Banner'
  import smallBanners from '../components/home/Ads'
  import ProductContainer   from "../components/home/ProductContainer.vue"
  import ProductSection1    from "../components/home/ProductSection1.vue";

  export default {
    components: {
      searchBar,
      mainBanner,
      smallBanners,
      ProductContainer,
      ProductSection1,
    },
    data() {
      return {
        pagination: {
          page: 1,
          length: 25,
          total: 7
        },
        mainBannerlinks: {
          imagePath: require('@/assets/img/Group-9606.png'),
          title: 'title',
          subtitle: 'the quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quarts, vex nymphs, walts, bad',
          linkPath: '#'
        },
        smallBannerslinks: {
          firstimagePath: require('~/assets/img/Group-9610.png'),
          secondimagePath: require('~/assets/img/Group-9614.png'),
          firstlinkPath: '#',
          secondlinkPath: '#',
          firstDescription: 'Description goes here',
          secondDescription: 'Description goes here'
        }
      }
    }
  }
</script>
