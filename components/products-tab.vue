<template>
  <div class="product-tab">

    <div class="searchbar-pagination-container">

      <searchBar :productList="product_list" :loadingStatus="loading"
                 @sortChanged="applySort"
                 @filterChanged="applyFilter"
      />
      <div class="text-center mt-4" v-show="page_loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            :size="40"
            :width="4"
            class="mt-12 mb-12"
            color="orange"
            indeterminate
          />
        </v-col>
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
      page_loading: true,
      length: 1,
      total: 8,
      all_files_loaded:false,
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
      loading: false,
      page_load_option: {},
    }
  },
  mounted() {
    this.getProductList();
    this.scroll();
  },
  watch: {
    page(val) {
      this.getProductList();
    },
    "$route.query.cate_id"(val) {
      this.page=1;
      this.product_list=[];
      this.getProductList();
    }
  },
  methods: {
    getProductList() {
      this.loading = true;

      this.page_load_option.page = this.page;
      this.page_load_option.cate_id = this.$route.query.cate_id;

      this.$axios.$post('/api/product_list',
        this.page_load_option)
        .then(res => {
          this.product_list.push(...res.data);
          this.length = Math.ceil(res.total / res.per_page);
          this.loading = false;
          if (res.data.length === 0)//For terminate auto load request
            this.all_files_loaded = true;
        })
        .catch(err => {
          this.loading = false;
          this.$toast.error(err);
        })
    },
    applyFilter(event) {
      this.page=1;
      this.product_list=[];
      for (var key in event) {
        this.page_load_option[key] = event[key];
      }
      // this.market = event.market;
      // this.employee = event.employee;
      this.getProductList();
    },
    applySort(event) {
      this.page=1;
      this.product_list=[];
      this.page_load_option.created_at_sort = event.register_date;
      this.getProductList();
    },
    scroll() {//For infinite loading
      window.onscroll = () => {
        //Scroll position
        var scrollPosition = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight + 50;
        let bottomOfWindow = scrollPosition >= document.documentElement.offsetHeight

        //Avoid the number of requests
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }

        //Load next page
        if (bottomOfWindow && this.all_files_loaded === false) {
          this.page_loading = true;
          this.timer = setTimeout(() => {
            this.page++
            this.getProductList();
          }, 800)
        }
      }
    },
  }
}
</script>
