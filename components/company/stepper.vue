<template>
  <div class="stepper">
    <DesktopStepper class="d-none d-md-block"></DesktopStepper>
    <MobileStepper class="d-md-none"></MobileStepper>
  </div>
</template>

<script>
  import DesktopStepper from "~/components/company/desktop-stepper"
  import MobileStepper from "~/components/company/mobile-stepper"
  export default {
    components: {
      DesktopStepper,
      MobileStepper
    }
  }
</script>
