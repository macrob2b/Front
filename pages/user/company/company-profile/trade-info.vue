<template>
  <v-row class="mt-12 mb-12" v-if="!loaded">
    <v-col cols="12" class="text-center">
      <v-progress-circular
        :size="50"
        :width="5"
        color="orange"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
  <v-row v-else class="trade-info">
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
                  :loading="ePercentage_loading"
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
                  :loading="annualExport_loading"
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
                  :loading="market_loading"
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
                  :loading="market_loading"
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
                  <v-radio-group v-model="tradeInfo.has_history">
                    <v-radio
                      v-for="index in yesno"
                      :key="index"
                      :label="`${index}`"
                      :value="index"
                    ></v-radio>
                  </v-radio-group>
                </div>
                <div v-if="tradeInfo.has_history==='Yes'" class="company-history">
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
                        <v-btn
                          fab
                          dark
                          color="red"
                          small
                          v-if="!(tradeInfo.history_by_year.length===1 && index===0)"

                          @click="deleteHistory(index)">
                          <v-icon dark>
                            mdi-minus
                          </v-icon>
                        </v-btn>
                        <v-btn
                          small
                          dark
                          fab v-if="index===(tradeInfo.history_by_year.length-1)"
                          color="green"
                          @click="addNewHistory">
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
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
              :loading="update_loading"
              @click="submitTradeInfo"

            >
              Update
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
      loaded: false,
      update_loading: false,
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
      ePercentage_loading: false,
      yearFExport: '',
      yearFExportRule: [
        value => {
          if (!isNaN(parseInt(value)) && value >= 1900 && value <= new Date().getFullYear()) return true;
          return 'The year entered must be after 1900 to the present year';
        },
      ],
      annualExportSelected: '',
      annualExport: [],
      annualExport_loading: false,
      continents: [],
      market_loading: false,
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
        has_history: 'No',
        history_introduction: '',
        history_by_year: [
          {year: '', describe: ''},
          {year: '', describe: ''},
          {year: '', describe: ''},
        ]
      }
    }
  },
  watch: {
    'tradeInfo.nearest_port': {
      handler: function (val) {
        if (val && val.length > 3) {
          this.$nextTick(() => this.tradeInfo.nearest_port.pop())
        }
      },
    },
    'tradeInfo.has_history': {
      handler: function (val) {
        console.log(val);
      },
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
      this.tradeInfo.history_by_year.push({year: '', describe: ''});
    },
    deleteHistory(index) {
      this.tradeInfo.history_by_year.splice(index, 1);
    },
    async getAnnualTradeValues() {
      this.annualExport_loading = true;
      // Get get_annual_trade_values
      await this.$axios.$post('/api/get_annual_trade_values')
        .then(response => {
          this.annualExport = response;
          this.annualExport_loading = false;
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

          this.annualExport_loading = false;
        });
    },
    async getExportPercentageList() {
      this.ePercentage_loading = true;
      await this.$axios.$post('/api/export_percentage_list')
        .then(response => {
          this.ePercentage = response;
          this.ePercentage_loading = false;
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
          this.ePercentage_loading = false;
        });
    },
    async getCountryList() {
      this.market_loading = true;
      await this.$axios.$post('/api/search_country')
        .then(response => {
          this.continents = response;
          this.market_loading = false;
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
          this.market_loading = false;
        });
    },

    submitTradeInfo() {
      this.update_loading = true;
      this.$axios.$post('/api/update_company_trade_info', this.tradeInfo)
        .then(response => {
          this.update_loading = false;
          window.scrollTo(0, 0)
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

        this.update_loading = false;
        window.scrollTo(0, 0);
      });
    },
    async setTradeData() {
      this.tradeInfo.export_percentage = this.companyLoadedInfo.export_percentage;
      this.tradeInfo.nearest_port = this.companyLoadedInfo.nearest_port;
      this.tradeInfo.avg_lead_time = this.companyLoadedInfo.avg_lead_time;
      this.tradeInfo.first_export_year = this.companyLoadedInfo.first_export_year;
      this.tradeInfo.annual_export_value = this.companyLoadedInfo.annual_export_value;
      this.tradeInfo.annual_import_value = this.companyLoadedInfo.annual_import_value;
      this.tradeInfo.export_market = this.companyLoadedInfo.export_market;
      this.tradeInfo.import_market = this.companyLoadedInfo.import_market;
      this.tradeInfo.has_history = this.companyLoadedInfo.has_history;
      this.tradeInfo.history_introduction = this.companyLoadedInfo.history_introduction;


      if (this.companyLoadedInfo.history_by_year && this.companyLoadedInfo.history_by_year)
        this.tradeInfo.history_by_year = this.companyLoadedInfo.history_by_year;
    },

  },


}
</script>
