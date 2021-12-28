<template>
  <v-stepper
    v-model="e1"
    vertical
  >
    <v-stepper-step
      :complete="e1 > 1"
      step="1"
    >
      Basic info
    </v-stepper-step>

    <v-stepper-content step="1">
      <BasicInfo></BasicInfo>
      <NuxtLink to="/company-profile/trade-info">
        <v-btn
          class="submit"
          @click="e1 = 2"
        >
          Submit
        </v-btn>
      </NuxtLink>

      <v-btn outlined>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e1 > 2"
      step="2"
    >
      Trade info
    </v-stepper-step>

    <v-stepper-content step="2">
      <TradeInfo></TradeInfo>
      <NuxtLink to="/company-profile/factories-branches">
        <v-btn
          class="submit"
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>
      </NuxtLink>
      <NuxtLink to="/company-profile/basic-info">
        <v-btn
          outlined
          @click="e1 = 1"
        >
          Cancel
        </v-btn>
      </NuxtLink>
    </v-stepper-content>

    <v-stepper-step
      :complete="e1 > 3"
      step="3"
    >
      Factories & branches
    </v-stepper-step>

    <v-stepper-content step="3">
      <FactoriesBranches></FactoriesBranches>
      <NuxtLink to="/company-profile/certifications">
        <v-btn
          class="submit"
          color="primary"
          @click="e1 = 4"
        >
          Continue
        </v-btn>
      </NuxtLink>
      <NuxtLink to="/company-profile/trade-info">
        <v-btn
          outlined
          @click="e1 = 2"
        >
          Cancel
        </v-btn>
      </NuxtLink>
    </v-stepper-content>

    <v-stepper-step step="4">
      Certification
    </v-stepper-step>
    <v-stepper-content step="4">
      <Certifications></Certifications>
      <NuxtLink to="/company-profile/basic-info">
        <v-btn
          class="submit"
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>
      </NuxtLink>
      <NuxtLink to="/company-profile/trade-info">
        <v-btn
          outlined
          @click="e1 = 3"
        >
          Cancel
        </v-btn>
      </NuxtLink>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import BasicInfo from "~/pages/company-profile/basic-info"
import TradeInfo from "~/pages/company-profile/trade-info"
import FactoriesBranches from "~/pages/company-profile/factories-branches"
import Certifications from "~/pages/company-profile/certifications"
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
    step1(val) {
      this.e1 = this.step1;
    },
    e1(val) {
      this.$emit('step', val);
    }
  }
}
</script>
