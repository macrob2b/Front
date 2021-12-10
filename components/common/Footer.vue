<template>
  <div>
    <div v-show="!$vuetify.breakpoint.xs">
      <ContainerCard>
        <v-row>
          <v-col cols="5">
            <div class="pa-10">
              <img src="Logo.png" class="mb-10" />

              <div class="pr-10 mr-10">
                <h3 style="color: #00394d" class="mb-2">Brand Name</h3>
                <div class="my-2" style="width: 70%">
                  <div class="pt-2 pb-3">
                    <v-progress-linear
                      value="25"
                      color="#00394D"
                      height="1.5px"
                      class=""
                    ></v-progress-linear>
                  </div>
                  <p style="font-weight: 350">
                    Our company has maintained low competitive prices, good
                    quality as well as timely deliveries. We are a gold supplier
                    and assessed.
                  </p>
                </div>
                <v-btn color="#00394D" width="55%">
                  <span style="color: white"> SIGNIN </span>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="pa-5">
              <v-row>
                <v-col v-for="n in 4" :key="n">
                  <div class="pa-2">
                    <h3 class="py-2">Contact Us</h3>
                    <v-progress-linear
                      value="25"
                      color="#00394D"
                      height="1.5px"
                      class=""
                    ></v-progress-linear>
                    <div>
                      <ul class="py-1">
                        <li class="py-2">Link name</li>
                        <li class="py-2">Link name</li>
                        <li class="py-2">Link name</li>
                        <li class="py-2">Link name</li>
                      </ul>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
            <div class="mt-10 d-flex justify-space-between">
              <div class="d-flex justify-start">
                <v-btn color="#00394D" min-width="0" width="40" class="mx-2">
                  <v-icon color="white"> mdi-facebook </v-icon>
                </v-btn>
                <v-btn color="#00394D" min-width="0" width="40" class="mx-2">
                  <v-icon color="white"> mdi-instagram </v-icon>
                </v-btn>
                <v-btn color="#00394D" min-width="0" width="40" class="mx-2">
                  <v-icon color="white"> mdi-linkedin </v-icon>
                </v-btn>
                <v-btn color="#00394D" min-width="0" width="40" class="mx-2">
                  <v-icon color="white"> mdi-pinterest </v-icon>
                </v-btn>
              </div>
              <div style="color: #999; font-size: 13px">
                Copyright (c)1997-2021. All Rights Reserved
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
    </div>
    <div v-show="$vuetify.breakpoint.xs" class="footer-mobile justify-start">
      <div class="pa-6">
        <div>
          <img srcset="Logo.png" width="50%" class="" />
        </div>
        <div class="mt-2 mb-2" style="font-size: 15px; font-weight: 500">
          {{ brand }}
        </div>
        <v-divider />
        <v-divider />

        <div class="mt-2">
          <p style="font-size: smaller">
            {{ description }}
          </p>
        </div>
        <div>
          <v-btn min-width="0" color="#00394d" width="50%" height="40px">
            <span style="font-size: 14px"> SIGN IN </span>
          </v-btn>
        </div>
        <div class="d-flex mt-5" style="flex-wrap: wrap">
          <div
            style="width: 47%; margin-left: 5px"
            v-for="item in footerLinks"
            :key="item"
          >
            <h4>{{ item.title }}</h4>
            <div style="width: 100%">
              <v-progress-linear value="40" color="#00394d" height="1.5px" />
            </div>

            <div>
              <ul class="py-1">
                <li class="py-2" v-for="link in item.links" :key="link">
                  {{ link }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pa-3 d-flex justify-center">
          <v-btn
            color="#00394D"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-facebook </v-icon>
          </v-btn>
          <v-btn
            color="#00394D"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-instagram </v-icon>
          </v-btn>
          <v-btn
            color="#00394D"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-linkedin </v-icon>
          </v-btn>
          <v-btn
            color="#00394D"
            min-width="0"
            width="20"
            height="30"
            class="mx-2"
          >
            <v-icon color="white" small> mdi-pinterest </v-icon>
          </v-btn>
        </div>
        <div style="font-size: 12px; text-align: center" class="mt-2">
          Copyright (c)1997-2021. All Rights Reserved
        </div>
      </div>

      <div class="foot" style="font-size:11px">
        <div class="pa-5 d-flex justify-center">
          <div class="d-flex justify-center mx-1" v-for="lang in languages" :key="lang">
            <span class="mx-1">
              {{lang}}
            </span>
            <v-divider vertical />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContainerCard from "../home/ContainerCard.vue";
export default {
  data() {
    return {
      brand: "Brand Name",
      description:
        "Our company has maintained low competitive prices, good quality as well as timely deliveries. We are a gold supplier and assessed.",
      languages: [
        "Deutsch",
        "Deutsch",
        "Deutsch",
        "Deutsch",
        "Deutsch",
      ],
      footerLinks: [
        {
          title: "Contact us",
          links: ["Link name", "Link name", "Link name", "Link name"],
        },
        {
          title: "Contact us",
          links: ["Link name", "Link name", "Link name", "Link name"],
        },
        {
          title: "Contact us",
          links: ["Link name", "Link name", "Link name", "Link name"],
        },
        {
          title: "Contact us",
          links: ["Link name", "Link name", "Link name", "Link name"],
        },
      ],
    };
  },
  components: { ContainerCard },
};
</script>

<style scoped>
.foot {
  background-color: #00394d;
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
  background-color: #00394d;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>