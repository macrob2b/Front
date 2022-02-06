<template>
  <div class="trade-info">
    <div class="trade-info-inner">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                v-model="tradeInfo.export_percentage"
                :items="ePercentage"
                label="Export Percentage"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
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
              sm="4"
            >
              <v-select
                v-model="annualExportSelected"
                :items="annualExport"
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
                v-model="leadTime"
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
                v-model="ports"
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
                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
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
              sm="6"
            >
              <v-autocomplete
                v-model="exportMarket"
                :items="continents"
                chips
                label="Export Market"
                item-text="name"
                item-value="name"
                multiple
                outlined
              >
              </v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                v-model="importMarket"
                :items="continents"
                chips
                label="Import Market"
                item-text="name"
                item-value="name"
                multiple
                outlined
              >
              </v-autocomplete>
            </v-col>
          </v-row>
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
        </v-container>
      </v-form>
    </div>
    <div v-if="addHistory" class="company-history">
      <div class="company-history-header">
        <p>Company History Introduction</p>
      </div>
      <v-divider></v-divider>
      <div class="company-history-body">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-textarea
                  outlined
                  name="history"
                  label="Company History Introduction"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row v-for="(item, index) in historyByYear" :key="index">
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
                  v-model="item.description"
                  label="Description"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                class="btn-group"
                cols="2"
              >
                <v-btn @click="deleteHistory(index)">-</v-btn>
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
                class="btn-group"
                cols="2"
              >
                <v-btn @click="addNewHistory">+</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        leadTime: '',
        addHistory: false,
        radioGroup: 'No',
        ports: [],
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
        ePercentageSelected: '',
        ePercentage: [],
        yearFExport: '',
        yearFExportRule: [
          value => {
            if (!value || !value.trim()) return true;
            if (!isNaN(parseInt(value)) && value >= 1900 && value <= new Date().getFullYear()) return true;
            return 'The year entered must be after 1900 to the present year';
          },
        ],
        annualExportSelected: '',
        annualExport: [],
        importMarket: [],
        exportMarket: [],
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
        historyByYear: [
          {year: '', description: ''},
          {year: '', description: ''},
        ],
        tradeInfo: {
          export_percentage: '',
          nearest_port: '',
          avg_lead_time: [],
          first_export_year: '',
          annual_export_value: '',
          annual_import_value: '',
          export_market: '',
          import_market: '',
          history_introduction: '',
          history_by_year: []
        }
      }
    },
    watch: {
      ports (val) {
        if (val.length > 3) {
          this.$nextTick(() => this.model.pop())
        }
        this.tradeInfo.nearest_port = val;
        // alert(val)
      },
      radioGroup (val) {
        if (val === 'Yes') {
          this.addHistory = true;
        } else if (val === 'No') {
          this.addHistory = false;
        }
      }
    },

    async mounted() {
      await this.getAnnualTradeValues();
      // Get export_percentage_list
      await this.$axios.post('/api/export_percentage_list',
        {}).then(response => {
        let result=[];
        let item
        for(let i in  response.data){
          item = response.data[i].title
          result.push(item)
        }
        this.ePercentage = result;
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

      // Get country list for import market & export market
      await this.$axios.post('/api/search_country',
        {}).then(response => {
        let result=[];
        let item
        for(let i in  response.data){
          item = response.data[i].title
          result.push(item)
        }
        this.continents = result;
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
      addNewHistory() {
        this.historyByYear.push({year: this.year, description: this.description});
        this.tradeInfo.history_by_year = this.historyByYear;
        this.year = '';
        this.description = '';
      },
      deleteHistory(index) {
        this.historyByYear.splice(index, 1);
        this.tradeInfo.history_by_year = this.historyByYear;
      },
      getAnnualTradeValues() {
        // Get get_annual_trade_values
        return this.$axios.post('/api/get_annual_trade_values',
          {}).then(response => {
          let result=[];
          let item
          for(let i in  response.data){
            item = response.data[i].title
            result.push(item)
          }
          this.annualExport = result;
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
      }
      // removeExportMarket (item) {
      //   const index = this.exportMarket.indexOf(item.name)
      //   if (index >= 0) this.exportMarket.splice(index, 1)
      // },
      // removeImportMarket (item) {
      //   const index = this.importMarket.indexOf(item.name)
      //   if (index >= 0) this.importMarket.splice(index, 1)
      // },
    },
  }
</script>
