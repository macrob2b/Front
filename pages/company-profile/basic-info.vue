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
        employees_total: '',
        year_established: '',
        phone: '',
        fax: '',
        email: '',
        postalcode: '',
        logo: '',
        images: [],
        brochure: [],
        video: '',

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
    },
    updateCompanyinfo(companyInfo) {
      this.companyInfo.company_name = companyInfo.company_name;
      this.companyInfo.business_type = companyInfo.business_type;
      this.companyInfo.street_address = companyInfo.address;
      this.companyInfo.country = companyInfo.country;
      this.companyInfo.state = companyInfo.state;
      this.companyInfo.city = companyInfo.city;
      this.companyInfo.description = companyInfo.description;
      this.companyInfo.employees_total = companyInfo.employeesTotal;
      this.companyInfo.annual_revenue = companyInfo.revenue;
      this.companyInfo.annual_revenue = companyInfo.annual_revenue;
      this.companyInfo.year_established = companyInfo.yearEstablished;
    },
    updateContactInfo(contactInfo) {
      this.companyInfo.phone = contactInfo.phone;
      this.companyInfo.fax = contactInfo.fax;
      this.companyInfo.email = contactInfo.email;
      this.companyInfo.postal_code = contactInfo.postalcode;
    }
  },

}
</script>
