<template>
  <div class="company-details">
    <v-row>
      <v-col cols="12">
        <company-info :companyInfo="company_info"></company-info>
        <company-details-tabs :companyInfo="company_info"></company-details-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import companyInfo from '../../components/company-details/company-info'
import companyDetailsTabs from '../../components/company-details/company-details-tabs'

export default {
  auth: false,
  async asyncData({params, $axios}) {
    const company_info = await $axios.$post('/api/get_company_info',
      {
        id: params.id
      });
    return {company_info};

  },
  head() {
    return {
      title: this.company_info.company_name,
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: JSON.stringify(
            {
              "@context": "http://schema.org",
              "@type": "Corporation",
              name: this.company_info.company_name ? this.company_info.company_name : '',
              email: this.company_info.email ? this.company_info.email : '',
              telephone: this.company_info.phone ? this.company_info.phone : '',
              logo: {
                "@type": "ImageObject",
                url:this.company_info.website ? this.company_info.website : '',
                name: this.company_info.company_name ? this.company_info.company_name : '',
                contentUrl:this.company_info.logo ? `${process.env.baseUrl}/companies/${this.company_info._id}/${this.company_info.logo}` : ''
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: this.company_info.address ? this.company_info.address : '',
                addressLocality: this.company_info.city ? this.company_info.city : '',
                addressRegion: this.company_info.state ? this.company_info.state : '',
                country: this.company_info.country ? this.company_info.country : '',
              }
            }
          ),
          type: 'application/ld+json'
        }
      ],
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: (this.company_info && this.company_info.description) ? this.company_info.description.replace(/<[^>]+>/g, '').replace("\n", " ").substr(0, 300) + '...' : ''
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: 'business to business,free product advertising,free company advertising,sales,b2b marketing,b2b,b2b sales,b2b services,b2b business,business,business analyst,startup,startup business,startup funding,sell,selling,sellers agent,sellers market,buyers agent,buyer,wholesale,trading'
        },
      ]
    };
  },

  components: {
    companyInfo,
    companyDetailsTabs
  },
  data() {
    return {
      company_info: []
    }
  }

}
</script>
