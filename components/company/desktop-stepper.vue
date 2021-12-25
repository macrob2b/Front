<template>
  <v-stepper v-model="e1" alt-labels>
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Basic info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Trade info
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 3"
        step="3"
      >
        Factories & branches
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        step="4"
      >
        Certification
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
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

      <v-stepper-content step="2">
        <TradeInfo></TradeInfo>
        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <NuxtLink to="/company-profile/basic-info">
          <v-btn
            outlined
            @click="e1 = 1"
          >
            Cancel
          </v-btn>
        </NuxtLink>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import BasicInfo from "~/pages/company-profile/basic-info"
import TradeInfo from "~/pages/company-profile/trade-info"
  export default {
    components: {
      BasicInfo,
      TradeInfo
    },
    data() {
      return {
        e1: 1,
      }
    }
  }
</script>
