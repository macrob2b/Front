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
        <BasicInfo @updateCompanyInfoData="updateCompanyInfo" :serverComInfo="serverComInfo"></BasicInfo>

      </v-stepper-content>

      <v-stepper-content step="2">
<!--        <TradeInfo @updateTradeInfoData="updateTradeInfo" :serverComInfo="serverComInfo"></TradeInfo>-->
        <v-btn
          class="submit"
          color="primary"
          @click="submitTradeInfo"
          :disabled="disabled.TradeInfo"

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
  props: ['step1'],
  data() {
    return {
      e1: 1,
      serverComInfo: null,
      companyInfo: {},
      tradeInfo: {},
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
    submitTradeInfo () {
      this.disabled.TradeInfo = true;
      this.$axios.post('/api/update_company_trade_info', this.tradeInfo).then(response => {
        this.disabled.TradeInfo = false;
        if(typeof response.data === 'object') {
          for(let i in response.data) {
            let error = response.data[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.e1 = 3
        }
       }).catch(({response}) => {
        this.disabled.TradeInfo = false;
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
