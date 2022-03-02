<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content certificate-tab-content">
      <div class="mb-8 title">
        <v-icon class="secondary-color">mdi-poll</v-icon>
        Certificates
      </div>
      <v-data-table
        :headers="certificates_headers"
        :items="certificates"
        hide-default-footer
        item-key="name"
        class="elevation-1 certificate-table"
      >
        <template v-slot:item.image="{ item }">
          <img :src="getFile(item,'certificate')" style="width: 50px; height: 40px" />
        </template>
        <template v-slot:item.verified="{ item }">
          <v-simple-checkbox
            v-model="item.verified"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>

    <div class="pa-8 secondary-background company-details-tabs-content certificate-tab-content">
      <div class="mb-8 title">
        <v-icon class="secondary-color">mdi-poll</v-icon>
        Trademarks
      </div>
      <v-data-table
        :headers="trademarks_headers"
        :items="trademarks"
        hide-default-footer
        item-key="name"
        class="elevation-1 certificate-table"
      >
        <template v-slot:item.image="{ item }">
          <img :src="getFile(item,'trademark')" style="width: 50px; height: 40px" />
        </template>
        <template v-slot:item.verified="{ item }">
          <v-simple-checkbox
            v-model="item.verified"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>

    <div class="pa-8 secondary-background company-details-tabs-content certificate-tab-content">
      <div class="mb-8 title">
        <v-icon class="secondary-color">mdi-poll</v-icon>
        Patents
      </div>
      <v-data-table
        :headers="patents_headers"
        :items="patents"
        hide-default-footer
        item-key="name"
        class="elevation-1 certificate-table"
      >
        <template v-slot:item.image="{ item }">
          <img :src="getFile(item,'patent')" style="width: 50px; height: 40px" />
        </template>
        <template v-slot:item.verified="{ item }">
          <v-simple-checkbox
            v-model="item.verified"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data: () => ({
    certificates:[],
    trademarks:[],
    patents:[],
    certificates_headers: [
      {
        text: 'Picture',
        align: 'start',
        sortable: false,
        value: 'image',
      },
      { text: 'Certificate name', value: 'name' },
      { text: 'Certificate issuer', value: 'issuer' },
      { text: 'Certificate ID', value: 'identify_num' },
      { text: 'Expiry date', value: 'expiry_date' },
      { text: 'Verified', value: 'verified' },
    ],
    trademarks_headers: [
      {
        text: 'Picture',
        align: 'start',
        sortable: false,
        value: 'image',
      },
      { text: 'Trademark name', value: 'name' },
      { text: 'Registration number', value: 'registration_no' },
      { text: 'Start date', value: 'start_date' },
      { text: 'End date', value: 'end_date' },
      { text: 'Verified', value: 'verified' },
    ],
    patents_headers: [
      {
        text: 'Picture',
        align: 'start',
        sortable: false,
        value: 'image',
      },
      { text: 'Patent name', value: 'name' },
      { text: 'Patent number', value: 'num' },
      { text: 'Start date', value: 'start_date' },
      { text: 'Verified', value: 'verified' },
    ],
  }),

  mounted() {
    this.getCertificates();
    this.getTrademarks();
    this.getPatents();
  },
  methods:{
    getCertificates() {
      this.loading_data=true;
      this.$axios.$post('/api/certification_list',
        {company_id: this.$route.params.id}).then(response => {
        this.certificates = response;
        this.loading_data=false;
      }).catch(({response}) => {
        func(false, this);
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
        this.loading_data=false;
      });
    },
    getTrademarks() {
      this.loading_data = true;
      this.$axios.$post('/api/trademark_list',
        {company_id: this.$route.params.id}).then(response => {
        this.trademarks = response;
        this.loading_data = false;
      }).catch(({response}) => {
        func(false, this);
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
        this.loading_data = false;
      });
    },
    getPatents() {
      this.loading_data=true;
      this.$axios.$post('/api/patent_list',
        {company_id: this.$route.params.id}).then(response => {
        this.patents = response;
        this.loading_data=false;
      }).catch(({response}) => {
        func(false, this);
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
        this.loading_data=false;
      });
    },
    getFile(item, type) {
      if (type == 'certificate')
        return "https://dl.macrob2b.com/companies/" + item.company_id + "/certification/" + item.image;
      else if (type == 'trademark')
        return "https://dl.macrob2b.com/companies/" + item.company_id + "/trademark/" + item.image;
      else if (type == 'patent')
        return "https://dl.macrob2b.com/companies/" + item.company_id + "/patent/" + item.image;
    }
  }
}
</script>
