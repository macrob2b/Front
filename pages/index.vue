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
      <!-- <ProductSlider /> -->
    </v-app>
  </div>
</template>

<script>
import ContainerCard from "../components/home/ContainerCard.vue";
import Header from "../components/common/Header.vue";
import ProductContainer from "../components/home/ProductContainer.vue";
import Requirement from "../components/home/RequirementSection.vue";
import ProductSection1 from "../components/home/ProductSection1.vue";
import ProductSlider from '../components/product/ProductSlider.vue';


export default {
  components: {
    Header,
    Requirement,
    ContainerCard,
    ProductContainer,
    ProductSection1,
    ProductSlider,
  },
};
</script>
