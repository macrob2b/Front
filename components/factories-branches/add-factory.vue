<template>
  <div class="add-factory-inner">
    <div class="add-factory">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="factoryInfo.name"
                label="Factory Name"
                outlined
                required
              ></v-text-field>
            </v-col>


            <v-col
              cols="12"
              md="4"
            >
              <phone-number-input @numberEntered="phoneNumberEntered" label="Contact Number"
                                  :phone="factoryInfo.contact_num"></phone-number-input>
            </v-col>


            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                v-model="factoryInfo.area_size"
                :items="factorySizeArr"
                item-text="title"
                item-value="_id"
                label="Factory Size"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
            >
              <location-field v-model="factoryInfo.location" label="Factory Address"
                              @locationSelected="locationSelected"></location-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="factoryInfo.production_staff_num"
                label="No. of Production Staff"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="factoryInfo.qc_staff_num"
                label="No. of QC Staff"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="factoryInfo.rd_staff_num"
                label="No. of R&D Staff"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="factoryInfo.production_line_num"
                label="No. of Production Lines"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                v-model="factoryInfo.annual_output_val"
                :items="annualArr"
                item-text="title"
                item-value="_id"
                label="Annual Output Value"
                outlined
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-file-input
                v-model="factoryInfo.image"
                class="factory-image"
                accept="image/*"
                label="Image"
                outlined
                @change="uploadImage"
              ></v-file-input>
            </v-col>
          </v-row>
          <!--product capacity-->
          <div class="annual-production">
            <div class="annual-production-header my-8">
              <p>Annual Production Capacity</p>
            </div>
            <v-divider></v-divider>
            <v-row v-for="(item, index) in factoryInfo.annual_production_capacity" :key="index"
                   class="mb-5 rounded-lg grey lighten-2">
              <v-col
                class="btn-group"
                cols="2"
              >
                <v-btn
                  dark
                  color="red"
                  v-if="!(factoryInfo.annual_production_capacity.length===1 && index===0)"
                  @click="deleteFactoryProduct(index)">
                  <v-icon>mdi-trash-can</v-icon>
                  Delete
                </v-btn>

              </v-col>
              <v-col
                cols="12"
              >
                <div class="annual-production">
                  <div class="annual-production-body">
                    <v-form>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                          >
                            <v-text-field
                              v-model="item.product_name"
                              label="Production Name"
                              outlined
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="item.produced_val"
                              label="Units Produced(Previous Year)"
                              outlined
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-select
                              v-model="item.produced_unit"
                              :items="measurementUnitArr"
                              label="Unit of measurement"
                              outlined
                            ></v-select>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="item.highest_annual_output_val"
                              :rules="annualRules"
                              label="Highest Ever Annual Output"
                              outlined
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-select
                              v-model="item.highest_annual_output_unit"
                              :items="measurementUnitArr"
                              label="Unit of measurement"
                              outlined
                            ></v-select>
                          </v-col>

                        </v-row>
                      </v-container>
                    </v-form>
                  </div>
                </div>
              </v-col>

            </v-row>

            <v-row class="my-6 text-center">
              <v-col
                class="btn-group"
                cols="12"
              >

                <v-btn @click="addFactoryProduct">
                  <v-icon>mdi-plus</v-icon>
                  Add another annual production capacity
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>

          <div>
            <v-btn
              class="primary"
              :loading="submit_loading"
              @click="saveFactory">
              <span v-if="factoryInfo._id">Save</span>
              <span v-else>Submit</span>
            </v-btn>
            <v-btn
              @click="$emit('input', false)"
              outlined
              color="default"
            >
              cancel
            </v-btn>
          </div>
        </v-container>
      </v-form>
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
  data() {
    return {
      submit_loading: false,


      showSave: false,
      showCancel: false,
      factorySizeArr: [],
      measurementUnitArr: [],

      annualArr: [],
      contactRules: [
        value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],

      annualRules: [
        value => {
          const pattern = /^[-,0-9]+$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      factoryInfo: {
        name: '',
        location: '',
        country: '',
        country_code: '',
        state: '',
        city: '',
        contact_num: '',
        area_size: '',
        production_staff_num: '',
        qc_staff_num: '',
        rd_staff_num: '',
        production_line_num: '',
        annual_output_val: '',
        annual_production_capacity: [{
          product_name: '',
          produced_unit: '',
          produced_val: '',
          highest_annual_output_val: '',
          highest_annual_output_unit: ''
        }],
        image: null,
      },
    }
  },
  watch: {
    // defaultFactoryInfo: {
    //   handler: function(val) {
    //     this.factoryInfo = val;
    //   },
    //   immediate: true
    // },
    // $data: {
    //   handler: function(val) {
    //     this.$emit('value', val.factoryInfo)
    //   },
    //   deep: true
    // }
  },
  // computed: {
  //
  // },
  async mounted() {
    await this.getFactorySize()
    //Get measurement unit list
    await this.getMeasurementUnit()
    //Get annual trade value list
    await this.getAnnualTradeValues()
  },
  methods: {
    getFactorySize() {
      this.$axios.$post('/api/factory_size').then(response => {
        this.factorySizeArr = response;
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
    getMeasurementUnit() {
      this.$axios.post('/api/measurement_unit',
        {}).then(response => {
        let result = [];
        let item;
        console.log("response" + response)
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.measurementUnitArr = result;
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
    getAnnualTradeValues() {
      this.$axios.$post('/api/get_annual_trade_values')
        .then(response => {
          this.annualArr = response;
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
    locationSelected(location) {
      this.factoryInfo.location = location.lat + ',' + location.lng;
      this.factoryInfo.country = location.country;
      this.factoryInfo.country_code = location.country_code;
      this.factoryInfo.state = location.state;
      this.factoryInfo.city = location.city;
    },
    spilitter(val) {
      val = val.replace(/,/g, '');
      const str = val.toString().split(".");
      return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addFactoryProduct() {
      this.factoryInfo.annual_production_capacity.push({
        product_name: '',
        produced_unit: '',
        produced_val: '',
        highest_annual_output_val: '',
        highest_annual_output_unit: ''
      });
    },
    deleteFactoryProduct(index) {
      this.factoryInfo.annual_production_capacity.splice(index, 1);
    },
    addFactory() {
      this.showFactoryForm = true;
    },
    saveFactory() {
      let formData = new FormData()
      this.submit_loading = true;

      let endPoint = '/api/submit_factory_info';
      for (let key in _.pick(this.factoryInfo, '_id', 'name', 'location','country','country_code','state','city','contact_num', 'area_size', 'production_staff_num', 'qc_staff_num', 'rd_staff_num', 'production_line_num', 'annual_output_val', 'annual_production_capacity', 'image')) {
        if (key == '_id') {
          endPoint = '/api/update_factory_info';
          formData.append('factory_id', this.factoryInfo[key]);
        } else {
          if (key === 'annual_production_capacity') {
            for (let j in this.factoryInfo[key]) {
              for (let y in this.factoryInfo[key][j]) {
                let apc = this.factoryInfo[key][j][y];
                formData.append('annual_production_capacity[' + j.toString() + '][' + y.toString() + ']', apc);
              }
            }
          } else {
            formData.append(key, this.factoryInfo[key]);
          }
        }
      }

      this.$axios.post(endPoint, formData).then(response => {
        this.submit_loading = false;
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
        this.submit_loading = false;
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
    },
    editItem(item, index) {
      this.editedItem = item;
      this.editedIndex = index;
      this.showFactoryForm = true
      this.factoryInfo = Object.assign({}, item);
      this.showSave = true
      this.showCancel = true
    },
    save() {
      Object.assign(this.factoryInfoDataTable[this.editedIndex], this.factoryInfo)
      this.showFactoryForm = false;
      this.showSave = false
      this.showCancel = false
      this.factoryInfo = {}
    },
    cancel() {
      Object.assign(this.factoryInfoDataTable[this.editedIndex], this.editedItem)
      this.showFactoryForm = false;
      this.showSave = false
      this.showCancel = false
      this.factoryInfo = {}
    },
    deleteItem(item, index) {
      console.log(JSON.stringify(item))
      this.factoryInfoDataTable.splice(index, 1)
    },
    deleteItemConfirm() {
      this.factoryInfoDataTable.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    async uploadImage(e) {
      return;
      let a = (await this.getFile(e)).base64StringFile;
      var d1 = document.querySelector('.factory-image');
      d1.insertAdjacentHTML('beforeend', '<img  src="data:image/png;base64,' + a + '">');

      this.factoryInfo.image = a;
    },
    //take a single JavaScript File object
    getFile(file) {
      let reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new Error("Error parsing file"));
        }
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
    phoneNumberEntered(phoneEntered) {
      this.factoryInfo.contact_num = phoneEntered
    },
  }
}
</script>
