<template>
  <div class="pa-8 secondary-background company-details-tabs-content about-company">
    <v-row class="mb-8">
      <v-col cols="12" lg="8" class="">
        <div class="mb-8 title">
          <v-icon class="secondary-color">mdi-office-building</v-icon>
          About company
        </div>
        <p class="text-justify">
          {{ companyInfo.description }}
        </p>

      </v-col>
      <v-col cols="12" lg="4" class="d-lg-flex justify-lg-end">
        <v-carousel :show-arrows="false" class="company-image">
          <v-carousel-item
            v-for="(item,i) in companyInfo.images"
            :key="i"
            :src="getFile(item,'image')"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="mb-8">
      <v-col cols="12" class="">
        <h2 class="title">
          <v-icon class="secondary-color">mdi-office-building</v-icon>
          Company Overview
        </h2>
      </v-col>
      <v-col cols="12" lg="8" class="">
        <div class="fill-height py-4  white rounded-lg">
          <h3 class="subtitle-1 font-weight-bold mb-4 px-4">Company basic informations</h3>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Company name</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <span class="body-2">{{ companyInfo.company_name }}</span>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Location</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <span class="body-2">{{ companyInfo.country }}</span>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Business type</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4"
                     v-if="companyInfo.business_type_info && companyInfo.business_type_info.title">
                <span class="body-2">{{ companyInfo.business_type_info.title }}</span>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Year established</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <span class="body-2">{{ companyInfo.year_established }}</span>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Employees total</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <span class="body-2">{{ companyInfo.employees_total }}</span>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Annual Revenue</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <span class="body-2">${{ companyInfo.annual_revenue | currency}}</span>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Website</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <a :href="companyInfo.website" target="_blank" class="body-2">{{ companyInfo.website }}</a>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-divider></v-divider>
            <v-row class="row align-center ma-0">
              <v-col cols="6" md="4" class="px-4">
                <span class="body-2">Ownership</span>
              </v-col>
              <v-col cols="6" md="8" class="px-4">
                <span class="body-2">{{ companyInfo.owner.first_name }} {{ companyInfo.owner.last_name }}</span>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" class="d-lg-flex justify-lg-end">
        <div class="white pa-3 rounded-lg" style="width: 100%">
          <div v-if="companyInfo.verified" class="d-flex align-baseline">
            <img src='~/assets/img/verify.png' class="verify-logo me-4"/>
            <span class="primary-color title font-weight-black">Supplier</span>
          </div>
          <p v-if="companyInfo.verified" class="mb-4">
            This supplier has been verified onsite by world-leading
            inspection company,
            <NuxtLink to="" class="font-weight-black primary-color ms-3">Intertek</NuxtLink>
          </p>
          <div class="d-flex align-center" v-if="companyInfo.verified">
               <span>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20"
                       height="20" viewBox="0 0 20 20">
                  <defs>
                    <clipPath id="clip-path">
                      <rect id="basic_clock_Background_Mask_" data-name="basic / clock (Background/Mask)" width="20"
                            height="20" transform="translate(0.001 0)" fill="none"/>
                    </clipPath>
                  </defs>
                  <g id="basic_clock" data-name="basic / clock" transform="translate(-0.001 0)">
                    <rect id="basic_clock_Background_Mask_2" data-name="basic / clock (Background/Mask)" width="20"
                          height="20" transform="translate(0.001 0)" fill="none"/>
                    <g id="basic_clock-2" data-name="basic / clock" clip-path="url(#clip-path)">
                      <path id="coolicon"
                            d="M8,16a8.009,8.009,0,1,1,5.654-2.346A8.009,8.009,0,0,1,8,16ZM8,1.6A6.4,6.4,0,1,0,14.4,8,6.407,6.407,0,0,0,8,1.6Zm4,7.2H7.2V4H8.8V7.2H12V8.8Z"
                            transform="translate(2.001 2)" fill="#fdb433"/>
                    </g>
                  </g>
                </svg>
               </span>
            <span class="font-weight-light ms-3">2021,07,21</span>
          </div>
          <div class="">
            <video width="100%" height="100%" controls class="mb-4">
              <source :src="getFile(companyInfo.video,'video')" type="video/mp4">
              Your browser does not support the video tag.
            </video>

          </div>

        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mb-8">
        <h2 class="title">
          <v-icon class="secondary-color">mdi-chart-pie</v-icon>
          Products
        </h2>
      </v-col>
      <v-col cols="12" class="mb-8">
         <ProductSlider :new-products="company_products"></ProductSlider>
      </v-col>
    </v-row>
