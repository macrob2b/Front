<template>
  <div class="company-info">
    <div class="company-info-header">
      <p>Company info</p>
    </div>
    <v-divider></v-divider>
    <div class="company-info-body">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="company_name"
                label="Company name"
                append-icon="mdi-pencil"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              md="4"
            >
              <v-select
                v-model="business_type"
                :items="bussinessTypeArr"
                label="Business type"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <location-field
                v-model="address"
                label="Business Location"
                @locationSelected="locationSelected"
              ></location-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="d-flex"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="country"
                label="Country/Region"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="state"
                label="State/Province"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="city"
                label="City"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-textarea
                v-model="description"
                outlined
                name="input-7-4"
                label="Company Description"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="employees_total"
                label="Employees Total"
                :rules="totalRules"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="annual_revenue"
                label="Annual Revenue"
                :rules="revenueRules"
                append-icon="mdi-currency-usd"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="year_established"
                type="number"
                label="Year Established"
                :rules="yearEstablishedRule"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
  import LocationField from "../Form/LocationField";

  export default {
    props:['serverData'],
    components: {LocationField},
    data() {
      return {
        company_name: '',
        business_type: '',
        address:'',
        country: '',
        state: '',
        city: '',
        description: '',
        employees_total: '',
        annual_revenue: '',
        location_name: '',
        country_code: '',
        totalRules: [
          value => {
            const pattern = /^[-,0-9]+$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ],
        revenueRules: [
          value => {
            const pattern = /^[-,0-9]+$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ],
        bussinessTypeArr: [],
        year_established: '',
        yearEstablishedRule: [
          value => {
            if (!value.trim()) return true;
            if (!isNaN(parseInt(value)) && value >= 1900 && value <= new    Date().getFullYear()) return true;
            return 'The year entered must be after 1900 to the present year';
          },
        ],
      }
    },
    watch: {
      employees_total(val) {
        this.employees_total = this.spilitter(val);
      },
      revenue(val) {
        this.revenue = this.spilitter(val);
      },
      $data: {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data)
        },
        deep: true
      },
      serverData: {
        handler: function(val, oldVal) {
          for(let i in val) {
            if(this.$data.hasOwnProperty(i)) {
              this[i] = val[i] ?? ''
            }
          }
        },
        deep: true
      }
    },
    async mounted() {
      await this.$axios.post('/api/business_type',
        {}).then(response => {
        let result=[];
        let item
        for(let i in  response.data){
          item = response.data[i].title
          result.push(item)
        }
        this.bussinessTypeArr = result;
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
    },
    methods: {
      spilitter(val) {
        val = val.replace(/,/g, '');
        const str = val.toString().split(".");
        return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      locationSelected(location) {
        this.country = location.country;
        this.state = location.state;
        this.city = location.city;
        this.country_code = location.country_code;
        this.location_name = location.name;
      }
    },
  }
</script>
