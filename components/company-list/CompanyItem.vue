<template>
  <div class="company-item-container">

    <v-row class="mt-12 mb-12"  v-if="loadingStatus">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          :size="50"
          :width="5"
          color="orange"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col  cols="12" v-for="item in companyList" class="py-10 company-item" v-if="!$vuetify.breakpoint.xs">
          <v-row>
            <v-col cols="9" class="d-flex justify-start align-center ">
<!--              <v-col cols="1" class="d-flex pa-0">-->
<!--                <div class="years">-->
<!--                  2-->
<!--                  <span>YRS</span>-->
<!--                </div>-->
<!--              </v-col>-->
              <v-col cols="11" class="pa-0 text-h6 font-weight-bold primary--text company-name">
                <nuxt-link :to="'/company-details/'+item._id">{{ item.company_name }}</nuxt-link>
              </v-col>
            </v-col>
            <v-col cols="3" class="pa-0">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-tab to="/">
                    <v-icon small>mdi-star</v-icon>
                    <v-col class="text-caption grey--text">Favourite</v-col>
                  </v-tab>
                </v-col>
                <v-col cols="6">
                  <v-tab to="/">
                    <v-icon small>mdi-plus</v-icon>
                    <v-col class="text-caption grey--text">Compare</v-col>
                  </v-tab>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
<!--          <v-row>-->
<!--            <v-tab>-->
<!--              <v-img src="/verified.svg" height="10px" contain></v-img>-->
<!--            </v-tab>-->
<!--            <v-tab to="/" class="text-caption blue&#45;&#45;text text&#45;&#45;lighten-2 text-capitalize">-->
<!--              <a href="">Contact Details</a>-->
<!--            </v-tab>-->
<!--            <v-divider vertical class=""/>-->
<!--            <v-tab to="/" class="text-caption blue&#45;&#45;text text&#45;&#45;lighten-2 text-capitalize">-->
<!--              <a href="">Video</a>-->
<!--            </v-tab>-->
<!--          </v-row>-->
          <v-row>

          </v-row>
          <v-row class="d-flex">
            <v-col cols="auto"  class="ability-item">
              <v-icon small>mdi-check-decagram-outline</v-icon>
              {{item.employees_total}} Employees
            </v-col>
            <v-col cols="auto"  class="ability-item">
              <v-icon small>mdi-check-decagram-outline</v-icon>
              Established in {{item.year_established}}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-row>
                <v-col v-for="(img,index) in item.images">
                  <div v-if="index<3">
                    <v-img
                      max-height="140"
                      max-width="140"
                      aspect-ratio="1" :src="getFile(item._id,img,'image')" style="border:1px solid #eee"/>
<!--                    <div>-->
<!--                      some texts-->
<!--                    </div>-->
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="7">
              <v-list class="transparent">
                <v-list-item  style="min-height: unset">
                  <v-list-item-content class="py-0">
                    <v-row no-gutters>
                      <v-col cols="6" lg="3">
