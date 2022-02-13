<template>
  <v-row class="trade-info">
    <v-col cols="12">
      <div class="trade-info-inner">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-select
                  v-model="tradeInfo.export_percentage"
                  :items="ePercentage"
                  item-text="title"
                  item-value="_id"
                  label="Export Percentage"
                  outlined
                ></v-select>
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="tradeInfo.first_export_year"
                  type="number"
                  label="Year of First Export"
                  :rules="yearFExportRule"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                md="4"
              >
                <v-select
                  v-model="tradeInfo.annual_export_value"
                  :items="annualExport"
                  item-text="title"
                  item-value="_id"
                  label="Annual Export Value (USD)"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="tradeInfo.avg_lead_time"
                  :rules="leadTimeRules"
                  hint="Please enter the average production time. Numbers only."
                  class="leadTime"
                  label="Average Lead Time"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <!--            eslint-disable-->
              <v-col
                cols="12"
                md="8"
              >
                <v-combobox
                  v-model="tradeInfo.nearest_port"
                  :items="portItems"
                  :search-input.sync="search"
                  hide-selected
                  hint="Maximum of 3 tags"
                  label="Nearest Port"
                  multiple
                  outlined
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new
                          one
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="tradeInfo.export_market"
                  :items="continents"
                  label="Export Market"
                  item-text="title"
                  item-value="title"
                  multiple
                  outlined
                >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="tradeInfo.import_market"
                  :items="continents"
                  label="Import Market"
                  item-text="title"
                  item-value="title"
                  multiple
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row class="mb-3">
              <v-col cols="12">
                <div class="add-history">
                  <p>Add Company History</p>
                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      v-for="index in yesno"
                      :key="index"
                      :label="`${index}`"
                      :value="index"
                    ></v-radio>
                  </v-radio-group>
                </div>
                <div v-if="addHistory" class="company-history">
                  <div class="company-history-header">
                    <p>Company History Introduction</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="company-history-body">
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <v-textarea
                          v-model="tradeInfo.history_introduction"
                          outlined
                          name="history"
                          label="Company History Introduction"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row v-for="(item, index) in tradeInfo.history_by_year" :key="index">
                      <v-col
                        class="year-col"
                        cols="6"
                        md="2"
                      >
                        <v-text-field
                          v-model.number="item.year"
                          type="number"
                          label="Year"
                          :rules="yearFExportRule"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        class="description-col"
                        cols="10"
                        md="8"
                      >
                        <v-text-field
                          v-model="item.describe"
                          label="Description"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="2"
                      >
                        <v-btn class="primary" @click="deleteHistory(index)">-</v-btn>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col
                        class="year-col"
                        cols="6"
                        md="2"
                      >
                        <v-text-field
                          v-model="year"
                          type="number"
                          label="Year"
                          :rules="yearFExportRule"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        class="description-col"
                        cols="10"
                        md="8"
                      >
                        <v-text-field
                          v-model="description"
                          label="Description"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="2"
                      >
                        <v-btn
                          class="primary" @click="addNewHistory">+
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-btn
              class="submit"
              color="primary"
              @click="submitTradeInfo"

            >
              Update
            </v-btn>

            <v-btn
              outlined
            >
              Cancel
            </v-btn>
          </v-container>
        </v-form>
      </div>

    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['companyLoadedInfo'],
  data() {
    return {
      loaded:false,
      addHistory: false,
      radioGroup: 'No',
      portItems: [],
      more: 0,
      search: null,
      leadTimeRules: [
        value => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || 'Invalid value.'
        },
      ],
      yesno: [
        'No',
        'Yes'
      ],
      ePercentage: [],
      yearFExport: '',
      yearFExportRule: [
        value => {
          if (!isNaN(parseInt(value)) && value >= 1900 && value <= new Date().getFullYear()) return true;
          return 'The year entered must be after 1900 to the present year';
        },
      ],
      annualExportSelected: '',
      annualExport: [],
      continents: [],
      year: null,
      description: null,
      yearCompanyHistoryRule: [
        value => {
          if (!value || !value.trim()) return true;
          if (!isNaN(parseInt(value)) && value >= 1900 && value <= new Date().getFullYear()) return true;
          return 'The year entered must be after 1900 to the present year';
        }
      ],
      tradeInfo: {
        export_percentage: '',
        nearest_port: [],
        avg_lead_time: '',
        first_export_year: '',
        annual_export_value: '',
        annual_import_value: '',
        export_market: [],
        import_market: [],
        history_introduction: '',
        history_by_year: [
          {year: '', describe: ''},
          {year: '', describe: ''},
        ]
      }
    }
  },
  watch: {
    'tradeInfo.nearest_port': {
      handler: function (val) {
        if (val.length > 3) {
          this.$nextTick(() => this.tradeInfo.nearest_port.pop())
        }
      },
    },
    radioGroup(val) {
      if (val === 'Yes') {
        this.addHistory = true;
      } else if (val === 'No') {
        this.addHistory = false;
      }
    },
    tradeInfo: {
      handler: function (val, oldVal) {
        this.$emit('updateTradeInfoData', this.tradeInfo)
      },
      deep: true
    },
    companyLoadedInfo(val) {
      if (val.length !== 0 && this.loaded === false) {
        this.setTradeData();
        this.loaded = true;
      }
    }
  },

  async mounted() {
    this.getAnnualTradeValues();
    // // Get export_percentage_list
    this.getExportPercentageList();
    // // Get country list for import market & export market
    this.getCountryList();
  },

  methods: {
    addNewHistory() {
      this.tradeInfo.history_by_year.push({year: this.year, description: this.description});
      this.year = '';
      this.description = '';
      console.log("tradeInfo: " + this.tradeInfo)
    },
    deleteHistory(index) {
      this.tradeInfo.history_by_year.splice(index, 1);
    },
    async getAnnualTradeValues() {
      // Get get_annual_trade_values
      await this.$axios.$post('/api/get_annual_trade_values')
        .then(response => {
          this.annualExport = response;
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
    async getExportPercentageList() {
      await this.$axios.$post('/api/export_percentage_list')
        .then(response => {
          this.ePercentage = response;
          console.log('ttyyyyyy', response.data)
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
    async getCountryList() {
      await this.$axios.$post('/api/search_country')
        .then(response => {
          this.continents = response;
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

    submitTradeInfo() {
      this.$axios.$post('/api/update_company_trade_info', this.tradeInfo)
        .then(response => {
          if (response.length == 0)
            this.$toast.success("Update data successfully");
          else
            this.$toast.error("Please fill required fields");
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
    async setTradeData() {
      this.tradeInfo.export_percentage=this.companyLoadedInfo.export_percentage;
      this.tradeInfo.nearest_port=this.companyLoadedInfo.nearest_port;
      this.tradeInfo.avg_lead_time=this.companyLoadedInfo.avg_lead_time;
      this.tradeInfo.first_export_year=this.companyLoadedInfo.first_export_year;
      this.tradeInfo.annual_export_value=this.companyLoadedInfo.annual_export_value;
      this.tradeInfo.annual_import_value=this.companyLoadedInfo.annual_import_value;
      this.tradeInfo.export_market=this.companyLoadedInfo.export_market;
      this.tradeInfo.import_market=this.companyLoadedInfo.import_market;
      this.tradeInfo.history_introduction=this.companyLoadedInfo.history_introduction;
    },

  },


}
</script>
