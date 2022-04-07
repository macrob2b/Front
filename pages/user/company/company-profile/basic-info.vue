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
                  :items="businessTypeArr"
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
                  :defaultLocation="companyInfo.country"
                  @locationSelected="locationSelected"
                ></location-field>
              </v-col>
            </v-row>
            <v-row>
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

              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="companyInfo.address"
                  label="Street address"
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
                  label="Company Website URL"
                  hint="Ex: https://macrob2b.com"
                  persistent-hint
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
                  accept="image/png,image/webp,"
                  outlined
                  :clearable="false"
                  :loading="logo_uploading"
                  @change="uploadFile('logo')"
                  append-icon="mdi-cloud-upload"
                  label="Business Logo"
                ></v-file-input>
                <v-chip
                  v-if="company_logo_name"
                  small
                  class="my-1"
                  @click:close="deleteFile('logo')"
                  text-color="white"
                  color="green"
                  close>
                  {{ company_logo_name.substring(0, 30) }}
                </v-chip>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.images"
                  multiple
                  :clearable="false"
                  outlined
                  :loading="images_uploading"
                  accept="image/png,image/webp,"
                  @change="uploadFile('images')"
                  append-icon="mdi-cloud-upload"
                  label="Company Image"
                ></v-file-input>
                <v-chip
                  v-for="item in company_images_name"
                  small
                  class="my-1"
                  @click:close="deleteFile('images',item)"
                  text-color="white"
                  color="green"
                  close>
                  {{ item.substring(0, 15) }}
                </v-chip>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.brochures"
                  multiple
                  :clearable="false"
                  outlined
                  :loading="brochures_uploading"
                  accept="image/jpeg,image/gif,image/png,image/webp,application/pdf"
                  @change="uploadFile('brochures')"
                  append-icon="mdi-cloud-upload"
                  label="Company Brochure"
                ></v-file-input>

                <v-chip
                  v-for="item in company_brochures_name"
                  @click:close="deleteFile('brochures',item)"
                  small
                  class="my-1"
                  text-color="white"
                  color="green"
                  close>
                  {{ item.substring(0, 15) }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-file-input
                  v-model="companyInfo.video"
                  :loading="video_uploading"
                  label="Video"
                  accept="video/mp4,video/x-m4v,video/*"
                  @change="uploadFile('video')"
                  outlined
                  append-icon="mdi-cloud-upload"
                ></v-file-input>
                <v-chip
                  v-if="company_video_name"
                  small
                  class="my-1"
                  @click:close="deleteFile('video')"
                  text-color="white"
                  color="green"
                  close>
                  {{ company_video_name.substring(0, 30) }}
                </v-chip>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
    <!--End Upload media section-->

    <!--Social media section-->
    <div class="social-media">
      <div class="social-media-header">
        <p>Social media</p>
      </div>
      <v-divider></v-divider>
      <div class="social-media-body">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="companyInfo.facebook_address"
                outlined
                append-icon="mdi-facebook"
                label="Facebook"
              />

            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="companyInfo.instagram_address"
                outlined
                append-icon="mdi-instagram"
                label="Instagram"
              />

            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="companyInfo.linkedin_address"
                outlined
                append-icon="mdi-linkedin"
                label="Linkedin"
              />

            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <!--Social media section-->

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
  props: ['companyLoadedInfo'],
  data() {
    return {
      loaded: false,


      logo_uploading: false,
      images_uploading: false,
      brochures_uploading: false,
      video_uploading: false,

      businessTypeArr: [],
      companyInfo: {
        roles: [],
        company_name: '',
        business_type: '',
        location: '',
        country: null,
        country_code: '',
        state: '',
        city: '',
        address: '',
        description: '',
        employees_total: '',
        annual_revenue: '',
        year_established: '',
        phone: '',
        fax: '',
        website: '',
        email: '',
        postal_code: '',
        logo: null,
        images: [],
        brochures: [],
        video: null,
        facebook_address: null,
        instagram_address: null,
        linkedin_address: null
      },

      //Uploaded name section
      company_images_name: [],
      company_logo_name: '',
      company_video_name: '',
      company_brochures_name: [],

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
      ]
    }
  },
  computed: {
    employeesTotal: function () {
      return this.companyInfo.employees_total;
    }
  },
  watch: {
    employeesTotal(val) {
      if (val && val!==null)
        this.companyInfo.employees_total = this.spilitter(val);
    },
    revenue(val) {
      if (val && val!==null)
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
        this.businessTypeArr = response;
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

      if (this.companyLoadedInfo && this.companyLoadedInfo.location) {
        this.companyInfo.location = this.companyLoadedInfo.location.coordinates[1] + ',' + this.companyLoadedInfo.location.coordinates[0];

      }

      this.companyInfo.country = this.companyLoadedInfo.country;
      this.companyInfo.country_code = this.companyLoadedInfo.country_code;
      this.companyInfo.state = this.companyLoadedInfo.state;
      this.companyInfo.city = this.companyLoadedInfo.city;
      this.companyInfo.address = this.companyLoadedInfo.address;
      this.companyInfo.description = this.companyLoadedInfo.description;
      this.companyInfo.phone = this.companyLoadedInfo.phone;
      this.companyInfo.fax = this.companyLoadedInfo.fax;
      this.companyInfo.employees_total = this.companyLoadedInfo.employees_total;
      this.companyInfo.annual_revenue = this.companyLoadedInfo.annual_revenue;
      this.companyInfo.year_established = this.companyLoadedInfo.year_established;
      this.companyInfo.email = this.companyLoadedInfo.email;
      this.companyInfo.website = this.companyLoadedInfo.website;
      this.companyInfo.postal_code = this.companyLoadedInfo.postal_code;

      if (this.companyLoadedInfo && this.companyLoadedInfo.logo)
        this.company_logo_name = this.companyLoadedInfo.logo;

      if (this.companyLoadedInfo && this.companyLoadedInfo.images)
        this.company_images_name = this.companyLoadedInfo.images;

      if (this.companyLoadedInfo && this.companyLoadedInfo.brochures)
        this.company_brochures_name = this.companyLoadedInfo.brochures;

      if (this.companyLoadedInfo && this.companyLoadedInfo.video)
        this.company_video_name = this.companyLoadedInfo.video;


      this.companyInfo.facebook_address = this.companyLoadedInfo.facebook_address;
      this.companyInfo.instagram_address = this.companyLoadedInfo.instagram_address;
      this.companyInfo.linkedin_address = this.companyLoadedInfo.linkedin_address;


    },
    spilitter(val) {
      val = val.replace(/,/g, '');
      const str = val.toString().split(".");
      return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    ,
    locationSelected(location) {
      this.companyInfo.location = location.lat + ',' + location.lng;
      this.companyInfo.country = location.country;
      this.companyInfo.country_code = location.country_code;
      this.companyInfo.state = location.state;
      this.companyInfo.city = location.city;
    }
    ,
    phoneNumberEntered(phoneEntered) {
      this.companyInfo.phone = phoneEntered
    }
    ,
    faxNumberEntered(faxEntered) {
      this.companyInfo.fax = faxEntered
    }
    ,


    submitCompanyInfo() {
      this.submit_loading = true;
      let formData = new FormData()


      for (var key in this.companyInfo) {
        if (!(key === "logo" || key === "images" || key === "video" || key === "brochures"))
          formData.append(key, this.companyInfo[key]);
      }


      this.$axios.$post('/api/update_company_general_info', formData)
        .then(response => {
          if (typeof response === 'object') {
            for (let i in response) {
              let error = response[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.$toast.success("Update data successfully");
          }
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
    }
    ,
    async uploadFile(type) {
      let formData = new FormData();

      if (type === 'logo') {
        if (this.companyInfo.logo) {
          this.logo_uploading = true;
          this.submit_loading = true;

          formData.append('file', this.companyInfo.logo);
          formData.append('field', 'logo');
          formData.append('directory', '/');
          formData.append('type', 'single');

          this.handleUpload(formData, type);

        }
      } else if (type === 'images') {
        if (this.companyInfo.images) {
          this.images_uploading = true;
          this.submit_loading = true;

          var ins = this.companyInfo.images.length;
          for (var x = 0; x < ins; x++) {
            formData.append("file[]", this.companyInfo.images[x]);
          }
          formData.append('field', 'images');
          formData.append('directory', '/images');
          formData.append('type', 'multiple');

          this.handleUpload(formData, type);

        }
      } else if (type === 'brochures') {
        if (this.companyInfo.brochures) {
          this.brochures_uploading = true;
          this.submit_loading = true;

          var ins = this.companyInfo.brochures.length;
          for (var x = 0; x < ins; x++) {
            formData.append("file[]", this.companyInfo.brochures[x]);
          }
          formData.append('field', 'brochures');
          formData.append('directory', '/brochures');
          formData.append('type', 'multiple');

          this.handleUpload(formData, type);

        }
      } else if (type === 'video') {
        if (this.companyInfo.video) {
          this.video_uploading = true;
          this.submit_loading = true;

          formData.append('file', this.companyInfo.video);
          formData.append('field', 'video');
          formData.append('directory', '/video');
          formData.append('type', 'single');

          this.handleUpload(formData, type);
        }
      }


    }
    ,
    async handleUpload(formData, type = '') {
      await this.$axios.$post('/api/upload_company_file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          if (type === 'images')
            this.company_images_name = response
          else if (type === 'logo')
            this.company_logo_name = response;
          else if (type === "brochures")
            this.company_brochures_name = response;
          else if (type === "video")
            this.company_video_name = response;
          console.log("Success");
          this.logo_uploading = false;
          this.images_uploading = false;
          this.brochures_uploading = false;
          this.video_uploading = false;

          this.submit_loading = false;
          // this.companyInfo.logo_name = response;
        }).catch(({err}) => {
          this.$toast.error(err)

          this.logo_uploading = false;
          this.images_uploading = false;
          this.brochures_uploading = false;
          this.video_uploading = false;

          this.submit_loading = false;
        });
    }
    ,
    async deleteFile(type, filename = '') {
      this.$toast.info("Delete in progress ...");
      await this.$axios.$delete('/api/delete_company_file',
        {
          params: {
            field: type,
            filename: filename
          }
        }
      )
        .then(response => {
          if (type === "images")
            this.company_images_name = response;
          else if (type === "logo")
            this.company_logo_name = response;
          else if (type === "brochures")
            this.company_brochures_name = response;
          else if (type === "video")
            this.company_video_name = response;

          this.$toast.error("Deleted successfully");
        }).catch(({err}) => {
          this.$toast.error(err)

        });
    }
  }
  ,

}
</script>
