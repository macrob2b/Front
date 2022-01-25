<template>
  <div class="basic-info">
    <UserType @updateData="updateRole"></UserType>
    <CompanyInfo @updateData="updateCompanyInfo"></CompanyInfo>
    <ContactInfo @updateData="updateContactInfo"></ContactInfo>
    <Media @updateData="updateMediaInfo"></Media>
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
        role: '',
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
  watch: {
    $data: {
      handler: function(val, oldVal) {
        console.log("companyInfo basic:", JSON.stringify(this.$data))
        this.$emit('updateCompanyInfoData', this.$data.companyInfo)
      },
      deep: true
    }
  },
  components: {
    UserType,
    CompanyInfo,
    ContactInfo,
    Media
  },
  methods: {
    updateRole(usertype) {
      let result = "";
      for (let i in usertype) {
        if (usertype[i] === true) {
          result += i +",";
        }
      }
      this.companyInfo.role = result
    },
    updateCompanyInfo(companyInfo) {
      this.companyInfo.company_name = companyInfo.company_name;
      this.companyInfo.business_type = companyInfo.business_type;
      this.companyInfo.street_address = companyInfo.address;
      this.companyInfo.country = companyInfo.country;
      this.companyInfo.state = companyInfo.state;
      this.companyInfo.city = companyInfo.city;
      this.companyInfo.description = companyInfo.description;
      this.companyInfo.employees_total = companyInfo.employeesTotal;
      this.companyInfo.annual_revenue = companyInfo.annual_revenue;
      this.companyInfo.year_established = companyInfo.yearEstablished;
    },
    updateContactInfo(contactInfo) {
      this.companyInfo.phone = contactInfo.phone;
      this.companyInfo.fax = contactInfo.fax;
      this.companyInfo.email = contactInfo.email;
      this.companyInfo.postal_code = contactInfo.postalcode;
    },
    updateMediaInfo(mediaInfo) {
      this.companyInfo.logo = mediaInfo.logo;
      this.companyInfo.image = mediaInfo.image;
      this.companyInfo.brochure = mediaInfo.brochure;
      this.companyInfo.video = mediaInfo.video;
    }
  },

}
</script>
