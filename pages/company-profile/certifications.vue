<template>
  <div class="certification">
    <div class="add-information">
      <div class="add-information-header">
        <p>Certificates</p>
      </div>
      <v-divider></v-divider>
      <div class="mb-10 add-information-body">
        <v-btn v-show="addCertificateBtn" class="add-btn" @click="addCertificate">+ Add Certificate</v-btn>
      </div>
      <div class="mb-10 add-information-body">
        <div v-show="showCertificateForm" class="add-certificate">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="certificateType"
                    :items="certificateTypeArr"
                    label="Certificate Name"
                    outlined
                    required
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    :items="certificateIssuerArr"
                    label="Certificate Issuer"
                    outlined
                    required
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="certificateInfo.certificate_id"
                    label="Certificate ID"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="certificateInfo.exDate"
                    :rules="exRules"
                    label="Expiry Date"
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-file-input
                    v-model="certificateInfo.image"
                    accept="image/*"
                    label="Image"
                    outlined
                    required
                  ></v-file-input>
                </v-col>

                <v-col
                  cols="12"
                >
                  <v-textarea
                    label="Description"
                    name="description"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
              <div class="btn-container">
                <v-btn @click="submit">Submit</v-btn>
              </div>
            </v-container>
          </v-form>
        </div>
      </div>

      <div class="mb-10">
        <v-data-table
          :headers="headers"
          :items="certificateList"
          sort-by="calories"
          class="elevation-1 certificate-table"
        >

          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >

                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.certificateName"
                            label="certificateName"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.certificateIsuuer"
                            label="certificateIsuuer"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.certificateID"
                            label="certificateID"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.expiryDate"
                            label="expiryDate"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-file-input
                            v-model="editedItem.picture"
                            accept="image/*"
                            label="Image"
                            outlined
                            required
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.picture="{ item }">
            <img :src="require(`~/assets/img/${item.picture}`)" style="width: 50px; height: 40px"/>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>
      </div>
    </div>

  </div>
</template>

<script>
import AddInformation from "~/components/factories-branches/add-information"
import AddCertificate from "~/components/certifications/add-certificate"

export default {
  components: {
    AddInformation,
    AddCertificate
  },
  data() {
    return {
      addCertificateBtn: true,
      showCertificateForm: true,
      certificateType: '',
      exRules: [
        value => {
          /* eslint-disable */
          const pattern = new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{4}');
          return pattern.test(value) || 'Set Date like MM/DD/YYYY'
        }
      ],
      certificateTypeArr: [],
      certificateIssuerArr: [],
      certificateInfo: {
        certificate_type: '',
        certificate_issuer: '',
        certificate_id: '',
        exDate: '',
        image: '',
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Certificate name',
          align: 'start',
          sortable: false,
          value: 'certificateName',
        },
        {text: 'Certificate isuuer', value: 'certificateIsuuer'},
        {text: 'Certificate ID', value: 'certificateID'},
        {text: 'Expiry date', value: 'expiryDate'},
        {text: 'Picture', value: 'picture'},
        {text: 'Description', value: 'description'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      certificateList: [],
      editedIndex: -1,
      editedItem: {
        picture: '',
        certificateName: '',
        certificateIsuuer: '',
        certificateID: '',
        ExpiryDate: '',
      },
      defaultItem: {
        picture: '',
        certificateName: '',
        certificateIsuuer: '',
        certificateID: '',
        ExpiryDate: '',
      },
    }
  },
  created() {
    this.initialize()
  },
  watch: {
    certificateData(val) {
      this.certificateNames.push(val);
      this.form = '';
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  async mounted() {
    await this.getCertificateType()
    await this.getCertificateIssuer()
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  methods: {
    getCertificateType() {
      this.$axios.post('/api/certificate_type',
        {}).then(response => {
        let result = [];
        let item
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.certificateTypeArr = result;
        this.editedItem.certificateName =result;
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
      this.$axios.post('/api/certificate_issuer',
        {}).then(response => {
        let result = [];
        let item
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.certificateIssuerArr = result;
        this.editedItem.certificateIsuuer = result;
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
      this.addCertificateBtn = false;
    },
    submit() {
      // this.$emit('formData', this.certificateName);
      this.certificateList = this.certificateInfo
      this.showCertificateForm = false;
      this.addCertificateBtn = true;
    },
    initialize () {
      this.certificateList = [
        {
          picture: 'poster.png',
          certificateName: 'Example',
          certificateIsuuer: 'Example',
          certificateID: 'Example',
          ExpiryDate: 'Example',
        },
        // {
        //   picture: 'poster.png',
        //   certificateName: 'Example',
        //   certificateIsuuer: 'Example',
        //   certificateID: 'Example',
        //   ExpiryDate: 'Example',
        // },

      ]
    },

    editItem (item) {
      this.editedIndex = this.certificateList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.certificateList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.certificateList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.certificateList[this.editedIndex], this.editedItem)
      } else {
        this.certificateList.push(this.editedItem)
      }
      this.close()
    },
  },


}
</script>
