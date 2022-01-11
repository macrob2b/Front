<template>
  <div class="basic-info">
    <UserType @updateData="updateRole"></UserType>
    <CompanyInfo @updateData="updateCompanyinfo"></CompanyInfo>
    <ContactInfo></ContactInfo>
    <Media></Media>
  </div>
</template>

<script>
  import UserType from "~/components/company/user-type"
  import CompanyInfo from "~/components/company/company-info"
  import ContactInfo from "~/components/company/contact-info"
  import Media from "~/components/company/media"
  import config from "../../config";
  export default {
    components: {
      UserType,
      CompanyInfo,
      ContactInfo,
      Media
    },
    async mounted() {
      await this.$axios.post('/api/export_percentage_list',
        {
        }).then(response => {
        console.log(response)
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
    },
    methods: {
      updateRole(roleType) {
        alert('role:' + JSON.stringify(roleType))
      },
      updateCompanyinfo(companyInfo) {
        // let employees_total = companyInfo.companyname
        alert('companyInfo:' + JSON.stringify(companyInfo))
      }
    }
  }
  // <UserType @updateData="update"></UserType>
  // this.$emit("updateData", {}, 'dsds');
</script>
