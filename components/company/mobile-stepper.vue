<template>
  <v-stepper
    v-model="m1"
    vertical
  >
    <v-stepper-step
      :complete="m1 > 1"
      step="1"
    >
      Basic info
    </v-stepper-step>

    <v-stepper-content step="1">
      <BasicInfo></BasicInfo>
      <NuxtLink to="/company-profile/test">
        <v-btn
          class="submit"
          @click="m1 = 2"
        >
          Submit
        </v-btn>
      </NuxtLink>

      <v-btn outlined>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="m1 > 2"
      step="2"
    >
      Trade info
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="m1 = 3"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="m1 > 3"
      step="3"
    >
      Factories & branches
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="m1 = 4"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      Certification
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="m1 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
  import BasicInfo from "~/pages/company-profile/basic-info"
  export default {
    components: {
      BasicInfo
    },
    data() {
      return {
        m1: 1,
      }
    }
  }
</script>
