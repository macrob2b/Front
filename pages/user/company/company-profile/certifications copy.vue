<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="certification">
    <div class="add-information">
      <div class="add-information-header">
        <p>Certificates</p>
      </div>
      <v-divider></v-divider>
      <div class="mb-10 add-information-body">
        <v-btn v-if="addCertificateBtn" class="primary add-btn" @click="addCertificate">+ Add Certificate</v-btn>
      </div>
      <div class="mb-10 add-information-body">
        <div v-if="showCertificateForm" class="add-certificate">
          <v-form>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="certificateInfo.name"
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
                    v-model="certificateInfo.issuer"
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
                    v-model="certificateInfo.identify_num"
                    label="Certificate ID"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="certificateInfo.expiry_date"
                    :rules="exRules"
                    label="Expiry Date"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-file-input
                    v-model="certificateInfo.image"
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
                    v-model="certificateInfo.description"
                    label="Description"
                    name="description"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
              <div class="btn-container">
                <v-btn
                  v-show="showSubmit"
                  :disabled="isDisabled"
                  @click="submit">
                  Submit
                </v-btn>
                <v-btn
                  v-show="showSave"
                  @click="save"
                >
                  Save
                </v-btn>
                <v-btn
                  v-show="showCancel"
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
        <v-data-table
          :headers="headers"
          :items="certificateList"
          class="elevation-1 certificate-table"
        >
          <template
            v-slot:body="{ items }"
          >
            <tbody>
            <tr
              v-for="(item, i) in items"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.issuer }}</td>
              <td>{{ item.identify_num }}</td>
              <td>{{ item.expiry_date }}</td>
              <td class="certificate-table-image">
                <img :src="`data:image/png;base64,` + item.image" style="width: 50px; height: 40px">
              </td>
              <td>
                <p class="certificate-description">{{ item.description }}</p></td>
              <td>
                <v-icon
                  class="mr-2"
                  small
                  @click="editItem(item,i)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item,i)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </tr>
            </tbody>
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
      showCertificateForm: false,
      showSubmit: true,
      showSave: false,
      showCancel: false,
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
      certificateImage: null,
      certificateInfo: {
        name: '',
        issuer: '',
        identify_num: '',
        expiry_date: '',
        image: null,
        description: '',
        index: null
      },
      headers: [
        {
          text: 'Certificate name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Certificate isuuer', value: 'certificate_isuuer'},
        {text: 'Certificate ID', value: 'identify_num'},
        {text: 'Expiry date', value: 'expiry_date'},
        {text: 'Picture', value: 'image'},
        {text: 'Description', value: 'description'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      certificateList: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        issuer: '',
        identify_num: '',
        expiry_date: '',
        image: null,
        description: '',
        index: null
      },
    }
  },
  // created() {
  //   this.initialize()
  // },
  computed: {
    isDisabled () {
      return !(this.certificateInfo.name || this.certificateInfo.issuer || this.certificateInfo.identify_num || this.certificateInfo.image || this.certificateInfo.expiry_date || this.certificateInfo.description);
    },
  },
  async mounted() {
    await this.getCertificateType()
    await this.getCertificateIssuer()
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
      this.certificateList.push(Object.assign({}, this.certificateInfo))
      this.submitCertificate();
      console.log("certificateInfo:" + JSON.stringify(this.certificateInfo))
      console.log("certificateList:" + JSON.stringify(this.certificateList))

      // this.certificateInfo.name = ''
      // this.certificateInfo.issuer = ''
      // this.certificateInfo.identify_num = ''
      // this.certificateInfo.image = null
      // this.certificateInfo.expiry_date = ''
      // this.certificateInfo.description = ''
      this.showCertificateForm = false;
      this.addCertificateBtn = true;
      this.certificateInfo = {}

    },
    editItem(item, index) {
      this.editedItem = item;
      this.editedIndex = index;
      this.showCertificateForm = true
      this.certificateInfo = Object.assign({}, item);
      this.showSubmit= false
      this.showSave= true
      this.showCancel= true
    },
    save() {
      Object.assign(this.certificateList[this.editedIndex], this.certificateInfo)
      this.showCertificateForm = false;
      this.addCertificateBtn = true;
      this.showSubmit= true
      this.showSave= false
      this.showCancel= false
      this.certificateInfo.name = ''
      this.certificateInfo.issuer = ''
      this.certificateInfo.identify_num = ''
      this.certificateInfo.image = null
      this.certificateInfo.expiry_date = ''
      this.certificateInfo.description = ''
    },
    cancel() {
      Object.assign(this.certificateList[this.editedIndex], this.editedItem)
      this.showCertificateForm = false;
      this.addCertificateBtn = true;
      this.showSubmit= true
      this.showSave= false
      this.showCancel= false
      this.certificateInfo.name = ''
      this.certificateInfo.issuer = ''
      this.certificateInfo.identify_num = ''
      this.certificateInfo.image = null
      this.certificateInfo.expiry_date = ''
      this.certificateInfo.description = ''
    },
    deleteItem(item, index) {
      console.log(JSON.stringify(item))
      this.certificateList.splice(index, 1)
    },
    deleteItemConfirm() {
      this.certificateList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    async uploadImage(e) {
      let a = (await this.getFile(e)).base64StringFile;
      var d1 = document.querySelector('.certificate-image');
      d1.insertAdjacentHTML('beforeend', '<img  src="data:image/png;base64,' + a +'">');

      this.certificateInfo.image = a;
    },
    //take a single JavaScript File object
    getFile(file) {
      let reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file"));}
        reader.onload = function () {

          //This will result in an array that will be recognized by C#.NET WebApi as a byte[]
          let bytes = Array.from(new Uint8Array(this.result));

          //if you want the base64encoded file you would use the below line:
          let base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(""));

          //Resolve the promise with your custom file structure
          resolve({
            bytes: bytes,
            base64StringFile: base64StringFile,
            fileName: file.name,
            fileType: file.type
          });
        }
        reader.readAsArrayBuffer(file);
      });
    },

    async submitCertificate() {
     await (this.$axios.post('/api/submit_certification_info',
        this.certificateInfo).then(response => {
        console.log("response" + JSON.stringify(response) );

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
      })
     );
    }
  },
}
</script>
