<template>
  <div class="annual-production">
    <div class="annual-production-header">
      <p>Annual Production Capacity</p>
    </div>
    <v-divider></v-divider>
    <div class="annual-production-body">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="productionName"
                label="Production Name"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="unitsProduced"
                label="Units Produced(Previous Year)"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                :items="measurement"
                label="Unit of measurement"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="highestAnnual"
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
                :items="measurement"
                label="Unit of measurement"
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
        productionName: '',
        unitsProduced: '',
        highestAnnual: null,
        measurement: [
          'Acre',
          'Ampere',
          'Bag',
          'Barrel'
        ],
        annualRules: [
          value => {
            const pattern = /^[-,0-9]+$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ]
      }
    },
    watch: {
      highestAnnual (val) {
        this.highestAnnual = this.spilitter(val);
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
