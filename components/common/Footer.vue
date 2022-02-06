<template>
  <v-container fluid>
    <v-row class="d-none d-sm-flex">
      <v-col cols="12">
        <ContainerCard>
          <v-row>
            <v-col cols="3">
              <div class="py-10">
                <nuxt-link
                  tag="img"
                  :src="require('../../assets/img/black-logo.png')" to="/" class="pointer mb-10" />

                <div >
                  <h3  class="mb-2" id="h3">{{brand}}</h3>
                  <div class="my-2" id="div1" >
                    <div class="pt-2 pb-3">
                      <v-progress-linear
                        value="25"
                        color="primary"
                        height="1.5px"
                        class=""
                      ></v-progress-linear>
                    </div>
                    <p  class="text-justify">
                      We have the best services
                    </p>
                  </div>
                  <v-btn v-if="!this.$auth.loggedIn" to="/login" color="primary" width="55%">
                    <span  id="span1"> SIGNIN </span>
                  </v-btn>
                  <v-btn v-else to="/user-dashboard" color="primary" width="55%">
                    <span  id="span1"> Hi, {{$auth.user.first_name}} </span>
                  </v-btn>
                </div>
              </div>
            </v-col>
            <v-col cols="9">
              <div class="pa-5">
                <v-row>
                  <v-col v-for="item in footerLinks">
                    <div class="pa-2">
                      <h3 class="py-2">{{item.title}}</h3>
                      <v-progress-linear
                        value="25"
                        color="primary"
                        height="1.5px"
                        class=""
                      ></v-progress-linear>
                      <div>
                        <ul class="py-1">
                          <li
                            v-for="link in item.links"
                            class="py-2">
                            <nuxt-link :to="link.link">{{link.label}}</nuxt-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="mt-10 d-flex justify-space-between mb-4">
                <div class="d-flex justify-start">
                  <v-btn href="https://facebook.com/macrob2b"
                         target="_blank"
                         color="primary" min-width="0" width="40" class="mx-2">
                    <v-icon color="white"> mdi-facebook </v-icon>
                  </v-btn>
                  <v-btn
                    href="https://www.instagram.com/macrob2b"
                    target="_blank"
                    color="primary" min-width="0" width="40" class="mx-2">
                    <v-icon color="white"> mdi-instagram </v-icon>
                  </v-btn>
                  <v-btn
                    href="https://www.linkedin.com/company/macrob2b"
                    target="_blank"
                    color="primary" min-width="0" width="40" class="mx-2">
                    <v-icon color="white"> mdi-linkedin </v-icon>
                  </v-btn>
                  <v-btn
                    href="https://t.me/macrob2b"
                    target="_blank"
                    color="primary" min-width="0" width="40" class="mx-2">
                    <v-icon class="mdi-rotate-315"  color="white" > mdi-send </v-icon>
                  </v-btn>
                </div>
                <div  id="div2">
                  Copyright (c)1997-2025. All Rights Reserved
                </div>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider><v-divider></v-divider>
          <div class="end-footer pa-6 mt-7">
            <div class="d-flex justify-start">
              <span class="px-5"> Deutsch </span>
              <v-divider vertical />
              <span class="px-5"> Deutsch </span>
              <v-divider vertical />
              <span class="px-5"> Deutsch </span>
              <v-divider vertical />
              <span class="px-5"> Deutsch </span>
              <v-divider vertical />
              <span class="px-5"> Deutsch </span>
            </div>
          </div>
        </ContainerCard>
      </v-col>
    </v-row>



    <div  class="d-flex d-sm-none footer-mobile justify-start">
      <div class="pa-6">
        <div>
          <nuxt-link
            tag="img"
            :src="require('../../assets/img/black-logo.png')" width="50%" class="pointer" to="/" />
        </div>
        <div class="mt-2 mb-2"  id="div3">
          {{ brand }}
        </div>
        <v-divider />
        <v-divider />

        <div class="mt-2">
          <p  id="p2">
            {{ description }}
          </p>
        </div>
        <div>
          <v-btn to="/login" min-width="0" color="primary" width="50%" height="40px">
            <span  id="span2"> SIGN IN </span>
          </v-btn>
        </div>
        <div class="d-flex mt-5"  id="div4">
          <div

            id="div5"
            v-for="(item, idx2) in footerLinks"
            :key="idx2"
          >
            <h4>{{ item.title }}</h4>
            <div  id="div6">
              <v-progress-linear value="40" color="primary" height="1.5px" />
            </div>

            <div>
              <ul class="py-1">
                <li class="py-2" v-for="(link, idx) in item.links" :key="idx">
                  <nuxt-link :to="link.link">{{ link.label }}</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pa-3 d-flex justify-center">
          <v-btn
            href="https://facebook.com/macrob2b"
            target="_blank"
            color="primary"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-facebook </v-icon>
          </v-btn>
          <v-btn
            href="https://www.instagram.com/macrob2b"
            target="_blank"
            color="primary"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-instagram </v-icon>
          </v-btn>
          <v-btn
            href="https://www.linkedin.com/company/macrob2b"
            target="_blank"
            color="primary"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-linkedin </v-icon>
          </v-btn>
          <v-btn
            href="https://t.me/macrob2b"
            target="_blank"
            color="primary"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> telegram</v-icon>
          </v-btn>
        </div>
        <div  id="div7" class="mt-2">
          Copyright (c)1997-2021. All Rights Reserved
        </div>
      </div>

      <div class="foot"  id="div8">
        <div class="pa-5 d-flex justify-center">
          <div
            class="d-flex justify-center mx-1"
            v-for="(lang, idx) in languages"
            :key="idx"
          >
            <span class="mx-1">
              {{ lang }}
            </span>
            <v-divider vertical />
          </div>
        </div>
      </div>
    </div>


  </v-container>
