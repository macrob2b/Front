<template>
  <div class="stepper">
    <DesktopStepper class="d-none d-md-block"
                    :companyInfo="companyInfo"
                    :step1="step" @step="currentStep"></DesktopStepper>
    <MobileStepper class="d-md-none mx-6"

                   :companyInfo="companyInfo"
                   :step1="step" @step="currentStep"></MobileStepper>
  </div>
</template>

<script>
import DesktopStepper from "~/components/company/desktop-stepper"
import MobileStepper from "~/components/company/mobile-stepper"
import companyInfo from "../company-details/company-info";
export default {
  components: {
    DesktopStepper,
    MobileStepper
  },
  data() {
    return {
      companyInfo:[],
      step: 1
    }
  },
  mounted() {
    this.loadCompanyInfo();
  },
  methods: {
    currentStep (currentStepNumber) {
      // alert(currentStepNumber)
    },
    async loadCompanyInfo() {
      await this.$axios.$post('/api/get_company_info',{
        id:this.$auth.user.company._id
      }).then(response => {
        this.companyInfo = response;

      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });

    },

  }
}
</script>
