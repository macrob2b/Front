<template>
  <div class="stepper">
    <DesktopStepper class="d-none d-md-block" :step1="step" @step="currentStep"></DesktopStepper>
    <MobileStepper class="d-md-none" :step1="step" @step="currentStep"></MobileStepper>
  </div>
</template>

<script>
import DesktopStepper from "~/components/company/desktop-stepper"
import MobileStepper from "~/components/company/mobile-stepper"
export default {
  components: {
    DesktopStepper,
    MobileStepper
  },
  data() {
    return {
      step: 1
    }
  },
  methods: {
    currentStep (currentStepNumber) {
      // alert(currentStepNumber)
    }
  }
}
</script>
