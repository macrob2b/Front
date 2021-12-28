<template>
  <div class="certification">
    <AddInformation
      :type="Certificates"
      :names="certificateNames"
      @add="form = 'certificate'"
      @newNames="certificateNames = $event"></AddInformation>
    <AddCertificate
      v-if="form === 'certificate'"
      @formData="certificateData = $event"
    ></AddCertificate>
  </div>
</template>

<script>
  import AddInformation from "~/components/factories-branches/add-information"
  import AddCertificate from "~/components/certifications/add-certificate"
  export default {
    components: {
      AddInformation,
      AddCertificate
    },
    data() {
      return {
        form: '',
        certificateData: '',
        certificateNames: [],
        Certificates: {
          title: 'Certificates',
          btnTitle: '+ Add Certificate',
        },
      }
    },
    watch: {
      certificateData(val) {
        this.certificateNames.push(val);
        this.form = '';
      },
    }
  }
</script>
