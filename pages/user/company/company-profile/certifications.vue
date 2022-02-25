<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="certification">
    <div class="add-information">
      <div class="add-information-header">
        <p>Certificates</p>
      </div>
      <v-divider></v-divider>
      <div class="mb-2 add-information-body">
        <v-btn v-if="!showCertificateForm" class="primary add-btn" @click="showCertificateForm = true">+ Add
          Certificate
        </v-btn>
      </div>
      <div class="mb-2 add-information-body">
        <div v-if="showCertificateForm" class="add-certificate">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="cert.name"
                    :items="certificateTypeArr"
                    item-text="title"
                    item-value="title"
                    label="Certificate Name"
                    outlined
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="cert.issuer"
                    :items="certificateIssuerArr"
                    label="Certificate Issuer"
                    outlined
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="cert.identify_num"
                    label="Certificate ID"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    v-model="exp_data_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="cert.expiry_date"
                        label="Expiry Date"
                        outlined
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="cert.expiry_date"
                      @input="exp_data_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-file-input
                    v-model="cert.image"
                    class="certificate-image"
                    accept="image/*"
                    label="Image"
                    outlined
                    @change="uploadImage"
                  ></v-file-input>
                </v-col>

                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="cert.description"
                    label="Description"
                    name="description"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
              <div>
                <v-btn
                  :disabled="isDisabled"
                  class="primary"
                  :loading="submit_loading"
                  @click="submitCertificate">
                  <span v-if="cert._id">Save</span>
                  <span v-else>Submit</span>
                </v-btn>
                <v-btn
                  @click="cancel"
                  outlined
                  class="cancelBtn"
                >
                  cancel
                </v-btn>
              </div>
            </v-container>
          </v-form>
        </div>
      </div>

      <div class="mb-10">
        <v-simple-table
        >
          <template v-slot:default>

          <thead>
            <tr>
              <td>Certificate name</td>
              <td>Certificate issuer</td>
              <td>Expiry date</td>
              <td>Actions</td>
            </tr>
            </thead>
            <tbody>
            <tr class="mt-12 mb-12" v-if="loading_data">
              <td colspan="5" class="text-center">
                <v-progress-circular
                  class="mt-4"
                  :size="30"
                  :width="3"
                  color="orange"
                  indeterminate
                ></v-progress-circular>
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, i) in certificates"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.issuer }}</td>
              <td>{{ item.expiry_date }}</td>
              <td>
<!--                <v-icon-->
<!--                  small-->
<!--                  @click="editItem(item,i)"-->
<!--                >-->
<!--                  mdi-pencil-->
<!--                </v-icon>-->
               <v-btn
               icon
               color="error"
               >
                 <v-icon
                   small
                   @click="openDeleteConfirmDialog(item, i)"
                 >
                   mdi-delete
                 </v-icon>
               </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>


      <v-dialog
        v-model="deleteConfirmDialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Are you sure?
          </v-card-title>

          <v-card-text>
            Click AGREE if you are sure
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              @click="deleteConfirmDialog = false"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              :loading="delete_loading"
              @click="deleteItem()"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showCertificateForm: false,
      submit_loading: false,
      loading_data:false,
      certificateType: '',
      certificateTypeArr: [],
      certificateIssuerArr: [],
      certificateImage: null,
      cert: {
        name: '',
        issuer: '',
        identify_num: '',
        expiry_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        image: [],
        description: '',
      },

      certificates: [],

      exp_data_menu: false,
      deleteConfirmDialog:false,
      delete_loading:false,
      delete_item:null,
      delete_index:null,
    }
  },
  watch: {
    showCertificateForm: {
      handler: function (val) {
        if (!val) {
          this.cert = {
            name: '',
            issuer: '',
            identify_num: '',
            expiry_date: '',
            image: [],
            description: '',
          };
        }
      },
      immediate: true
    },
  },
  computed: {
    isDisabled() {
      return !(this.cert.name || this.cert.issuer || this.cert.identify_num || this.cert.image.length > 0 || this.cert.expiry_date || this.cert.description);
    },
  },
  mounted() {
    this.getCertificateType()
    this.getCertificateIssuer();
    this.getCertificates();
  },
  methods: {
    getCertificateType() {
      this.$axios.post('/api/certificate_type',
        {}).then(response => {
        this.certificateTypeArr = response.data;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 400) {
          this.$toast.error(this.$t(`Bad Request`));
        } else if (response.status == 403) {
          this.$toast.error(this.$t(`Forbidden`));
        } else if (response.status == 404) {
          this.$toast.error(this.$t(`not found`));
        }
      });
    },
    getCertificateIssuer() {
      this.$axios.post('/api/certificate_issuer', {}).then(response => {
        let result = [];
        let item
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.certificateIssuerArr = result;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 400) {
          this.$toast.error(this.$t(`Bad Request`));
        } else if (response.status == 403) {
          this.$toast.error(this.$t(`Forbidden`));
        } else if (response.status == 404) {
          this.$toast.error(this.$t(`not found`));
        }
      });
    },
    addCertificate() {
      this.showCertificateForm = true;
    },
    submitCertificate() {
      this.submit_loading=true;

      //Arrange data to form data
      let formData = new FormData()
      for (let key in this.cert) {
        formData.append(key, this.cert[key]);
      }


      this.$axios.$post('/api/submit_certification_info',
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          if (typeof response === 'object') {
            for (let i in response) {
              let error = response[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.$toast.success("Submit successfully");
            this.submit_loading = false;
            this.showCertificateForm = false;
            this.getCertificates();
            // this.$emit('submitStatus', true);
            this.cert = {}
          }

          this.submit_loading=false;
          window.scrollTo(0,0);
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 400) {
          this.$toast.error(this.$t(`Bad Request`));
        } else if (response.status == 403) {
          this.$toast.error(this.$t(`Forbidden`));
        } else if (response.status == 404) {
          this.$toast.error(this.$t(`not found`));
        }
        this.submit_loading=false;
      })
    },
    editItem(item, index) {
      this.editedIndex = index;
      this.showCertificateForm = true
      this.cert = Object.assign({}, item);
    },
    cancel() {
      this.showCertificateForm = false;
    },
    deleteItem() {
      this.delete_loading=true;
      this.$axios.$delete('/api/delete_company_certification',
        {
          params:
            {id: this.delete_item._id}
        })
        .then(response => {
          if (typeof response.data === 'object') {
            for (let i in response.data) {
              let error = response.data[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.$toast.success("Deleted successfully");
            this.certificates.splice(this.delete_index, 1);
            this.delete_loading=false;
            this.deleteConfirmDialog=false;
          }
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
        this.delete_loading=false;
        this.deleteConfirmDialog=false;
      });
    },

    getCertificates() {
      this.loading_data=true;
      this.$axios.$post('/api/certification_list',
        {company_id: this.$auth.user.company._id}).then(response => {
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
    openDeleteConfirmDialog(item, i) {
      this.deleteConfirmDialog = true;
      this.delete_item = item;
      this.delete_index = i;
    },


  },
}
</script>
