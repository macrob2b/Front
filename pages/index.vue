<template>
  <!-- <Tutorial/> -->
  <div>
    <v-app>
      <Header/>
      <Requirement/>
      <ContainerCard>
        <ProductContainer title="New products">
          <ProductSection1 :id="1"/>
        </ProductContainer>
      </ContainerCard>
      <Ads/>
      <ProductSection2/>
      <br/>
      <div className="pa-2 ma-5">
        <ProductSection3/>
      </div>
      <Banner/>
      <Ads/>
      <ContainerCard>
        <ProductContainer title="Similar to searched before">
          <ProductSection1 :id="3"/>
        </ProductContainer>
      </ContainerCard>

      <ContainerCard>
        <ProductContainer title="Similar to searched before">
          <ProductSlider1 :id="4"/>
        </ProductContainer>
      </ContainerCard>

      <div className="pa-2 ma-5">
        <Logo/>
      </div>

      <Footer/>
    </v-app>
  </div>
</template>

<script>
import ContainerCard from "../components/home/ContainerCard.vue";
import Header from "../components/common/Header.vue";
import ProductContainer from "../components/home/ProductContainer.vue";
import Requirement from "../components/home/RequirementSection.vue";
import ProductSection1 from "../components/home/ProductSection1.vue";
import ProductSlider from "../components/product/ProductSlider.vue";
import ProductSlider1 from "../components/product/ProductSlider1.vue";
import Ads from "../components/home/Ads.vue";
import ProductCard2 from "../components/product/ProductCard2.vue";
import ProductSection2 from "../components/home/ProductSection2.vue";
import ProductSection3 from "../components/home/ProductSection3.vue";
import Logo from "../components/home/Logo.vue";
import Footer from '../components/common/Footer.vue';
import Banner from '../components/home/Banner.vue';

export default {
  components: {
    Header,
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
    Logo,
    Footer,
    Banner
  },
};

</script>
