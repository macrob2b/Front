<template>
  <div class="add-branch">
    <div class="add-branch-inner">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="branch.name"
                label="Branch Name"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <phone-number-input @numberEntered="contactNumEntered" label="Contact Number"
                                  :phone="branch.contact_num"></phone-number-input>

            </v-col>

            <v-col
              cols="12"
            >
              <location-field
                v-model="branch.location"
                label="Branch Address"
                @locationSelected="locationSelected"/>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
            >
              <v-textarea
                outlined
                v-model="branch.description"
                label="Description"
                required
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-file-input
                v-model="branch.image"
                accept="image/*"
                label="Image"
                outlined
              ></v-file-input>
            </v-col>
          </v-row>
          <div class="branch-supervisor">
            <div class="branch-supervisor-header">
              <p>Branch Supervisor</p>
            </div>
            <v-divider></v-divider>
            <div class="branch-supervisor-body">
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="branch.supervisor_name"
                        label="Name & Family"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <phone-number-input @numberEntered="supervisorNumEntered" label="Phone"
                                          :phone="branch.supervisor_phone"/>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <phone-number-input @numberEntered="supervisorFaxEntered" label="Fax"
                                          :phone="branch.supervisor_fax"/>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="branch.supervisor_email"
                        :rules="emailRules"
                        label="E-mail"
                        outlined
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </div>
          </div>
        </v-container>
      </v-form>
      <div>
        <v-btn
          class="primary"
          :loading="submit_loading"
          @click="submit">
          Submit
        </v-btn>
        <v-btn
          @click="$emit('input', false)"
          outlined
          class="cancelBtn"
        >
          cancel
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import LocationField from "../Form/LocationField";

export default {
  props: ['value'],
  components: {
    LocationField
  },
  computed: {},
  data() {
    return {
      submit_loading: false,
      branch: {
        name: '',
        contact_num: '',
        location: '',
        description: '',
        image: [],
        supervisor_name: '',
        supervisor_phone: '',
        supervisor_fax: '',
        supervisor_email: '',
      },
      valid: false,
      contactRules: [
        value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      phoneRules: [
        value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      faxRules: [
        value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      emailRules: [
        value => !!value || 'E-mail is required',
        value => /.+@.+/.test(value) || 'E-mail must be valid',
      ],
    }
  },
  // watch: {
  //   activeBranch: {
  //     handler: function(val) {
  //       this.branch = val;
  //     },
  //     immediate: true
  //   },
  // },
  methods: {
    submit() {
      // this.$emit('formData', this.branch);
      this.submit_loading = true;
      let formData = new FormData()

      let edit = false;
      for (let key in _.pick(this.branch, '_id', 'name', 'contact_num',
        'location', 'country', 'country_code', 'state', 'city', 'description', 'image', 'supervisor_name', 'supervisor_phone', 'supervisor_fax', 'supervisor_email')) {
        if (key == '_id') {
          edit = true;
          formData.append('branch_id', this.branch[key]);
        } else {
          formData.append(key, this.branch[key]);
        }
      }

      let axios = edit ? this.$axios.patch('/api/update_branch_info', formData) : this.$axios.post('/api/submit_branch_info', formData);

      axios.then(response => {
        if (typeof response.data === 'object') {
          for (let i in response.data) {
            let error = response.data[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.$toast.success("Submit successfully");
          this.$emit('submitStatus', true);
        }
        this.submit_loading = false;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
        this.submit_loading = false;
      });
    },
    locationSelected(location) {
      this.branch.location = location.lat + ',' + location.lng;
      this.branch.country = location.country;
      this.branch.country_code = location.country_code;
      this.branch.state = location.state;
      this.branch.city = location.city;
    },
    contactNumEntered(num) {
      this.branch.contact_num = num;
    },
    supervisorNumEntered(num) {
      this.branch.supervisor_phone = num;
    },
    supervisorFaxEntered(num) {
      this.branch.supervisor_fax = num;
    }
  }
}
</script>
