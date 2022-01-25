<template>
  <v-stepper v-model="e1" alt-labels>
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
        <BasicInfo @updateCompanyInfoData="updateCompanyInfo"></BasicInfo>
        <v-btn
          class="submit"
          @click="submitCompanyInfo"

        >
          Submit
        </v-btn>

        <v-btn outlined>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <TradeInfo @updateTradeInfoData="updateTradeInfo"></TradeInfo>
        <v-btn
          class="submit"
          color="primary"
          @click="submitTradeInfo"

        >
          Continue
        </v-btn>

        <v-btn
          outlined
          @click="e1 = 1"
        >
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <FactoriesBranches></FactoriesBranches>
        <v-btn
          class="submit"
          color="primary"
          @click="e1 = 4"
        >
          Continue
        </v-btn>
        <v-btn
          outlined
          @click="e1 = 2"
        >
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <Certifications></Certifications>
        <v-btn
          class="submit"
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>
        <v-btn
          outlined
          @click="e1 = 3"
        >
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BasicInfo from "~/pages/company-profile/basic-info"
import TradeInfo from "~/pages/company-profile/trade-info"
import FactoriesBranches from "~/pages/company-profile/factories-branches"
import Certifications from '~/pages/company-profile/certifications'

export default {
  components: {
    BasicInfo,
    TradeInfo,
    FactoriesBranches,
    Certifications
  },
  /* eslint-disable */
  props: ['step1'],
  data() {
    return {
      e1: 1,
      companyInfo: {},
      tradeInfo: {},
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
  methods: {
    updateCompanyInfo(companyInfo) {
      this.companyInfo = companyInfo
      console.log("this.companyInfo desktop:"+JSON.stringify(this.companyInfo))
    },
    submitCompanyInfo() {
      this.e1 = 2
      console.log(this.companyInfo)
      this.$axios.post('/api/update_company_general_info', this.companyInfo).then(response => {
        console.log(response.data)
      }).catch(({response}) => {
        console.log('errr', response)
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
    },
    updateTradeInfo (tradeInfo) {
      this.tradeInfo = tradeInfo
    },
    submitTradeInfo () {
      this.e1 = 3
      this.requestTradeInfo()
    },
   async  requestTradeInfo () {
     await  this.$axios.post('/api/update_company_trade_info',this.tradeInfo).then(response => {
         // console.log("tradeInfo:" + JSON.stringify(response.data))

       }).catch(({response}) => {
         if (response.status == 401) {
           this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
         } else if (response.status == 400) {
           this.$toast.error(this.$t(`Bad Request`));
         } else if (response.status == 403) {
           this.$toast.error(this.$t(`Forbidden`));
         } else if (response.status == 404) {
           this.$toast.error(this.$t(`not found`));
         }
       });
     }
  }
}
</script>
