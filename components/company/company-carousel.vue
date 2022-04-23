<template>
  <div>
    <v-slide-group
      v-model="slideVal"
      class="pa-2"
      :continuous="true"
      center-active show-arrows="desktop"
    >
      <v-slide-item v-for="company in companies">
        <v-card height="114"
                width="300"
                class="my-4 mx-2 px-4 py-5"

        >
          <v-row>
            <v-col cols="4" class="pa-0">
              <nuxt-link :to="'/company/'+(company.username ? company.username : company._id)">
                <v-img
                  v-if="company.images && company.images[0]" aspect-ratio="1"
                  :src="getFile(company._id,company.images[0],'image')"
                  style="border:1px solid #eee"/>
                <v-img
                  v-else aspect-ratio="1" :src="require('assets/img/no-image.png')"/>
              </nuxt-link>
            </v-col>
            <v-col cols="8" class="py-0 px-3">
              <v-col class="pa-0 text-caption font-weight-bold grey--text company-name">
                <nuxt-link :to="'/company/'+(company.username ? company.username : company._id)">{{
                    company.company_name
                  }}
                </nuxt-link>
              </v-col>
              <v-row class="mt-0 d-flex align-center">
                <v-col cols="2" class="pa-0 mt-0">
                  <v-img src="/ico.png"></v-img>
                </v-col>
                <v-col cols="auto" class="px-0">
                  <div class="years d-flex align-center text-caption">
                    <v-img src="/ico-years.png" max-width="25px" contain ></v-img>
                  </div>
                </v-col>
                <!--              <v-col cols="4" class="d-flex align-center">-->
                <!--                <v-img src="/cn.png" max-width="20px" contain></v-img>-->
                <!--                <div class=" pl-1 grey&#45;&#45;text text&#45;&#45;darken-1 text-caption">CN</div>-->
                <!--              </v-col>-->

                <v-col cols="12">
                  <v-btn
                    :to="'/company/'+(company.username ? company.username : company._id)"
                    outlined elevation="0" small class="grey--text text--darken-2 text-capitalize text-caption">
                    <v-icon small class="mr-3">mdi-message</v-icon>
                    contact supplier
                  </v-btn>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <div class="d-flex justify-end px-5">
      <v-btn
        color="#165048"
        @click="clickLeft"
        medium
        width="40"
        min-width="0"
        v-show="!$vuetify.breakpoint.xs"
      >
        <v-icon color="white"> mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        color="#165048"
        @click="clickRight"
        class="mx-2"
        medium
        width="40"
        min-width="0"
        v-show="!$vuetify.breakpoint.xs"
      >
        <v-icon color="white"> mdi-chevron-right</v-icon>
      </v-btn>
    </div>


  </div>
</template>

<script>
export default {
  name: "company-carousel",
  data() {
    return {
      companies: [],
      slideVal: 0
    }
  },
  mounted() {
    this.getSuggestedCompanies();
  },
  methods: {
    getSuggestedCompanies() {
      this.$axios.$post('/api/get_suggested companies')
        .then(response => {
          this.companies = response;
        })
        .catch(err => {
          console.log(err);
        })
    },
    getFile(item_id, file_name, type) {
      if (type == 'image')
        return "https://dl.macrob2b.com/companies/" + item_id + "/images/" + file_name;
      else if (type == 'video')
        return "https://dl.macrob2b.com/companies/" + item_id + "/video/" + file_name;
    },
    clickLeft() {
      if (this.slideVal === 0)
        this.slideVal = 9
      else
        this.slideVal--;

    },
    clickRight() {
      if (this.slideVal === 9)
        this.slideVal = 0
      else
        this.slideVal++;
    }
  }
}
</script>

<style scoped>

</style>
