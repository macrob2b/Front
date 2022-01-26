<template>
  <div class="add-factory">
    <div class="add-information-body">
      <v-btn v-show="addFactoryBtn" class="add-btn" @click="addFactory">+ Add Factory Information</v-btn>
    </div>
    <div class="add-factory-inner">
      <div v-show="showFactoryForm" class="add-factory">
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
                <v-text-field
                  v-model="factoryInfo.contact_num"
                  :rules="contactRules"
                  label="Contact Number"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                sm="4"
              >
                <v-select
                  v-model="factoryInfo.area_size"
                  :items="factorySizeArr"
                  label="Factory Size"
                  outlined
                ></v-select>
              </v-col>

              <v-col
                cols="12"
              >
                <location-field v-model="factoryInfo.location" label="Factory Address" @locationSelected="locationSelected"></location-field>
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
            <div class="annual-production-header my-8">
              <p>Annual Production Capacity</p>
            </div>
            <v-divider></v-divider>
            <v-row v-for="(item, index) in factoryProductArr" :key="index" class="mb-5 rounded-lg grey lighten-2">
              <v-col
                class="btn-group"
                cols="2"
              >
                <v-btn @click="remove(index)">
                  <v-icon>mdi-trash-can</v-icon>
                  delete
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
                              v-model="item.productName"
                              label="Production Name"
                              outlined
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-text-field
                              v-model="item.unitsProduced"
                              label="Units Produced(Previous Year)"
                              outlined
                            ></v-text-field>
                          </v-col>

                          <v-col
                            cols="12"
                            md="6"
                          >
                            <v-select
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
                              v-model="item.highestAnnual"
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
            <v-row>
              <v-col
                cols="12"
              >
                <div class="add-information-body">
                  <v-btn class="add-btn" @click="addFactoryProduct">+ Add another annual production capacity</v-btn>
                </div>
              </v-col>
            </v-row>
            <div class="btn-container">
              <v-btn
                v-show="showSubmit"
                :disabled="isDisabled"
                @click="submitAddFactory">
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
      <div class="mb-10">
        <v-data-table
          :headers="headers"
          :items="factoryInfoDataTable"
          class="elevation-1 factory-table"
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
              <td>{{ item.location }}</td>
              <td>{{ item.contact_num }}</td>
              <td>{{ item.area_size }}</td>
              <td>{{ item.production_staff_num }}<td>
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
import AnnualProduction from "~/components/factories-branches/annual-production"
import LocationField from "../Form/LocationField";

export default {
  props: ['value'],
  components: {
    AnnualProduction,
    LocationField
  },
  data() {
    return {
      addFactoryBtn: true,
      showFactoryForm: false,
      showSubmit: true,
      showSave: false,
      showCancel: false,
      // factoryName: '',
      // factoryAddress: '',
      // contactNumber: null,
      factorySizeArr: [],
      measurementUnitArr: [],
      // production: '',
      // qc: '',
      // rd: '',
      // productionLines: '',
      annualArr: [],
      contactRules: [
        value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      factoryProductArr: [
        {
          productName: '',
          unitsProduced: '',
          measurement: '',
          highestAnnual: '',
          UnitMeasurement: '',
        }
      ],
      // productName: '',
      // producedUnit: '',
      // producedVal: '',
      // highestAnnualOutputVal: '',
      // highestAnnualOutputUnit: '',
      annualRules: [
        value => {
          const pattern = /^[-,0-9]+$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      annualProductionCapacity: [
        {
          product_name: '',
          produced_unit: '',
          produced_val: '',
          highest_annual_output_val: '',
          highest_annual_output_unit: ''
        },
      ],
      headers: [
        {
          text: 'Factory name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Factory location', value: 'location'},
        {text: 'contact_num', value: 'contact_num'},
        {text: 'factory size', value: 'area_size'},
        {text: 'production staff num', value: 'production_staff_num'},
        {text: 'Actions', value: 'actions', sortable: false},
      ],
      factoryInfoDataTable:[],
      factoryInfo: {
        name: '',
        location: '',
        contact_num: '',
        area_size: '',
        production_staff_num: '',
        qc_staff_num: '',
        rd_staff_num: '',
        production_line_num: '',
        annual_output_val: '',
        annual_production_capacity: [],
        image: null,
      },
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.factoryInfo = val;
      },
      immediate: true
    },
    $data: {
      handler: function(val) {
        this.$emit('value', val.factoryInfo)
      },
      deep: true
    }
  },
  computed: {
    isDisabled () {
      return !(this.factoryInfo.name || this.factoryInfo.location || this.factoryInfo.contact_num || this.factoryInfo.area_size || this.factoryInfo.production_staff_num || this.factoryInfo.qc_staff_num || this.factoryInfo.rd_staff_num || this.factoryInfo.production_line_num || this.factoryInfo.annual_output_val || this.factoryInfo.annual_production_capacity || this.factoryInfo.image );
    },
  },
  async mounted() {
    await this.getFactorySize()
    //Get measurement unit list
    await this.getMeasurementUnit()
    //Get annual trade value list
    await this.getAnnualTradeValues()
  },
  methods: {
    getFactorySize() {
      this.$axios.post('/api/factory_size',
        {}).then(response => {
        let result = [];
        let item
        console.log("response" + response)
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.factorySizeArr = result;
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
      this.$axios.post('/api/get_annual_trade_values',
        {}).then(response => {
        let result = [];
        let item;
        for (let i in response.data) {
          item = response.data[i].title
          result.push(item)
        }
        this.annualArr = result;
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
      this.factoryInfo.location = location.country_code;
      alert(this.factoryInfo.location)
    },
    spilitter(val) {
      val = val.replace(/,/g, '');
      const str = val.toString().split(".");
      return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    //
    addFactoryProduct() {
      alert(JSON.stringify(this.factoryProductArr))
      // {product_name: '', produced_unit: '', produced_val:'', highest_annual_output_val:'', highest_annual_output_unit: ''},

    },
    deleteFactoryProduct(index) {
      this.addFactoryProductArr.splice(index, 1);
    },
    addFactory() {
      this.showFactoryForm = true;
      this.addFactoryBtn = false;
    },
    submitAddFactory() {
      this.factoryInfoDataTable.push(Object.assign({}, this.factoryInfo))
      // this.submitFactory();
      console.log("f" +
        "actoryInfo:" + JSON.stringify(this.factoryInfo))
      console.log("factoryInfoDataTable:" + JSON.stringify(this.factoryInfoDataTable))

      this.factoryInfo = {};
      this.showFactoryForm = false;
      this.addFactoryBtn = true;

    },
    editItem(item, index) {
      this.editedItem = item;
      this.editedIndex = index;
      this.showFactoryForm = true
      this.factoryInfo = Object.assign({}, item);
      this.showSubmit = false
      this.showSave = true
      this.showCancel = true
    },
    save() {
      Object.assign(this.factoryInfoDataTable[this.editedIndex], this.factoryInfo)
      this.showFactoryForm = false;
      this.addFactoryBtn = true;
      this.showSubmit = true
      this.showSave = false
      this.showCancel = false
      this.factoryInfo = {}
    },
    cancel() {
      Object.assign(this.factoryInfoDataTable[this.editedIndex], this.editedItem)
      this.showFactoryForm = false;
      this.addFactoryBtn = true;
      this.showSubmit = true
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
    }
  }
}
</script>
