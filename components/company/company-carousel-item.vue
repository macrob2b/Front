<template>
  <div>
      <v-row>
        <v-col cols="4" class="pa-0">
          <nuxt-link :to="'/company/'+(company.username ? company.username : company._id)">
            <v-img
              v-if="company.images && company.images[0]" aspect-ratio="1" :src="getFile(company._id,company.images[0],'image')"
              style="border:1px solid #eee"/>
            <v-img
              v-else aspect-ratio="1" :src="require('assets/img/no-image.png')"/>
          </nuxt-link>
        </v-col>
        <v-col cols="8" class="py-0 px-3">
          <v-col class="pa-0 text-caption font-weight-bold grey--text company-name">
            <nuxt-link :to="'/company/'+(company.username ? company.username : company._id)">{{ company.company_name }}</nuxt-link>
          </v-col>
          <v-col class="text-body-2 font-weight-bold pa-0 mt-0">
            US 0
          </v-col>
          <v-row class="mt-0 d-flex align-center">
            <v-col cols="2" class="pa-0 mt-0">
              <v-img src="/ico.png"></v-img>
            </v-col>
            <v-col cols="auto" class="px-0">
              <div class="years d-flex align-center text-caption">
                <v-img src="/ico-years.png" max-width="25px" contain></v-img>
                1
                <span class="text-caption">YRS</span>
              </div>
            </v-col>
            <!--              <v-col cols="4" class="d-flex align-center">-->
            <!--                <v-img src="/cn.png" max-width="20px" contain></v-img>-->
            <!--                <div class=" pl-1 grey&#45;&#45;text text&#45;&#45;darken-1 text-caption">CN</div>-->
            <!--              </v-col>-->
          </v-row>
          <v-col class="px-0">
            <v-btn
              :to="'/company/'+(company.username ? company.username : company._id)"
              outlined elevation="0" small class="grey--text text--darken-2 text-capitalize text-caption">
              <v-icon small class="mr-3">mdi-message</v-icon>
              contact supplier
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "company-carousel-item"
}
</script>

<style scoped>

</style>
