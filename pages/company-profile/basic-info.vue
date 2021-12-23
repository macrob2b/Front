<template>
  <div class="basic-info">
    <UserType></UserType>
    <CompanyInfo></CompanyInfo>
    <ContactInfo></ContactInfo>
    <Media></Media>
  </div>
</template>

<script>
  import UserType from "~/components/company/user-type"
  import CompanyInfo from "~/components/company/company-info"
  import ContactInfo from "~/components/company/contact-info"
  import Media from "~/components/company/media"
  export default {
    components: {
      UserType,
      CompanyInfo,
      ContactInfo,
      Media
    }
  }
</script>
