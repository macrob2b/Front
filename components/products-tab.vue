<template>
  <div class="product-tab">

    <div class="searchbar-pagination-container">

      <searchBar :productList="product_list" :loadingStatus="loading"></searchBar>
      <div class="text-center mt-4" v-if="length>1">
        <v-pagination
          v-model="page"
          :length="length"
          :total-visible="total"
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
import ProductContainer from "../components/home/ProductContainer.vue"
import ProductSection1 from "../components/home/ProductSection1.vue";

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
      //Pagination
      page: 1,
      length: 1,
      total: 8,
      //End pagination

      product_list: [],
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
      },
      loading:false
    }
  },
  mounted() {
    this.getProductList();
  },
  watch: {
    page(val){
    this.getProductList();
    }
  },
  methods: {
    getProductList() {
      this.loading=true;
      this.$axios.$post('/api/product_list',
        {
          page: this.page
        })
        .then(res => {
          this.product_list = res.data;
          this.length = Math.ceil(res.total / res.per_page);
          this.loading=false;
        })
        .catch(err => {
          this.loading=false;
          this.$toast.error(err);
        })
    }
  }
}
</script>
