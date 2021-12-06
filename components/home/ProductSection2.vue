<template>
  <v-row>
    <v-col>
      <ContainerCard width="100%">
        <ProductContainer title="New products">
          <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div>
        </ProductContainer>
      </ContainerCard>
    </v-col>
    <v-col>
      <ContainerCard width="100%">
        <ProductContainer title="New products">
          <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div>
        </ProductContainer>
      </ContainerCard>
      
    </v-col>
  </v-row>
</template>

<script>
import ProductCard2 from '../product/ProductCard2.vue';
import ContainerCard from './ContainerCard.vue';
import ProductContainer from './ProductContainer.vue';
export default {
  components: { ContainerCard, ProductContainer, ProductCard2 },};
</script>

<style scoped>
</style>