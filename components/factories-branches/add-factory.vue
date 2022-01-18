<template>
  <div class="add-factory">
    <div class="add-factory-inner">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="factoryName"
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
                v-model="contactNumber"
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
                :items="factorySize"
                label="Factory Size"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
            >
              <location-field label="Factory Address" @locationSelected="locationSelected"></location-field>
              <!--              <v-text-field-->
              <!--                v-model="factoryAddress"-->
              <!--                label="Factory Address"-->
              <!--                outlined-->
              <!--                required-->
              <!--              ></v-text-field>-->
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="production"
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
                v-model="qc"
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
                v-model="rd"
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
                v-model="productionLines"
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
                accept="image/*"
                label="Image"
                outlined
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
        </v-container>
      </v-form>
      <div class="add-information-body">
        <div class="add-information-body">
          <v-btn class="add-btn" @click="addFactoryProduct">+ Add Factory Information</v-btn>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <v-btn>Submit</v-btn>
    </div>
  </div>
</template>

<script>
import AnnualProduction from "~/components/factories-branches/annual-production"
import LocationField from "../Form/LocationField";

export default {
  components: {
    AnnualProduction,
    LocationField
  },
  data() {
    return {
      factoryName: '',
      factoryAddress: '',
      contactNumber: null,
      factorySize: [],
      measurementUnitArr: [],
      production: '',
      qc: '',
      rd: '',
      productionLines: '',
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
      productName: '',
      producedUnit: '',
      producedVal: '',
      highestAnnualOutputVal: '',
      highestAnnualOutputUnit: '',
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
      factoryInfo: {
        factory_id: '',
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
        image: '',
      }
    }
  },
  watch: {
    factoryName(val) {
      this.factoryInfo.name = val;
    },
    factoryAddress(val) {
      this.factoryInfo.location = val;
    },
    contactNumber(val) {
      this.factoryInfo.contact_num = val;
    },
    factorySize(val) {
      this.factoryInfo.area_size = val;
    },
    importMarket(val) {
      this.factoryInfo.production_staff_num = val;
    },
    qc(val) {
      this.factoryInfo.qc_staff_num = val;
    },
  },
  async mounted() {
    await this.$axios.post('/api/factory_size',
      {}).then(response => {
      let result = [];
      let item
      console.log("response" + response)
      for (let i in response.data) {
        item = response.data[i].title
        result.push(item)
      }
      this.factorySize = result;
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

    //Get measurement unit list
    await this.$axios.post('/api/measurement_unit',
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

    //Get annual trade value list
    await this.$axios.post('/api/get_annual_trade_values',
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
  methods: {
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
      this.addFactoryProductArr.push({
        product_name: this.productName,
        produced_unit: this.producedUnit,
        produced_val: this.producedVal,
        highest_annual_output_val: this.highestAnnualOutputVal,
        highest_annual_output_unit: this.highestAnnualOutputUnit
      });

      console.log(this.addFactoryProductArr)
      this.productionName = '',
        this.unitsProduced = '',
        this.highestAnnual = '',
        this.measurement = ''
    },
    deleteFactoryProduct(index) {
      this.addFactoryProductArr.splice(index, 1);
    }
  }
}
</script>
