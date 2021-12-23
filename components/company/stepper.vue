<template>
  <div class="stepper">
    <DesktopStepper v-if="!mobileSize"></DesktopStepper>
    <MobileStepper v-if="mobileSize"></MobileStepper>
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
        mobileSize: false
      }
    },
    /* eslint-disable */
    mounted: function () {
      this.$nextTick(function () {
        this.onResize();
      });
      window.addEventListener('resize', this.onResize)
    },
    methods: {
      onResize() {
        if (window.innerWidth <= 960) {
          this.mobileSize = true;
        } else if (window.innerWidth > 960) {
          this.mobileSize = false;
        }
      }
    },
  }
</script>
