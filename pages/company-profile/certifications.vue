<template>
  <div class="certification">
    <div class="add-information">
      <div class="add-information-header">
        <p>Certificates</p>
      </div>
      <v-divider></v-divider>
      <div class="add-information-body">
        <div class="add-certificate">
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
            </v-container>
          </v-form>
        </div>
      </div>
      <v-btn class="add-btn" @click="add">+ Add Certificate</v-btn>
    </div>
    <div class="btn-container">
      <v-btn @click="submit">Submit</v-btn>
    </div>
  <!--    <AddInformation-->
  <!--      :type="certificates"-->
  <!--      :names="certificateNames"-->
  <!--      @add="form = 'certificate'"-->
  <!--      @newNames="certificateNames = $event"></AddInformation>-->
  <!--    <AddCertificate-->
  <!--      v-if="form === 'certificate'"-->
  <!--      @formData="certificateData = $event"-->
  <!--    ></AddCertificate>-->
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
      // form: '',
      // certificateData: '',
      // certificateNames: [],
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
      }
    }
  },
  watch: {
    certificateData(val) {
      this.certificateNames.push(val);
      this.form = '';
    },
  },
  async mounted() {
    await this.getCertificateType ()
    await this.getCertificateIssuer ()
  },
  methods: {
    getCertificateType () {
      this.$axios.post('/api/certificate_type',
        {}).then(response => {
        let result = [];
        let item
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.certificateTypeArr = result;
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
    getCertificateIssuer () {
      this.$axios.post('/api/certificate_issuer',
        {}).then(response => {
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
    submit() {
      this.$emit('formData', this.certificateName);
    }
  }
}
</script>
