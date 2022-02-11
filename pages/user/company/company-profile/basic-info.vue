<template>
  <div class="basic-info">
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
                  outlined
                  @change="uploadFile"
                  @click:clear="deleteFile"
                  append-icon="mdi-cloud-upload"
                  label="Business Logo"
                ></v-file-input>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.companyImage"
                  small-chips
                  multiple
                  outlined
                  append-icon="mdi-cloud-upload"
                  label="Company Image"
                ></v-file-input>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.companyBrochure"
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
      class="submit"
      @click="submitCompanyInfo"

    >
      Submit
    </v-btn>

    <v-btn outlined>
      Cancel
    </v-btn>

  </div>
</template>

<script>
import LocationField from "~/components/Form/LocationField";
import PhoneNumberInput from "~/components/phoneNumberInput";


export default {
  // props: ['serverComInfo'],
  data() {
    return {
      default_location:null,
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
        logo_name: '',
        image: '',
        images: [],
        brochure: [],
        video: '',
      },
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
    }
  },
  mounted() {
    this.loadBusinessType();
    this.loadCompanyInfo();
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
      let formData = new FormData()


      for (var key in this.companyInfo) {
        formData.append(key, this.companyInfo[key]);
      }


      this.$axios.post('/api/update_company_general_info', formData)
        .then(response => {
          console.log(response.data.length);

          if (response.data.length==0)
            this.$toast.success("Update data successfuly");
          else
            this.$toast.error("Please fill required fields");

        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        } else {
          this.$toast.error("Please fill all fields");
        }
      });
    },
    async loadCompanyInfo() {
      await this.$axios.$post('/api/get_company_info',{
        id:this.$auth.user.company._id
      }).then(response => {
        var user_company = response;
        this.companyInfo.roles = user_company.roles;
        this.companyInfo.company_name = user_company.company_name;
        this.companyInfo.business_type = user_company.business_type;
        this.companyInfo.location = user_company.location.coordinates[1]+','+user_company.location.coordinates[0];

        this.reverseLocation(user_company.location.coordinates[1],user_company.location.coordinates[0]);

        this.companyInfo.country = user_company.country;
        this.companyInfo.country_code = user_company.country_code;
        this.companyInfo.state = user_company.state;
        this.companyInfo.city = user_company.city;
        this.companyInfo.description = user_company.description;
        this.companyInfo.phone = user_company.phone;
        this.companyInfo.fax = user_company.fax;
        this.companyInfo.employees_total = user_company.employees_total;
        this.companyInfo.annual_revenue = user_company.annual_revenue;
        this.companyInfo.year_established = user_company.year_established;
        this.companyInfo.email = user_company.email;
        this.companyInfo.website = user_company.website;
        this.companyInfo.postal_code = user_company.postal_code;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });

    },
    async reverseLocation(lat,lng){
        await this.$axios.$post('/api/reverse_location',{
          lat:lat,
          lng:lng,
        }).then(response => {
         this.default_location=response;
        }).catch(({response}) => {
          if (response.status == 401) {
            this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
          } else if (response.status == 500 || response.status == 504) {
            this.$toast.error(this.$t(`REQUEST_FAILED`));
          }
        });

    },
    async uploadFile() {
      if (this.companyInfo.logo) {
        let formData = new FormData();
        formData.append('file', this.companyInfo.logo);
        formData.append('field', 'logo');
        formData.append('directory', '/');

        await this.$axios.$post('/api/upload_company_file',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(response => {
            this.companyInfo.logo_name = response;
          }).catch(({err}) => {
            this.$toast.error(err)

          });
      }
    },
    async deleteFile() {
      await this.$axios.$delete('/api/delete_company_file',
        {
          params: {
            'field': 'logo'
          }
        }
      )
        .then(response => {
          this.$toast.error("Deleted successfully");
        }).catch(({err}) => {
          this.$toast.error(err)

        });
    }
  },

}
</script>