<!--                        <div class="text-caption grey&#45;&#45;text ">{{info.label}}</div>-->
                      </v-col>
                      <v-col cols="6" lg="9">
                          <v-icon small color="deep-orange" >
                            mdi-diamond
                          </v-icon>
                          <v-icon small color="deep-orange" >
                            mdi-diamond
                          </v-icon>
                          <v-icon small color="deep-orange" >
                            mdi-diamond
                          </v-icon>
                        <div class="text-caption">{{item.description}}</div>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-col class="py-0 mt-2">

                No Transactions yet
              </v-col>
              <v-col class="text-caption py-0 mt-0">
                0 $
              </v-col>
              <v-row no-gutters class="mt-5">
                <v-tab>
                  <v-btn
                    :to="'/company-details/'+item._id"
                    color="deep-orange" elevation="0" small class="white--text text-capitalize text-caption">
                    <v-icon small class="mr-3">mdi-message</v-icon>
                    contact supplier
                  </v-btn>
                </v-tab>
                <nuxt-link class="text-caption primary--text text-capitalize" :to="'/company-details/'+item._id">
                  leave messages
                </nuxt-link>
              </v-row>
            </v-col>
          </v-row>
      </v-col>

      <!--    Mobile-->
      <v-col cols="12" v-for="item in companyList" class="py-5 company-item" v-if="$vuetify.breakpoint.xs">
        <v-row>
          <v-col cols="4" class="pa-0">
            <v-img aspect-ratio="1" src="/p1.jpeg" style="border:1px solid #eee"/>
          </v-col>
          <v-col cols="8" class="py-0 px-3">
            <v-col class="pa-0 text-caption font-weight-bold grey--text company-name">
              <nuxt-link :to="'/company-details/'+item._id">{{item.company_name}}</nuxt-link>
            </v-col>
            <v-col class="text-body-2 font-weight-bold pa-0 mt-0">
              US 570,000
            </v-col>
            <v-row class="mt-0 d-flex align-center">
              <v-col cols="2" class="pa-0 mt-0">
                <v-img  src="/ico.png"></v-img>
              </v-col>
              <v-col cols="auto" class="px-0">
                <div class="years d-flex align-center text-caption">
                  <v-img src="/ico-years.png" max-width="25px" contain></v-img>
                  2
                  <span class="text-caption">YRS</span>
                </div>
              </v-col>
              <v-col cols="4" class="d-flex align-center">
                <v-img src="/cn.png" max-width="20px" contain></v-img>
                <div class=" pl-1 grey--text text--darken-1 text-caption">CN</div>
              </v-col>
            </v-row>
            <v-col class="px-0">
              <v-btn outlined elevation="0" small class="grey--text text--darken-2 text-capitalize text-caption">
                <v-icon small class="mr-3">mdi-message</v-icon>
                contact supplier
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-col>



    </v-row>

  </div>
</template>

<script>
  export default {
    name: "companyItem",
    props:{
      loadingStatus:false,
      companyList: [],
    },
    data() {
      return {
        infos: [
          {
            label: "Supplier Index:",
            value: 3
          },
          {
            label: "Main Products:",
            value: "pope it fidget toy,christmas decoration,halloween decorations,party masks"
          },
          {
            label: "Country/Region",
            value: "China"
          },
          {
            label: "Total Revenue:",
            value: "US$50 Million - US$100 Million"
          },
          {
            label: "Top 3 Markets",
            value: "Eastern Europe 40%,North America 40%,North America 40%"
          }
        ],
      }
    },
    methods:{
      getFile(item_id,file_name, type) {
        if (type == 'image')
          return "https://dl.macrob2b.com/companies/" + item_id + "/images/" + file_name;
        else if (type == 'video')
          return "https://dl.macrob2b.com/companies/" + item_id + "/video/" + file_name;
      }
    }

  }
</script>
<style scoped>
  .company-item {
    border-bottom: 1px solid #ddd;
  }

  .years {
    background-color: #f5f5f5;
    padding: 2px 15px;
    border-radius: 15px;
    font-size: 14px !important;
    font-weight: bold;
    text-align: center;
  }

  .years span {
    font-size: 10px;
    transform: translateY(-3px);
    display: inline-block;
  }

  .ability-item {
    border: 1px solid #eee !important;
    padding: 3px 5px;
    border-radius: 5px;
    margin: 10px 5px;
    font-size: 12px;
    color: #00394D !important;
  }

  .ability-item:hover {
    background-color: #eee;
    cursor: pointer;
  }

  a:hover {
    color: #ff7519 !important;
    text-decoration: underline;
  }

  @media only screen and (max-width: 768px){
    .years{
      padding: 2px 5px;
      font-size:12px !important;
    }
    .years span{
      font-size:10px !important;
    }
  }
</style>
