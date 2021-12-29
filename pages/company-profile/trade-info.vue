<template>
  <div class="trade-info">
    <div class="trade-info-inner">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
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
              <v-select
                :items="yofe"
                label="Year of First Export"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
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
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="removeExportMarket(data.item, 'exportMarket')"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.avatar"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
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
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="removeImportMarket(data.item)"
                  >
                    <v-avatar left>
                      <v-img :src="data.item.avatar"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
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
        <v-form v-model="valid">
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
            <v-row>
              <v-col
                class="year-col"
                cols="6"
                md="2"
              >
                <v-select
                  :items="years"
                  label="Year"
                  outlined
                ></v-select>
              </v-col>
              <v-col
                class="description-col"
                cols="10"
                md="8"
              >
                <v-text-field
                  label="Description"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="year-col"
                cols="6"
                md="2"
              >
                <v-select
                  :items="years"
                  label="Year"
                  outlined
                ></v-select>
              </v-col>
              <v-col
                class="description-col"
                cols="10"
                md="8"
              >
                <v-text-field
                  label="Description"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="year-col"
                cols="6"
                md="2"
              >
                <v-select
                  :items="years"
                  label="Year"
                  outlined
                ></v-select>
              </v-col>
              <v-col
                class="description-col"
                cols="10"
                md="8"
              >
                <v-text-field
                  label="Description"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col
                class="btn-group"
                cols="2"
              >
                <v-btn @click="more++">+</v-btn>
              </v-col>
            </v-row>
            <div v-if="more !== 0">
              <v-row v-for="index in more" :key="index">
                <v-col
                  class="year-col"
                  cols="6"
                  md="2"
                >
                  <v-select
                    :items="years"
                    label="Year"
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  class="description-col"
                  cols="10"
                  md="8"
                >
                  <v-text-field
                    label="Description"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="btn-group"
                  cols="2"
                >
                  <v-btn @click="more++">+</v-btn>
                  <v-btn @click="more--">-</v-btn>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const srcs = {
        1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1280px-Flag_of_the_People%27s_Republic_of_China.svg.png',
        2: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png',
        3: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/European_flag%2C_upside_down.svg/2700px-European_flag%2C_upside_down.svg.png',
        4: 'https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg',
        5: 'https://cdn.britannica.com/27/4227-004-32423B42/Flag-South-Africa.jpg',
        6: 'https://s.france24.com/media/display/9697cdea-1f82-11e9-a2c9-005056bff430/w:1280/p:16x9/en-access-asia-web_002.jpg'
      }
      return {
        valid: false,
        leadTime: null,
        addHistory: false,
        radioGroup: 'No',
        ports: [],
        portItems: [],
        more: 0,
        years: [
          '2019',
          '2018',
          '2017',
          '2016',
          '2015',
          '2014',
          '2013'
        ],
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
        ePercentage: [
          '1 ~ 10%',
          '11 ~ 20%',
          '21 ~ 30%',
          '31 ~ 40%',
          '41 ~ 50%',
          '51 ~ 60%',
          '61 ~ 70%',
          '71 ~ 80%',
          '81 ~ 90%',
          '91 ~ 100%'
        ],
        yofe: [
          '2020',
          '2019',
          '2018',
          '2017',
          '2016',
          '2015',
          '2014',
          '2013',
          '2012'
        ],
        annualExport: [
          'Choose not to Disclose',
          'US$ 1 Million ~ US$ 2 Million',
          'US$ 2 Million ~ US$ 5 Million',
          'US$ 5 Million ~ US$ 10 Million',
          'US$ 10 Million ~ US$ 50 Million',
          'US$ 50 Million ~ US$ 100 Million',
          'Above US$ 100 Million'
        ],
        importMarket: [],
        exportMarket: [],
        continents: [
          { name: 'China (Mainland)', avatar: srcs[1] },
          { name: 'Asia', avatar: srcs[6] },
          { name: 'Europe', avatar: srcs[3] },
          { name: 'South America', avatar: srcs[2] },
          { name: 'North America', avatar: srcs[2] },
          { name: 'Australia', avatar: srcs[4] },
          { name: 'Africa', avatar: srcs[5] },
        ]
      }
    },
    watch: {
      ports (val) {
        if (val.length > 3) {
          this.$nextTick(() => this.model.pop())
        }
      },
      radioGroup (val) {
        if (val === 'Yes') {
          this.addHistory = true;
        } else if (val === 'No') {
          this.addHistory = false;
        }
      }
    },
    methods: {
      removeExportMarket (item) {
        const index = this.exportMarket.indexOf(item.name)
        if (index >= 0) this.exportMarket.splice(index, 1)
      },
      removeImportMarket (item) {
        const index = this.importMarket.indexOf(item.name)
        if (index >= 0) this.importMarket.splice(index, 1)
      },
    },
  }
</script>
