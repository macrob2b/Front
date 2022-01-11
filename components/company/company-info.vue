<template>
  <div class="company-info">
    <div class="company-info-header">
      <p>Company info</p>
    </div>
    <v-divider></v-divider>
    <div class="company-info-body">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="companyname"
                :rules="nameRules"
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
                :items="BusinessItems"
                label="Business name"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="businessloc"
                label="Business Location"
                append-icon="mdi-crosshairs-gps"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="d-flex"
              cols="12"
              md="4"
            >
              <v-select
                :items="countryItems"
                label="Country/Region"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="state"
                label="State/Province"
                required
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
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-textarea
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
                v-model="employeesTotal"
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
                v-model="revenue"
                label="Annual Revenue"
                :rules="revenueRules"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              md="4"
            >
              <v-select
                :items="establishedItems"
                label="Year Established"
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        companyname: '',
        businessloc: '',
        employeesTotal: '',
        revenue: '',
        state: '',
        city: '',
        nameRules: [
          name => !!name || 'name is required'
        ],
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
        BusinessItems: [
          'item1',
          'item2',
          'item3'
        ],
        countryItems: [
          'item1',
          'item2',
          'item3'
        ],
        establishedItems: [
          'item1',
          'item2',
          'item3'
        ],
        companyInfo: {
          company_name: '',
          business_type: '',
          location: '',
          street_address: '',
          phone: '',
          employees_total: ''
        }
      }
    },
    watch: {
      employeesTotal(val) {
        this.employeesTotal = this.spilitter(val);
        this.companyInfo.employees_total = this.employeesTotal();
        // this.$emit('updateData', this.companyInfo.employees_total)
      },
      revenue(val) {
        this.revenue = this.spilitter(val);
      },
      $data: {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data)
        },
        deep: true
      }
    },
    methods: {
      spilitter(val) {
        val = val.replace(/,/g, '');
        const str = val.toString().split(".");
        return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
  }
</script>
