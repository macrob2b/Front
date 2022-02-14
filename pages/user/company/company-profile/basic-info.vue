<template>
  <v-row class="mt-12 mb-12" v-if="!loaded">
    <v-col cols="12" class="text-center">
      <v-progress-circular
        :size="50"
        :width="5"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
  <div v-else class="basic-info">
    <!--User type-->
    <div class="user-type">
      <div class="user-type-header">
        <p>I am</p>
      </div>
      <v-divider></v-divider>
      <div class="user-type-body">
        <v-checkbox
          v-model="companyInfo.roles"
          value="buyer"
          label="Buyer"
        ></v-checkbox>
        <v-checkbox
          v-model="companyInfo.roles"
          value="seller"
          label="Seller"
        ></v-checkbox>
        <v-checkbox
          v-model="companyInfo.roles"
          value="agent"
          label="Agent"
        ></v-checkbox>
      </div>
    </div>
    <!--End user type-->
    <!--Company info-->
    <div class="company-info">
      <div class="company-info-header">
        <p>Company info</p>
      </div>
      <v-divider></v-divider>

      <div class="company-info-body">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.company_name"
                  label="Company name"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-select
                  v-model="companyInfo.business_type"
                  :items="bussinessTypeArr"
                  item-text="title"
                  item-value="_id"
                  label="Business type"
                  outlined
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <location-field
                  v-model="companyInfo.location"
                  label="Business Location"
                  :defaultLocation="default_location"
                  @locationSelected="locationSelected"
                ></location-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.country"
                  label="Country/Region"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.state"
                  label="State/Province"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.city"
                  label="City"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="companyInfo.description"
                  outlined
                  name="input-7-4"
                  label="Company Description"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.employees_total"
                  label="Employees Total"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.annual_revenue"
                  label="Annual Revenue"
                  :rules="revenueRules"
                  append-icon="mdi-currency-usd"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.year_established"
                  type="number"
                  label="Year Established"
                  :rules="yearEstablishedRule"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
    <!--End company info-->

    <!--Contact info-->
    <div class="contact-info">
      <div class="contact-info-header">
        <p>Contact info</p>
      </div>
      <v-divider></v-divider>
      <div class="contact-info-body">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <phone-number-input
                  @numberEntered="phoneNumberEntered" :phone="companyInfo.phone"></phone-number-input>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <phone-number-input @numberEntered="faxNumberEntered" label="Fax"
                                    :phone="companyInfo.fax"></phone-number-input>
              </v-col>


              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.email"
                  :rules="emailRules"
                  label="Email"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.website"
                  append-icon="mdi-web"
                  :rules="urlRules"
                  label="Company Website URL"
                  outlined
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.postal_code"
                  label="Postal Code"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
    <!--End Contact info-->

    <!--Upload media section-->
    <div class="media">
      <div class="media-header">
        <p>Media</p>
      </div>
      <v-divider></v-divider>
      <div class="media-body">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.logo"
                  small-chips
                  accept="image/png,image/webp,"
                  outlined
                  @change="uploadFile('logo')"
                  @click:clear="deleteFile('logo')"
                  append-icon="mdi-cloud-upload"
                  label="Business Logo"
                ></v-file-input>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.images"
                  small-chips
                  multiple
                  outlined
                  accept="image/png,image/webp,"
                  @change="uploadFile('images')"
                  @click:clear="deleteFile('images')"
                  append-icon="mdi-cloud-upload"
                  label="Company Image"
                ></v-file-input>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.brochures"
                  small-chips
                  multiple
                  outlined
                  append-icon="mdi-cloud-upload"
                  label="Company Brochure"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.video"
                  label="Video"
                  outlined
                  append-icon="mdi-cloud-upload"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
    <!--End Upload media section-->

    <v-btn
      class="submit mt-3 primary"
      :loading="submit_loading"
      @click="submitCompanyInfo"

    >
      Update
    </v-btn>

    <v-btn outlined class="mt-3">
      Cancel
    </v-btn>

  </div>
</template>

<script>
import LocationField from "~/components/Form/LocationField";
import PhoneNumberInput from "~/components/phoneNumberInput";


