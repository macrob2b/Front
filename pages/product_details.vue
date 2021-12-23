<template>
  <div>
    <v-app>
      <div className="px-lg-8 px-xs-2">
        <ProductInfo/>
        <SupplierInfo/>
      </div>
      <div v-show="!$vuetify.breakpoint.xs">
        <Banner/>
        <Ads/>
      </div>
      <div v-show="$vuetify.breakpoint.xs">
        <CarouselResponsive/>
      </div>

      <ContainerCard>
        <ProductContainer title="Similar to searched before">
          <ProductSection1 :id="3"/>
        </ProductContainer>
      </ContainerCard>
      <Logo :itemsPerView="{ desktop: 7, mobile: 3 }"/>
    </v-app>
  </div>
</template>

<script>
import ProductInfo from "../components/detail/ProductInfo";
import SupplierInfo from "../components/detail/SupplierInfo";
import CarouselResponsive from "../components/home/CarouselResponsive.vue";
import Banner from "../components/home/Banner";
import Ads from "../components/home/Ads";
import ContainerCard from "../components/home/ContainerCard";
import ProductContainer from "../components/home/ProductContainer";
import Logo from "../components/home/Logo";
import ProductSlider1 from "../components/product/ProductSlider1";
import ProductSection1 from "../components/home/ProductSection1";

export default {
  name: "index",
  auth: false,
  head() {
    return {
      title: this.$t("Main_PAGE_TITLE"),
    };
  },
  components: {
    ProductInfo,
    SupplierInfo,
    ProductContainer,
    ContainerCard,
    Ads,
    Banner,
    Logo,
    ProductSlider1,
    CarouselResponsive,
    ProductSection1,
  },
};
</script>
