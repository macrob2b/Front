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
              <v-text-field
                v-model="branch.contact_num"
                :rules="contactRules"
                label="Contact Number"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
            >
              <location-field
                v-model="branch.location"
                label="Branch Address"
                @locationSelected="locationSelected" />
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
                        label="Supervisor"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="branch.supervisor_phone"
                        :rules="phoneRules"
                        label="Phone"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="branch.supervisor_fax"
                        :rules="faxRules"
                        label="Fax"
                        outlined
                      ></v-text-field>
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
      <div class="btn-container">
        <v-btn :disabled="isLoading || isDisabled" @click="submit">
            <span v-if="branch._id">Save</span>
            <span v-else>Submit</span>
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
    props: ['value', 'activeBranch'],
    components: {
      LocationField
    },
    computed: {
      isDisabled () {
        return !(
            this.branch.name ||
            this.branch.contact_num ||
            this.branch.location ||
            this.branch.description ||
            this.branch.image.length > 0 ||
            this.branch.supervisor_name ||
            this.branch.supervisor_phone ||
            this.branch.supervisor_fax ||
            this.branch.supervisor_email
          );
      },
    },
    data() {
      return {
        isLoading: false,
        branch: null,
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
    watch: {
      activeBranch: {
        handler: function(val) {
          this.branch = val;
        },
        immediate: true
      },
    },
    methods: {
      submit() {
        // this.$emit('formData', this.branch);
        
        let formData = new FormData()
        this.isLoading = true;

        let edit = false;
        for (let key in _.pick(this.branch, '_id', 'name', 'contact_num', 'location', 'description', 'image', 'supervisor_name', 'supervisor_phone', 'supervisor_fax', 'supervisor_email')) {
            if(key == '_id') {
              edit = true;
              formData.append('branch_id', this.branch[key]);
            } else {
              formData.append(key, this.branch[key]);
            }
        }
        
        let axios = edit ? this.$axios.patch('/api/update_branch_info', formData) : this.$axios.post('/api/submit_branch_info', formData);

        axios.then(response => {
          this.isLoading = false;
          if(typeof response.data === 'object') {
            for(let i in response.data) {
              let error = response.data[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
              this.$emit('reloadBranches', (reloaded, parent) => {
                this.isLoading = false;
                this.$emit('input', false);
              });
          }
        }).catch(({response}) => {
          this.isLoading = false;
          if (response.status == 401) {
            this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
          } else if (response.status == 500 || response.status == 504) {
            this.$toast.error(this.$t(`REQUEST_FAILED`));
          }
        });
      },
      locationSelected(location) {
        this.branch.location = location.lat + ',' + location.lng;
      },
    }
  }
</script>