export default {
  props: {
    companyLoadedInfo: []
  },
  data() {
    return {
      default_location: null,
      loaded: false,
      bussinessTypeArr: [],
      companyInfo: {
        roles: [],
        company_name: '',
        business_type: '',
        location: '',
        country: '',
        country_code: '',
        state: '',
        city: '',
        description: '',
        employees_total: '',
        annual_revenue: '',
        year_established: '',
        phone: '',
        fax: '',
        website: '',
        email: '',
        postal_code: '',
        logo: '',
        images: [],
        brochures: [],
        video: '',
      },
      submit_loading: false,
      yearEstablishedRule: [
        value => {
          if (!value.trim()) return true;
          if (!isNaN(parseInt(value)) && value >= 1900 && value <= new Date().getFullYear()) return true;
          return 'The year entered must be after 1900 to the present year';
        },
      ],
      revenueRules: [
        value => {
          const pattern = /^[-,0-9]+$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      urlRules: [
        value => {
          const pattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
          return pattern.test(value) || 'Invalid value.'
        }
      ],
    }
  },
  computed: {
    employeesTotal: function () {
      return this.companyInfo.employees_total;
    }
  },
  watch: {
    employeesTotal(val) {
      this.companyInfo.employees_total = this.spilitter(val);
    },
    revenue(val) {
      this.revenue = this.spilitter(val);
    },
    companyLoadedInfo(val) {
      if (val.length !== 0 && this.loaded === false) {
        this.setCompanyData();
        this.loaded = true;
      }
    }

  },
  mounted() {
    this.loadBusinessType();
  },


  components: {
    LocationField,
    PhoneNumberInput,
  },
  methods: {
    async loadBusinessType() {
      await this.$axios.$post('/api/business_type').then(response => {
        this.bussinessTypeArr = response;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
    },
    async setCompanyData() {
      this.companyInfo.roles = this.companyLoadedInfo.roles;
      this.companyInfo.company_name = this.companyLoadedInfo.company_name;
      this.companyInfo.business_type = this.companyLoadedInfo.business_type;
      this.companyInfo.location = this.companyLoadedInfo.location.coordinates[1] + ',' + this.companyLoadedInfo.location.coordinates[0];

      this.reverseLocation(this.companyLoadedInfo.location.coordinates[1], this.companyLoadedInfo.location.coordinates[0]);

      this.companyInfo.country = this.companyLoadedInfo.country;
      this.companyInfo.country_code = this.companyLoadedInfo.country_code;
      this.companyInfo.state = this.companyLoadedInfo.state;
      this.companyInfo.city = this.companyLoadedInfo.city;
      this.companyInfo.description = this.companyLoadedInfo.description;
      this.companyInfo.phone = this.companyLoadedInfo.phone;
      this.companyInfo.fax = this.companyLoadedInfo.fax;
      this.companyInfo.employees_total = this.companyLoadedInfo.employees_total;
      this.companyInfo.annual_revenue = this.companyLoadedInfo.annual_revenue;
      this.companyInfo.year_established = this.companyLoadedInfo.year_established;
      this.companyInfo.email = this.companyLoadedInfo.email;
      this.companyInfo.website = this.companyLoadedInfo.website;
      this.companyInfo.postal_code = this.companyLoadedInfo.postal_code;
      this.companyInfo.logo = this.companyLoadedInfo.logo ? new File([], this.companyLoadedInfo.logo) : '';
      for (var x = 0; x < this.companyLoadedInfo.images.length; x++) {
        this.companyInfo.images[x] = new File([], this.companyLoadedInfo.images[x]) ;
      }
    },
    spilitter(val) {
      val = val.replace(/,/g, '');
      const str = val.toString().split(".");
      return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    locationSelected(location) {
      this.companyInfo.location = location.lat + ',' + location.lng;
      this.companyInfo.country = location.country;
      this.companyInfo.country_code = location.country_code;
      this.companyInfo.state = location.state;
      this.companyInfo.city = location.city;
    },
    phoneNumberEntered(phoneEntered) {
      this.companyInfo.phone = phoneEntered
    },
    faxNumberEntered(faxEntered) {
      this.companyInfo.fax = faxEntered
    },


    submitCompanyInfo() {
      this.submit_loading = true;
      let formData = new FormData()


      for (var key in this.companyInfo) {
        formData.append(key, this.companyInfo[key]);
      }


      this.$axios.post('/api/update_company_general_info', formData)
        .then(response => {
          if (response.data.length == 0)
            this.$toast.success("Update data successfully");
          else
            this.$toast.error("Please fill required fields");

          this.submit_loading = false;

        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        } else {
          this.$toast.error("Please fill all fields");
        }
        this.submit_loading = false;
      });
    },
    async reverseLocation(lat, lng) {
      await this.$axios.$post('/api/reverse_location', {
        lat: lat,
        lng: lng,
      }).then(response => {
        this.default_location = response;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });

    },
    async uploadFile(type) {
      let formData = new FormData();

      console.log(type);
      console.log(this.companyInfo.logo);
      if (type === 'logo') {
        if (this.companyInfo.logo) {
          formData.append('file', this.companyInfo.logo);
          formData.append('field', 'logo');
          formData.append('directory', '/');
          formData.append('type', 'single');
        }
      } else if (type === 'images') {
        if (this.companyInfo.images) {
          var ins = this.companyInfo.images.length;
          for (var x = 0; x < ins; x++) {
            formData.append("file[]", this.companyInfo.images[x]);
          }
          formData.append('field', 'images');
          formData.append('directory', '/images');
          formData.append('type', 'multiple');
        }
      }

      console.log(formData);

      await this.$axios.$post('/api/upload_company_file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          console.log("Success");
          // this.companyInfo.logo_name = response;
        }).catch(({err}) => {
          this.$toast.error(err)

        });
    },
    async deleteFile(type) {
      await this.$axios.$delete('/api/delete_company_file',
        {
          params: {
            'field': type
          }
        }
      )
        .then(response => {
          this.$toast.error("Deleted successfully");
        }).catch(({err}) => {
          this.$toast.error(err)

        });
    }
  }
  ,

}
</script>
