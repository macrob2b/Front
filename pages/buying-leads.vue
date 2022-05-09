<template>
  <div>
    <v-row class="mt-12 mb-12" v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          :size="40"
          :width="4"
          color="orange"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else-if="buying_leads.length>0">
      <v-col cols="12" v-for="lead in buying_leads">
        <v-card class="pa-4" :to="`/company/${lead.company.username ? lead.company.username : lead.company_id}`">
          <v-row>
            <v-col cols="12" sm="4" md="2">
              <v-img :src="getImgFile(lead)" height="150" width="auto"/>
            </v-col>
            <v-col cols="12" sm="8" md="10">
              <h2>
                {{ lead.subject }}
              </h2>
              <p class="text-justify">
                {{ lead.details }}
              </p>


              <div>
                <!--                <gb-flag-->
                <!--                  :code="lead.company.country_code" class="d-inline"/>-->
                <p class="mt-5">
                  {{ lead.company.country }} |  {{ lead.company.company_name }}

                </p>
              </div>
            </v-col>
          </v-row>
        </v-card>

      </v-col>
    </v-row>
    <v-row v-else>
     <v-col cols="12">
       <p class="text-center font-weight-bold mt-8">No items found</p>
     </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'buying-leads',
  auth: false,
  head() {
    return {
      title: 'buying leads',
    };
  },
  data() {
    return {
      buying_leads: [],
      loading: false,
      page: 1,
    }
  },
  mounted() {
    this.getBuyingLeads();
  },
  methods: {
    getBuyingLeads() {
      this.loading = true;
      this.$axios.$post('/api/trading_leads',
        {
          type: 'buy',
          page: this.page
        })
        .then(res => {
          this.buying_leads = res.data;
          // this.total_page = Math.ceil(res.total / res.per_page);
          this.loading = false;
        })
        .catch(err => {
            this.loading = false;
            this.$toast.error(err);
          }
        )
    },
    getImgFile(item) {
      var img = require('assets/img/no-image.png');
      if (item.image)
        img = "https://dl.macrob2b.com/trading_leads/" + item._id + "/image/" + item.image;
      return img;

    }
  }
}
</script>
