<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="trademark">
    <div class="add-information">
      <div class="add-information-header">
        <p>Trademarks</p>
      </div>
      <v-divider></v-divider>
      <div class="mb-2 add-information-body">
        <v-btn v-if="!showTrademarkForm" class="primary add-btn" @click="showTrademarkForm = true">+ Add
          Trademark
        </v-btn>
      </div>
      <div class="mb-2 add-information-body">
        <div v-if="showTrademarkForm" class="add-Trademark">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="trademark.registration_no"
                    label="Registration/Filing No"
                    outlined
                  >

                  </v-text-field>
                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="trademark.name"
                    label="Trademark Name"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
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
                        v-model="trademark.start_date"
                        label="Start Date"
                        outlined
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="trademark.start_date"
                      @input="start_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-menu
                    v-model="end_date_menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="trademark.end_date"
                        label="End Date"
                        outlined
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="trademark.end_date"
                      @input="end_date_menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>


                <v-col
                  cols="12"
                  md="4"
                >
                  <v-file-input
                    v-model="trademark.image"
                    class="Trademark-image"
                    accept="image/*"
                    label="Image"
                    outlined
                  ></v-file-input>
                </v-col>

                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="trademark.description"
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
                  @click="submitTrademark">
                  <span >Submit</span>
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
              <td>Trademark name</td>
              <td>Registration/Filing No</td>
              <td>End date</td>
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
              v-for="(item, i) in Trademarks"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.registration_no }}</td>
              <td>{{ item.end_date }}</td>
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
  name: "trademark-section",
  data() {
    return {
      showTrademarkForm: false,
      submit_loading: false,
      loading_data: false,
      TrademarkImage: null,
      trademark: {
        registration_no: '',
        name: '',
        start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        end_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        image: [],
        description: '',
      },

      Trademarks: [],

      start_date_menu: false,
      end_date_menu: false,
      deleteConfirmDialog: false,
      delete_loading: false,
      delete_item: null,
      delete_index: null,
    }
  },
  watch: {
    showTrademarkForm: {
      handler: function (val) {
        if (!val) {
          this.trademark = {
            registration_no: '',
            name: '',
            start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            end_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      return !(this.trademark.name || this.trademark.registration_no || this.trademark.start_date
              || this.trademark.end_date|| this.trademark.image.length > 0 || this.trademark.description);
    },
  },
  mounted() {
    this.getTrademarks();
  },
  methods: {
    addTrademark() {
      this.showTrademarkForm = true;
    },
    submitTrademark() {
      this.submit_loading = true;

      //Arrange data to form data
      let formData = new FormData()
      for (let key in this.trademark) {
        formData.append(key, this.trademark[key]);
      }


      this.$axios.$post('/api/submit_trademark_info',
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
            this.showTrademarkForm = false;
            this.getTrademarks();
            // this.$emit('submitStatus', true);
            this.trademark = {}
          }

          this.submit_loading = false;
          window.scrollTo(0, 0);
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 400) {
          this.$toast.error('Bad Request');
        } else if (response.status == 403) {
          this.$toast.error('Forbidden');
        } else if (response.status == 404) {
          this.$toast.error('Not found');
        }
        this.submit_loading = false;
      })
    },
    editItem(item, index) {
      this.editedIndex = index;
      this.showTrademarkForm = true
      this.trademark = Object.assign({}, item);
    },
    cancel() {
      this.showTrademarkForm = false;
    },
    deleteItem() {
      this.delete_loading = true;
      this.$axios.$delete('/api/delete_company_trademark',
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
            this.Trademarks.splice(this.delete_index, 1);
            this.delete_loading = false;
            this.deleteConfirmDialog = false;
          }
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
        this.delete_loading = false;
        this.deleteConfirmDialog = false;
      });
    },

    getTrademarks() {
      this.loading_data = true;
      this.$axios.$post('/api/trademark_list',
        {company_id: this.$auth.user.company._id}).then(response => {
        this.Trademarks = response;
        this.loading_data = false;
      }).catch(({response}) => {
        func(false, this);
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
        this.loading_data = false;
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
