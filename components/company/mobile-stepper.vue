<template>
  <v-stepper
    v-model="e1"
    vertical
  >
    <v-stepper-step
      :complete="e1 > 1"
      step="1"
      editable
    >
      Basic info
    </v-stepper-step>

    <v-stepper-content step="1">
      <BasicInfo  :companyLoadedInfo="companyInfo" ></BasicInfo>
    </v-stepper-content>

    <v-stepper-step
      :complete="e1 > 2"
      step="2"
      editable
    >
      Trade info
    </v-stepper-step>

    <v-stepper-content step="2">
      <TradeInfo  :companyLoadedInfo="companyInfo"></TradeInfo>
    </v-stepper-content>

    <v-stepper-step
      :complete="e1 > 3"
      step="3"
      editable
    >
      Factories & Branches
    </v-stepper-step>

    <v-stepper-content step="3">
      <FactoriesBranches></FactoriesBranches>
    </v-stepper-content>

    <v-stepper-step editable step="4">
      Certification & Trademarks
    </v-stepper-step>
    <v-stepper-content step="4">
      <Certifications></Certifications>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import BasicInfo from "~/pages/user/company/company-profile/basic-info"
import TradeInfo from "~/pages/user/company/company-profile/trade-info"
import FactoriesBranches from "~/pages/user/company/company-profile/factories-branches"
import Certifications from "~/pages/user/company/company-profile/certifications"
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
    }
  },
  watch: {
    step1() {
      this.e1 = this.step1;
    },
    e1(val) {
      this.$emit('step', val);
    }
  }
}
</script>
