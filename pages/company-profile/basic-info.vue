<template>
  <div class="basic-info">
    <UserType @updateData="updateRole"></UserType>
    <CompanyInfo @updateData="updateCompanyinfo"></CompanyInfo>
    <ContactInfo @updateData="updateContactInfo"></ContactInfo>
    <Media></Media>
  </div>
</template>

<script>
import UserType from "~/components/company/user-type"
import CompanyInfo from "~/components/company/company-info"
import ContactInfo from "~/components/company/contact-info"
import Media from "~/components/company/media"

export default {
  data() {
    return {
      companyInfo: {
        userType: '',
        company_name: '',
        business_type: '',
        location: '',
        street_address: '',
        phone: '',
        employees_total: ''
      }
    }
  },
  components: {
    UserType,
    CompanyInfo,
    ContactInfo,
    Media
  },
  async mounted() {
    await this.$axios.post('/api/update_company_general_info',
      {}).then(response => {
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
    updateRole(usertype) {
      let result = [];
      for (let i in usertype) {
        if (usertype[i] === true) {
          result.push(i);
        }
      }
      this.companyInfo.userType = result
      alert('result:' + result)
    },
    updateCompanyinfo(companyInfo) {
      this.companyInfo.company_name = companyInfo.company_name;
      this.companyInfo.company_name = companyInfo.business_type;
      this.companyInfo.company_name = companyInfo.location;
      this.companyInfo.company_name = companyInfo.street_address;
      alert('company_name:' + this.companyInfo.company_name )
    },
    updateContactInfo(contactInfo) {
      this.companyInfo.phone = contactInfo.phone;
      alert('phone:' + this.companyInfo.phone )
    }
  },

}
</script>