<!--    <v-row>-->
<!--      <v-col cols="12" class="mb-8">-->
<!--        <h2 class="title">-->
<!--          <v-icon class="secondary-color">mdi-chart-pie</v-icon>-->
<!--          Performance overview-->
<!--        </h2>-->
<!--      </v-col>-->
<!--      <v-col cols="6" lg="3" class="py-0 mb-8">-->
<!--        <v-card class="fill-height performance-card-item rounded-lg">-->
<!--          <div class="d-flex flex-column pa-2 sales">-->
<!--            <div class="card-header mb-1">-->
<!--              <span class="d-inline-block title font-weight-black primary-color py-3 px-6 rounded-lg"-->
<!--                    style="background-color: #304FFE24;">Sales</span>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between align-center mb-2 card-body">-->
<!--              <span class="title font-weight-black">0 K</span>-->
<!--              <div class="d-flex align-center flex-wrap pa-2 rounded-lg bg-correct-color ">-->
<!--                <span class="body-1 font-weight-medium correct-color">+ 0</span>-->
<!--                <span>-->
<!--                    <svg id="chart_trending_up" data-name="chart / trending_up" xmlns="http://www.w3.org/2000/svg"-->
<!--                         xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">-->
<!--                      <defs>-->
<!--                        <clipPath id="clip-path">-->
<!--                          <rect id="chart_trending_up_Background_Mask_"-->
<!--                                data-name="chart / trending_up (Background/Mask)" width="24" height="24" fill="none"/>-->
<!--                        </clipPath>-->
<!--                      </defs>-->
<!--                      <g id="chart_trending_up-2" data-name="chart / trending_up">-->
<!--                        <rect id="chart_trending_up_Background_Mask_2" data-name="chart / trending_up (Background/Mask)"-->
<!--                              width="24" height="24" fill="none"/>-->
<!--                        <g id="chart_trending_up-3" data-name="chart / trending_up" clip-path="url(#clip-path)">-->
<!--                          <path id="coolicon"-->
<!--                                d="M11.414,8.707H12a1,1,0,0,0,.707-.293l4.707-4.707L19.707,6V0h-6L16,2.293,11.707,6.586l-3-3A1,1,0,0,0,8,093H7.414a1,1,0,0,0-.707.293L0,10.293l1.414,1.414L7.707,5.414l3,3A1,1,0,0,0,11.414,8.707Z"-->
<!--                                transform="translate(2.293 5)" fill="#98cb00"/>-->
<!--                        </g>-->
<!--                      </g>-->
<!--                    </svg>-->
<!--                  </span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="mb-3 card-footer">-->
<!--              <span class="body-2">Last year 0 K</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--      <v-col cols="6" lg="3" class="py-0 mb-8">-->
<!--        <v-card class="fill-height performance-card-item rounded-lg">-->
<!--          <div class="d-flex flex-column pa-2 purchases">-->
<!--            <div class="card-header mb-1">-->
<!--              <span class="d-inline-block title font-weight-black primary-color py-3 px-6 rounded-lg">Purchases</span>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between align-center mb-2 card-body">-->
<!--              <span class="title font-weight-black">0 K</span>-->
<!--              <div class="d-flex align-center flex-wrap pa-2 rounded-lg bg-correct-color ">-->
<!--                <span class="body-1 font-weight-medium correct-color">+ 0</span>-->
<!--                <span>-->
<!--                        <svg id="chart_trending_up" data-name="chart / trending_up" xmlns="http://www.w3.org/2000/svg"-->
<!--                             xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">-->
<!--                          <defs>-->
<!--                            <clipPath id="clip-path">-->
<!--                              <rect id="chart_trending_up_Background_Mask_"-->
<!--                                    data-name="chart / trending_up (Background/Mask)" width="24" height="24"-->
<!--                                    fill="none"/>-->
<!--                            </clipPath>-->
<!--                          </defs>-->
<!--                          <g id="chart_trending_up-2" data-name="chart / trending_up">-->
<!--                            <rect id="chart_trending_up_Background_Mask_2"-->
<!--                                  data-name="chart / trending_up (Background/Mask)" width="24" height="24" fill="none"/>-->
<!--                            <g id="chart_trending_up-3" data-name="chart / trending_up" clip-path="url(#clip-path)">-->
<!--                              <path id="coolicon"-->
<!--                                    d="M11.414,8.707H12a1,1,0,0,0,.707-.293l4.707-4.707L19.707,6V0h-6L16,2.293,11.707,6.586l-3-3A1,1,0,0,0,8,093H7.414a1,1,0,0,0-.707.293L0,10.293l1.414,1.414L7.707,5.414l3,3A1,1,0,0,0,11.414,8.707Z"-->
<!--                                    transform="translate(2.293 5)" fill="#98cb00"/>-->
<!--                            </g>-->
<!--                          </g>-->
<!--                        </svg>-->
<!--                      </span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="mb-3 card-footer">-->
<!--              <span class="body-2">Last year 0 K</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--      <v-col cols="6" lg="3" class="py-0 mb-8">-->
<!--        <v-card class="fill-height performance-card-item rounded-lg">-->
<!--          <div class="d-flex flex-column pa-2 satisfaction">-->
<!--            <div class="card-header mb-1">-->
<!--              <span class="d-inline-block title font-weight-black primary-color py-3 px-6 rounded-lg">Overall satisfaction</span>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between align-center mb-2 card-body">-->
<!--              <span class="title font-weight-black">0 K</span>-->
<!--              <div class="d-flex align-center flex-wrap pa-2 rounded-lg bg-correct-color ">-->
<!--                <span class="body-1 font-weight-medium correct-color">+ 0</span>-->
<!--                <span>-->
<!--                        <svg id="chart_trending_up" data-name="chart / trending_up" xmlns="http://www.w3.org/2000/svg"-->
<!--                             xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">-->
<!--                          <defs>-->
<!--                            <clipPath id="clip-path">-->
<!--                              <rect id="chart_trending_up_Background_Mask_"-->
<!--                                    data-name="chart / trending_up (Background/Mask)" width="24" height="24"-->
<!--                                    fill="none"/>-->
<!--                            </clipPath>-->
<!--                          </defs>-->
<!--                          <g id="chart_trending_up-2" data-name="chart / trending_up">-->
<!--                            <rect id="chart_trending_up_Background_Mask_2"-->
<!--                                  data-name="chart / trending_up (Background/Mask)" width="24" height="24" fill="none"/>-->
<!--                            <g id="chart_trending_up-3" data-name="chart / trending_up" clip-path="url(#clip-path)">-->
<!--                              <path id="coolicon"-->
<!--                                    d="M11.414,8.707H12a1,1,0,0,0,.707-.293l4.707-4.707L19.707,6V0h-6L16,2.293,11.707,6.586l-3-3A1,1,0,0,0,8,093H7.414a1,1,0,0,0-.707.293L0,10.293l1.414,1.414L7.707,5.414l3,3A1,1,0,0,0,11.414,8.707Z"-->
<!--                                    transform="translate(2.293 5)" fill="#98cb00"/>-->
<!--                            </g>-->
<!--                          </g>-->
<!--                        </svg>-->
<!--                      </span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="mb-3 card-footer">-->
<!--              <span class="body-2">Last year 0 K</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--      <v-col cols="6" lg="3" class="py-0 mb-8">-->
<!--        <v-card class="fill-height performance-card-item rounded-lg">-->
<!--          <div class="d-flex flex-column pa-2 more-sales">-->
<!--            <div class="card-header mb-1">-->
<!--              <span class="d-inline-block title font-weight-black primary-color py-3 px-6 rounded-lg">Sales</span>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between align-center mb-2 card-body">-->
<!--              <span class="title font-weight-black">0 K</span>-->
<!--              <div class="d-flex align-center flex-wrap pa-2 rounded-lg bg-correct-color ">-->
<!--                <span class="body-1 font-weight-medium correct-color">+ 0</span>-->
<!--                <span>-->
<!--                        <svg id="chart_trending_up" data-name="chart / trending_up" xmlns="http://www.w3.org/2000/svg"-->
<!--                             xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">-->
<!--                          <defs>-->
<!--                            <clipPath id="clip-path">-->
<!--                              <rect id="chart_trending_up_Background_Mask_"-->
<!--                                    data-name="chart / trending_up (Background/Mask)" width="24" height="24"-->
<!--                                    fill="none"/>-->
<!--                            </clipPath>-->
<!--                          </defs>-->
<!--                          <g id="chart_trending_up-2" data-name="chart / trending_up">-->
<!--                            <rect id="chart_trending_up_Background_Mask_2"-->
<!--                                  data-name="chart / trending_up (Background/Mask)" width="24" height="24" fill="none"/>-->
<!--                            <g id="chart_trending_up-3" data-name="chart / trending_up" clip-path="url(#clip-path)">-->
<!--                              <path id="coolicon"-->
<!--                                    d="M11.414,8.707H12a1,1,0,0,0,.707-.293l4.707-4.707L19.707,6V0h-6L16,2.293,11.707,6.586l-3-3A1,1,0,0,0,8,093H7.414a1,1,0,0,0-.707.293L0,10.293l1.414,1.414L7.707,5.414l3,3A1,1,0,0,0,11.414,8.707Z"-->
<!--                                    transform="translate(2.293 5)" fill="#98cb00"/>-->
<!--                            </g>-->
<!--                          </g>-->
<!--                        </svg>-->
<!--                      </span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="mb-3 card-footer">-->
<!--              <span class="body-2">Last year 0 K</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </div>
</template>

<script>
import ProductSlider   from "../../../components/product/ProductSlider";
import companyInfo from "../../../components/company-details/company-info";

export default {
  props: ['companyInfo'],
  components:{
    ProductSlider
  },
  data() {
    return {
      company: [
        {src: 'company-0.png'},
        {src: 'company-1.png'},
        {src: 'company-2.png'},
      ],
      companyVideo: [
        {src: 'road.mp4'}
      ],
      videoPosters: [
        {poster: 'poster.png'},
        {poster: 'poster.png'}
      ],
      company_products:[],
    }
  },
  mounted() {
    this.getCompanyProducts();
  },
  methods: {
    getFile(item, type) {
      if (type == 'image')
        return "https://dl.macrob2b.com/companies/" + this.companyInfo._id + "/images/" + item;
      else if (type == 'video')
        return "https://dl.macrob2b.com/companies/" + this.companyInfo._id + "/video/" + item;
    },
    getCompanyProducts() {
      this.new_product_loading = true;
      this.$axios.$post('/api/get_company_products',
        {company_id:this.companyInfo._id})
        .then(response => {
          this.company_products = response;
        }).catch(err => {
        console.log(err);
      }).finally(msg => {
        this.new_product_loading = false;
      })
    }
  }
}
</script>
