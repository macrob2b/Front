<template>
  <!-- <Tutorial/> -->
  <div>
    <v-app>
      <div>
        <Requirement :mediaList="media_list"/>
      </div>

      <ProductContainer title="New products">
        <ProductSection1 :id="1" :mediaList="media_list"/>
      </ProductContainer>


      <br/>
      <ProductSection2/>
      <br/>


      <ProductContainer title="Suggested companies">
        <CompanyCarousel/>
      </ProductContainer>


      <!--Promote section two-->
<!--      <v-row>-->
<!--        <v-col cols="12">-->
<!--          <v-card to="/company/agorsoftware.com" color="warning">-->
<!--            <v-row>-->
<!--              <v-col cols="12" md="6" class="py-0 d-none d-md-block">-->
<!--                <v-img-->
<!--                  height="260"-->
<!--                  src="/ads/agorsoftware.webp"-->
<!--                ></v-img>-->
<!--              </v-col>-->
<!--              <v-col cols="12" md="6">-->
<!--                <div class="ma-4">-->
<!--                  <p class="text-h4 text-md-h2  black&#45;&#45;text">Agorsoftware</p>-->
<!--                  <ul class="mt-2">-->
<!--                    <li>Web Software</li>-->
<!--                    <li>Project Consulting Service</li>-->
<!--                    <li>Marketplace Software</li>-->
<!--                    <li>Project Development</li>-->
<!--                  </ul>-->


<!--                  <div class="mt-5">-->
<!--                    <v-chip color="info">-->
<!--                      24/7 Live Support-->
<!--                    </v-chip>-->
<!--                    <v-chip color="info">-->
<!--                      High Performance-->
<!--                    </v-chip>-->
<!--                  </div>-->

<!--                </div>-->


<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
      <!--End promote section two-->
      <v-row>
        <v-col cols="12" md="12">
          <BuyingLeadsBanner/>
        </v-col>
        <!--        <v-col cols="12" md="6">-->
        <!--          <ExhibitionBanner/>-->
        <!--        </v-col>-->
      </v-row>


      <!--Promote slides-->
      <promoted-slider/>
      <!--End promote slides-->


      <v-row class="mt-8">
        <v-col cols="12" md="6">
          <v-card class="pa-6">
            <v-row>
              <v-col cols="9">
                <h3>Customized products</h3>
                <p>
                  Manufacturing ability to offer a variety of designs or details for one product, made specifically to a
                  buyer's liking ...
                </p>
              </v-col>
              <v-col cols="3">
                <v-img max-width="100px" max-height="100px" :src="require('assets/img/customized.png')"/>
              </v-col>

              <v-col cols="12">
                <!--                <h4>Show all</h4>-->
                <v-slide-group
                  class="py-4"
                  active-class="success"
                  show-arrows
                >
                  <v-slide-item
                    v-for="item in customized_products"
                    class="mx-2"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      :to="`/product-details/${item._id}`"
                      width="70"
                      height="70"
                    >
                      <v-img
                        :src="getImg(item)"
                        height="70px"
                      ></v-img>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="pa-6">
            <v-row>
              <v-col cols="9">
                <h3>Ready-to-ship products</h3>
                <p>
                  Source from Macrob2b products that are ready to ship
                </p>
              </v-col>
              <v-col cols="3" class="text-right">
                <v-img max-width="120px" max-height="100px" height="auto"
                       :src="require('assets/img/ready-to-ship.png')"/>
              </v-col>
              <v-col cols="12">
                <!--                  <h4>Show all</h4>-->
                <v-slide-group
                  class="py-4"
                  active-class="success"
                  show-arrows
                >
                  <v-slide-item
                    v-for="item in ready_to_ship_products"
                    class="mx-2"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                      :to="`/product-details/${item._id}`"
                      width="70"
                      height="auto"
                      max-height="70"
                    >
                      <v-img
                        :src="getImg(item)"
                        height="70px"
                      ></v-img>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!--      <div class="pa-2 ma-5">-->
      <!--        <ProductSection3/>-->
      <!--      </div>-->
      <!--      <div v-show="!$vuetify.breakpoint.xs">-->
      <!--        <Banner/>-->
      <!--        <Ads/>-->
      <!--      </div>-->

      <!--      <div v-show="$vuetify.breakpoint.xs">-->
      <!--        <CarouselResponsive/>-->
      <!--      </div>-->

      <!--      <ContainerCard>-->
      <!--        <ProductContainer title="Similar to searched before">-->
      <!--          <ProductSection1 :id="3"/>-->
      <!--        </ProductContainer>-->
      <!--      </ContainerCard>-->

      <!--      <ContainerCard>-->
      <!--        <ProductContainer title="Similar to searched before">-->
      <!--          <ProductSlider1 :id="4"/>-->
      <!--        </ProductContainer>-->
      <!--      </ContainerCard>-->

      <!--      <div class="pa-2 ma-5" v-show="!$vuetify.breakpoint.xs">-->
      <!--        <Logo />-->
      <!--      </div>-->
    </v-app>
  </div>
