<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="certification">

    <certificate-section/>
    <trademark-section/>
    <patent-section/>
  </div>
</template>

<script>
import CertificateSection from "../../../../components/certifications/certificate-section";
import TrademarkSection from "../../../../components/certifications/trademark-section";
import PatentSection from "../../../../components/certifications/patent-section";

export default {
  components: {
    PatentSection,
    TrademarkSection,
    CertificateSection

  }

}
</script>
