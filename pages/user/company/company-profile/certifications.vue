<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="certification">
    <div class="add-information">
      <div class="add-information-header">
        <p>Certificates</p>
      </div>
      <v-divider></v-divider>
      <div class="mb-10 add-information-body">
        <v-btn v-if="!showCertificateForm" class="add-btn" @click="showCertificateForm = true">+ Add Certificate</v-btn>
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
                  md="6"
                >
                  <v-text-field
                    v-model="cert.expiry_date"
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
              <div class="btn-container">
                <v-btn
                  :disabled="isDisabled"
                  @click="submit">
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
        <v-data-table
          :headers="headers"
          :items="certificates"
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
export default {
  data() {
    return {
      showCertificateForm: false,
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
      cert: {
        name: '',
        issuer: '',
        identify_num: '',
        expiry_date: '',
        image: [],
        description: '',
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
      certificates: [],
    }
  },
  watch: {
    showCertificateForm: {
      handler: function(val) {
        if(!val) {
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
    isDisabled () {
      return !(this.cert.name || this.cert.issuer || this.cert.identify_num || this.cert.image.length > 0 || this.cert.expiry_date || this.cert.description);
    },
  },
  mounted() {
    this.getCertificateType()
    this.getCertificateIssuer()
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
    submit() {
      this.certificates.push(Object.assign({}, this.cert))

      this.$axios.post('/api/submit_certification_info', this.cert).then(response => {
        console.log("response" + JSON.stringify(response) );
        console.log("cert:" + JSON.stringify(this.cert))
        console.log("certificates:" + JSON.stringify(this.certificates))

        this.showCertificateForm = false;
        this.cert = {}
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

    },
    editItem(item, index) {
      this.editedIndex = index;
      this.showCertificateForm = true
      this.cert = Object.assign({}, item);
    },
    save() {
      Object.assign(this.certificates[this.editedIndex], this.cert)
      this.showCertificateForm = false;
      this.cert.name = ''
      this.cert.issuer = ''
      this.cert.identify_num = ''
      this.cert.image = []
      this.cert.expiry_date = ''
      this.cert.description = ''
    },
    cancel() {
      this.showCertificateForm = false;
    },
    deleteItem(item, index) {
      console.log(JSON.stringify(item))
      this.certificates.splice(index, 1)
    },
    deleteItemConfirm() {
      this.certificates.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    async uploadImage(e) {
      return;
      let a = (await this.getFile(e)).base64StringFile;
      var d1 = document.querySelector('.certificate-image');
      d1.insertAdjacentHTML('beforeend', '<img  src="data:image/png;base64,' + a +'">');

      this.cert.image = a;
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
    }
  },
}
</script>
