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
      companyInfo: [],
      step: 1
    }
  },
  mounted() {
    this.loadCompanyInfo();
  },
  methods: {
    currentStep(currentStepNumber) {
      // alert(currentStepNumber)
    },
    async loadCompanyInfo() {
      await this.$axios.$post('/api/user_company_info', {
        id: this.$auth.user.company._id
      }).then(response => {
        this.companyInfo = response;

      }).catch(err => {
        console.log(err.response.status);
        if (err.response.status === 401) {
          this.$toast.error('The information entered is incorrect');
          this.$auth.logout();
          if (!this.$auth.loggedIn){
            this.$router.push(
              {
                path:'/login'
              });
          }
        } else if (err.response.status == 500 || err.response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
      });

    },

  }
}
</script>
