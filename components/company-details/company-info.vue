<template>
  <div class="py-8 company-details-info">
    <div class="d-flex align-center justify-space-between flex-wrap company-info-details">
      <div class="d-flex align-center flex-wrap pe-sm-16">
        <span v-if="logo === ''" class="me-4 empty-logo">&nbsp;</span>
        <div v-else-if="logo !== ''" class="logo-container">
          <img :src="logo" alt="company-logo">
        </div>
        <div class="company-name-info">
          <p class="company-name">{{ companyName }}</p>
          <p class="company-slogan">{{ companySlogan }}</p>
        </div>
      </div>
      <div class="contact-info">
        <div class="phone">
          <span class="icon">
            <v-icon>mdi-phone</v-icon>
          </span>
          <span class="number">{{ phone }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: '',
      companyName: 'Name of the company',
      companySlogan: 'World class B2B wholesale platform',
      phone: '+44 21 5648 1236'
    }
  }
}
</script>

<style>

</style>