</template>

<script>
import ContainerCard from "../home/ContainerCard.vue";
export default {
  data() {
    return {
      brand: "Macrob2b.com",
      description:
        "Our company has maintained low competitive prices, good quality as well as timely deliveries. We are a gold supplier and assessed.",
      languages: ["Deutsch", "Deutsch", "Deutsch", "Deutsch", "Deutsch"],
      footerLinks: [
        {
          title: 'About us',
          links: [
               {label:'About Macrob2b.com',link:'/about_website'},
               {label:'About Group',link:'/about_group'},
            ],
        },{
          title: 'Source',
          links: [
               {label:'Resources',link:'/resources'},
               {label:'All Categories',link:'/category-list'},
               {label:'Request for Quotation',link:'/request_quotation'},
               {label:'Buyer Partners',link:'/buyer_partners'},
            ],
        },{
          title: 'Selling ',
          links: [
               {label:'Post products',link:'/user/product/add'},
               {label:'Manage products',link:'/user/product'},
            ],
        },{
          title: 'Services',
          links: [
               {label:'Trade Assurance',link:'/trade_assurance'},
               {label:'Business Identity',link:'/business_identity'},
            ],
        },
      ],
    };
  },
  components: { ContainerCard },
};
</script>

<style scoped>
.foot {
  background-color: var(--v-primary-base);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.footer-mobile {
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
li {
  font-size: medium;
}
span {
  color: white;
}
hr.v-divider--vertical {
  border-color: white !important;
}
.end-footer {
  background-color: var(--v-primary-base);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
#div1 {
  width: 70%;
}
#div2 {
  color: #999;
  font-size: 13px;
}
#div3 {
  font-size: 15px;
  font-weight: 500;
}
#div4 {
  flex-wrap: wrap;
}
#div5 {
  width: 47%;
  margin-left: 5px;
}
#div6{
  width: 100%
}
#div7{
  font-size: 12px; text-align: center
}
#div8{
  font-size: 11px;
}
#h3 {
  color: var(--v-primary-base);
}
#p1 {
  font-weight: 350;
}
#p2 {
  font-size: smaller;
}
#span1 {
  color: white;
}
#span2 {
  font-size: 14px;
}
</style>
