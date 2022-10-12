<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">{{ page_info.title }}</h1>
        <p class="mt-3" v-html="page_info.describe"/>
      </v-col>

      <v-col cols="12">
        <ProductContainer :title="`${page_info.title} companies`">
          <CompanyCarousel :companies="companies"/>
        </ProductContainer>
      </v-col>
      <v-divider class="my-4 "/>
      <v-col cols="12" class="text-center">
        <v-btn :to="$auth.loggedIn ? '/user/company' : '/login'" color="green" outlined>Add your company for free Now</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productContainer from "../../components/home/ProductContainer";
import companyCarousel from "../../components/company/company-carousel";
export default {
  auth: false,
  name: "static_page",
  async asyncData({params, $axios, error}) {
    const page_info = await $axios.$post('/api/get_country',
      {
        machine_name: params.machine_name
      });

    if (page_info.length === 0)
      error({statusCode: 404, message: 'Page not found'})
    else
      return {page_info};

  },
  components:{
    productContainer,
    companyCarousel
  },
  head() {
    return {
      title: this.page_info.title
    }
  },
  data(){
    return{
      companies: []
    }
  },
  mounted() {
    this.getCountryCompanies();
  },
  methods: {
    getCountryCompanies() {
      this.$axios.$post('/api/get_country_companies',
        {
          country: this.$route.params.machine_name
        })
        .then(response => {
          this.companies = response;
        })
        .catch(err => {
          console.log(err);
        })
    },
  }
}
</script>

<style scoped>

</style>
