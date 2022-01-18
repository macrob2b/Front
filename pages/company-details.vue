<template>
  <div class="company-details">
    <company-info></company-info>
    <company-details-tabs></company-details-tabs>
  </div>
</template>

<script>
import companyInfo from '../components/company-details/company-info'
import companyDetailsTabs from '../components/company-details/company-details-tabs'

export default {
  auth:false,
  components: {
    companyInfo,
    companyDetailsTabs
  },
  data() {
    return {
    }
  }
}
</script>
