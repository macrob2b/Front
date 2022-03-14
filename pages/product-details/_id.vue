<template>
  <div>
    <v-app>
      <v-container>
        <ProductInfo :productInfo="product_details" />
        <SupplierInfo :productInfo="product_details"/>
<!--        <Banner />-->
<!--        <Ads />-->
<!--        <ContainerCard>-->
<!--          <ProductContainer title="Similar to searched before">-->
<!--            <ProductSection1 :id="3" />-->
<!--          </ProductContainer>-->
<!--        </ContainerCard>-->
      </v-container>
<!--      <Slider />-->
    </v-app>
  </div>
</template>

<script>
import ProductInfo from "../../components/detail/ProductInfo";
import SupplierInfo from "../../components/detail/SupplierInfo";
import Banner from "../../components/home/Banner";
import Ads from "../../components/home/Ads";
import ContainerCard from "../../components/home/ContainerCard";
import ProductContainer from "../../components/home/ProductContainer";
import Logo from "../../components/home/Logo";
import ProductSlider1 from "../../components/product/ProductSlider1";
import ProductSection1 from "../../components/home/ProductSection1";
import Slider from "../../components/detail/Slider";
export default {
  name: "index",
  auth: false,
  async asyncData({params, $axios}) {
    const product_details = await $axios.$post('/api/product_details',
      {
        id: params.id
      });
    return {product_details};

  },
  head() {
    return {
      title: this.product_details.title,
    };
  },
  data(){
    return{
      product_details:{},
    }
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
