<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="patent">
    <div class="add-information">
      <div class="add-information-header">
        <p>Patents</p>
      </div>
      <v-divider></v-divider>
      <div class="mb-2 add-information-body">
        <v-btn v-if="!showPatentForm" class="primary add-btn" @click="showPatentForm = true">+ Add
          Patent
        </v-btn>
      </div>
      <div class="mb-2 add-information-body">
        <div v-if="showPatentForm" class="add-Patent">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="patent.num"
                    label="No. of Patent "
                    outlined
                  ></v-text-field>

                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="patent.name"
                    label="Patent Name"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    v-model="start_date_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="patent.start_date"
                        label="Start Date"
                        outlined
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="patent.start_date"
                      @input="start_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-file-input
                    v-model="patent.image"
                    class="Patent-image"
                    accept="image/*"
                    label="Image"
                    outlined
                  ></v-file-input>
                </v-col>

                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="patent.description"
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
                  @click="submitPatent">
                  <span v-if="patent._id">Save</span>
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
              <td>Patent name</td>
              <td>Patent num</td>
              <td>Start date</td>
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
              v-for="(item, i) in patents"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.num }}</td>
              <td>{{ item.start_date }}</td>
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
  name:"patent-section",
  data() {
    return {
      showPatentForm: false,
      submit_loading: false,
      loading_data:false,
      patent: {
        name: '',
        num: '',
        start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        image: [],
        description: '',
      },

      patents: [],

      start_date_menu: false,
      deleteConfirmDialog:false,
      delete_loading:false,
      delete_item:null,
      delete_index:null,
    }
  },
  watch: {
    showPatentForm: {
      handler: function (val) {
        if (!val) {
          this.patent = {
            name: '',
            num: '',
            start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            image: [],
            description: ''
          };
        }
      },
      immediate: true
    },
  },
  computed: {
    isDisabled() {
      return !(this.patent.name || this.patent.num || this.patent.image.length > 0 || this.patent.start_date
        || this.patent.description);
    },
  },
  mounted() {
    this.getPatents();
  },
  methods: {
    addPatent() {
      this.showPatentForm = true;
    },
    submitPatent() {
      this.submit_loading=true;

      //Arrange data to form data
      let formData = new FormData()
      for (let key in this.patent) {
        formData.append(key, this.patent[key]);
      }


      this.$axios.$post('/api/submit_patent_info',
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
            this.showPatentForm = false;
            this.getPatents();
            // this.$emit('submitStatus', true);
            this.patent = {}
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
    cancel() {
      this.showPatentForm = false;
    },
    deleteItem() {
      this.delete_loading=true;
      this.$axios.$delete('/api/delete_company_patent',
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
            this.patents.splice(this.delete_index, 1);
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

    getPatents() {
      this.loading_data=true;
      this.$axios.$post('/api/patent_list',
        {company_id: this.$auth.user.company._id}).then(response => {
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
    openDeleteConfirmDialog(item, i) {
      this.deleteConfirmDialog = true;
      this.delete_item = item;
      this.delete_index = i;
    },


  },
}
</script>
