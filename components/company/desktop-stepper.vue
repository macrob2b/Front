<template>
  <v-stepper v-model="e1" alt-labels>
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
        editable
      >
        Basic info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
        editable
      >
        Trade info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 3"
        step="3"
        editable
      >
        Factories & branches
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        step="4"
        editable
      >
        Certification
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <BasicInfo></BasicInfo>
          <v-btn
            class="submit"
            @click="e1 = 2"
          >
            Submit
          </v-btn>

        <v-btn outlined>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <TradeInfo></TradeInfo>
          <v-btn
            class="submit"
            color="primary"
            @click="e1 = 3"
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
