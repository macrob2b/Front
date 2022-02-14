<template>
  <v-stepper
    max-width="100vw"
    v-model="e1" alt-labels>
   <v-row>
     <v-col cols="12">
       <v-stepper-header>
         <v-stepper-step
           :complete="e1 > 1"
           editable
           step="1"
         >
           Basic info
         </v-stepper-step>

         <v-divider></v-divider>

         <v-stepper-step
           :complete="e1 > 2"
           editable
           step="2"
         >
           Trade info
         </v-stepper-step>

         <v-divider></v-divider>

         <v-stepper-step
           :complete="e1 > 3"
           editable
           step="3"
         >
           Factories & branches
         </v-stepper-step>

         <v-divider></v-divider>

         <v-stepper-step
           editable
           step="4"
         >
           Certification
         </v-stepper-step>
       </v-stepper-header>

       <v-stepper-items>
         <v-stepper-content step="1">
           <BasicInfo  :companyLoadedInfo="companyInfo" ></BasicInfo>
         </v-stepper-content>

         <v-stepper-content step="2">
           <TradeInfo  :companyLoadedInfo="companyInfo"></TradeInfo>
         </v-stepper-content>

         <v-stepper-content step="3">
           <FactoriesBranches></FactoriesBranches>
         </v-stepper-content>

         <v-stepper-content step="4">
           <Certifications></Certifications>
         </v-stepper-content>
       </v-stepper-items>
     </v-col>
   </v-row>
  </v-stepper>
</template>

<script>
import BasicInfo from "~/pages/user/company/company-profile/basic-info"
import TradeInfo from "~/pages/user/company/company-profile/trade-info"
import FactoriesBranches from "~/pages/user/company/company-profile/factories-branches"
import Certifications from '~/pages/user/company/company-profile/certifications'

export default {
  components: {
    BasicInfo,
    TradeInfo,
    FactoriesBranches,
    Certifications
  },
  /* eslint-disable */
  props: {
    step1:null,
    companyInfo:[]
  },
  data() {
    return {
      e1: 1,
      disabled: {
        BasicInfo: false,
        TradeInfo: false,
      }
    }
  },
  watch: {
    step1() {
      this.e1 = this.step1;
    },
    e1(val) {
      this.$emit('step', val);
    }
  },
  mounted() {

  },
  methods: {
    updateCompanyInfo(companyInfo) {
      this.companyInfo = companyInfo
      console.log("this.companyInfo desktop:"+JSON.stringify(this.companyInfo))
    },
    updateTradeInfo (tradeInfo) {
      this.tradeInfo = tradeInfo
    },

  }
}
</script>