</template>

<script>
import ContainerCard from "../components/home/ContainerCard.vue";
import ProductContainer from "../components/home/ProductContainer.vue";
import Requirement from "../components/home/RequirementSection.vue";
import ProductSection1 from "../components/home/ProductSection1.vue";
import ProductSlider from "../components/product/ProductSlider.vue";
import ProductSlider1 from "../components/product/ProductSlider1.vue";
import Ads from "../components/home/Ads.vue";
import ProductCard2 from "../components/product/ProductCard2.vue";
import ProductSection2 from "../components/home/ProductSection2.vue";
import ProductSection3 from "../components/home/ProductSection3.vue";
import CarouselResponsive from "../components/home/CarouselResponsive.vue";
import Banner from "../components/home/Banner.vue";
import CompanyCarousel from "../components/company/company-carousel";
import BuyingLeadsBanner from "../components/home/BuyingLeadsBanner";
import img from "../assets/img/no-image.png";
import ExhibitionBanner from "../components/home/ExhibitionBanner";
import PromotedSlider from "../components/common/PromotedSlider";

export default {
  name: 'index',
  auth: false,
  head() {
    return {
      title: this.$t('Main_PAGE_TITLE'),
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: "Global B2B marketplace connecting buyers with suppliers all over the world"
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: 'business to business,free product advertising,free company advertising,sales,b2b marketing,b2b,b2b sales,b2b services,b2b business,business,business analyst,startup,startup business,startup funding,sell,selling,sellers agent,sellers market,buyers agent,buyer,wholesale,trading'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.$t('Main_PAGE_TITLE'),
        }
      ]
    }
  },
  mounted() {
    this.getMediaList();

    this.getProducts('customize');
    this.getProducts('ready_to_ship');
  },
  data() {
    return {
      media_list: null,
      customized_products: {},
      ready_to_ship_products: {},

      customized_loading: false,
      ready_to_ship_loading: false,
    }
  },
  components: {
    PromotedSlider,
    ExhibitionBanner,
    BuyingLeadsBanner,
    CompanyCarousel,
    Requirement,
    ContainerCard,
    ProductContainer,
    ProductSection1,
    ProductSlider,
    ProductSlider1,
    Ads,
    ProductCard2,
    ProductSection2,
    ProductSection3,
    // Logo,
    CarouselResponsive,
    Banner,
  },
  methods: {
    async getMediaList() {
      let mediaApiURL = `/api/media_list`;
      await this.$axios.$post(mediaApiURL,
        {
          "keyword": this.search,
        }
      ).then(response => {
        if (response)
          this.media_list = response;
      })
        .catch(e => {
          console.log('error');
        })
    },
    async getProducts(product_type) {
      if (product_type == 'customize')
        this.customized_loading = true;
      else if (product_type == 'ready_to_ship')
        this.ready_to_ship_loading = true;

      await this.$axios.$post('/api/product_list'
        , {
          take: 16,
          by_company: true,
          product_type: product_type
        })
        .then(response => {
          if (product_type == 'customize') {
            this.customized_products = response;
            this.customized_loading = false;
          } else if (product_type == 'ready_to_ship') {
            this.ready_to_ship_products = response;
            this.ready_to_ship_loading = false;
          }
        }).catch(err => {
          console.error(err);
        });
    },
    getImg(item) {
      var img = require('assets/img/no-image.png');
      if (item.images && item.images.length > 0)
        img = "https://dl.macrob2b.com/products/" + item._id + "/images/thumbnail/" + item.images[0];
      return img;
    }
  }
};
</script>


