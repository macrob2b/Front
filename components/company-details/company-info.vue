<template>
  <div class="py-8 company-details-info">
    <div class="d-flex align-center justify-space-between flex-wrap company-info-details">
      <div class="d-flex align-center flex-wrap pe-sm-16">
        <span v-if="logo === ''" class="me-4 empty-logo">&nbsp;</span>
        <div v-else-if="logo !== ''" class="logo-container mx-4">
          <img :src="logo" :alt="(companyInfo.company_name ? companyInfo.company_name : 'No name')">
        </div>
        <div class="company-name-info">
          <p class="company-name">{{ companyInfo.company_name ? companyInfo.company_name : 'No name' }}</p>
          <p class="company-slogan">{{ companySlogan }}</p>
        </div>
      </div>
      <div class="contact-info" v-if="companyInfo.phone || companyInfo.owner.mobile_num">
        <div class="phone">
          <span class="icon">
            <v-icon>mdi-phone</v-icon>
          </span>
          <a :href="'tel:'+companyInfo.phone ? companyInfo.phone : companyInfo.owner.mobile_num" target="_blank" class="number">
            {{ companyInfo.phone ? companyInfo.phone : companyInfo.owner.mobile_num }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyInfo: [],
  },
  data() {
    return {
      logo: '',
      companySlogan: 'World class B2B wholesale platform',
    }
  },
  mounted() {
    if (this.companyInfo.logo)
      this.logo = "https://dl.macrob2b.com/companies/" + this.companyInfo._id + "/" + this.companyInfo.logo;
    else
      this.logo = '';
  }
}
</script>

<style>

</style>
