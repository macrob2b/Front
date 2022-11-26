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
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "Product",
              name: this.product_details.title,
              description: this.product_details.details,
              image: ((this.product_details.images && this.product_details.images!==null) ? this.product_details.images.map(x=>{
                return `${process.env.baseUrl}/products/${this.product_details._id}/images/${x}`;
              }) : []),
              aggregateRating: {
                "@type": "AggregateRating",
                "ratingValue": (this.product_details.rate / this.product_details.rate_count),
                "reviewCount": this.product_details.rate_count
              }
            }
          ),
          type: 'application/ld+json'
        }
      ],
      meta: [
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: 'business to business,free product advertising,free company advertising,sales,b2b marketing,b2b,b2b sales,b2b services,b2b business,business,business analyst,startup,startup business,startup funding,sell,selling,sellers agent,sellers market,buyers agent,buyer,wholesale,trading'
        },
      ]
    };
  },
  data(){
    return{
      product_details:{},
    }
  },
  mounted() {
    this.updateProductViewsCount();
  },
  methods:{
    updateProductViewsCount(){
      this.$axios.$post('/api/update_product_views',{id:this.$route.params.id});
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
