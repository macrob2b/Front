<template>
  <div class="company-details">
    <v-row class="mt-12 mb-12"  v-if="loading">
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
      <v-col cols="12">
        <company-info :companyInfo="company_info"></company-info>
        <company-details-tabs :companyInfo="company_info"></company-details-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import companyInfo from '../../components/company-details/company-info'
import companyDetailsTabs from '../../components/company-details/company-details-tabs'

export default {
  auth:false,
  components: {
    companyInfo,
    companyDetailsTabs
  },
  data() {
    return {
      loading:false,
      company_info:[]
    }
  },
  mounted() {
    this.getCompanyInfo();
  },
  methods:{
    getCompanyInfo(){
      this.loading=true;
      this.$axios.$post('/api/get_company_info',
        {
          id:this.$route.params.id
        })
        .then(res=>
        {
          this.company_info=res;
          this.loading=false;
          console.log("is ok")
        })
        .catch(err=>{
          this.$toast.error(err);
        })
    }
  }

}
</script>
