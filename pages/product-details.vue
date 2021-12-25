<template>
  <div>
    <v-app>
      <v-container>
        <ProductInfo />
        <SupplierInfo />
        <Banner />
        <Ads />
        <ContainerCard>
          <ProductContainer title="Similar to searched before">
            <ProductSection1 :id="3" />
          </ProductContainer>
        </ContainerCard>
      </v-container>
      <Slider />
    </v-app>
  </div>
</template>

<script>
import ProductInfo from "../components/detail/ProductInfo";
import SupplierInfo from "../components/detail/SupplierInfo";
import Banner from "../components/home/Banner";
import Ads from "../components/home/Ads";
import ContainerCard from "../components/home/ContainerCard";
import ProductContainer from "../components/home/ProductContainer";
import Logo from "../components/home/Logo";
import ProductSlider1 from "../components/product/ProductSlider1";
import ProductSection1 from "../components/home/ProductSection1";
import Slider from "../components/detail/Slider";
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
    ProductSection1,
    Slider,
  },
};
</script>
