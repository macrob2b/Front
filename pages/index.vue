<template>
  <!-- <Tutorial/> -->
  <div>
    <v-app>
      <Header />
      <Requirement />
      <ContainerCard>
        <ProductContainer title="New products">
          <ProductSection1 />
        </ProductContainer>
      </ContainerCard>
      <Ads />
      <v-row>
        <v-col>
          <ContainerCard width="100%">
            <ProductContainer title="New products"> </ProductContainer>
          </ContainerCard>
        </v-col>
        <v-col>
          <ContainerCard width="100%">
            <ProductContainer title="New products"> </ProductContainer>
          </ContainerCard>
        </v-col>
      </v-row>
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
import Ads from "../components/home/Ads.vue";

export default {
  components: {
    Header,
    Requirement,
    ContainerCard,
    ProductContainer,
    ProductSection1,
    ProductSlider,
    Ads,
  },
};
</script>
