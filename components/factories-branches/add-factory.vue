<template>
  <div class="add-factory">
    <div class="add-factory-inner">
      <v-form v-model="valid">
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
              <v-text-field
                v-model="factoryAddress"
                label="Factory Address"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="production"
                label="No. of Production Staff"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="qc"
                label="No. of QC Staff"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="rd"
                label="No. of R&D Staff"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="productionLines"
                label="No. of Production Lines"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="annual"
                label="Annual Output Value"
                outlined
              ></v-select>
            </v-col>

            <v-col
              cols="12"
            >
              <AnnualProduction></AnnualProduction>
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
        </v-container>
      </v-form>
      <div class="btn-container">
        <v-btn @click="submit">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import AnnualProduction from "~/components/factories-branches/annual-production"
  export default {
    components: {
      AnnualProduction
    },
    data() {
      return {
        valid: false,
        factoryName: '',
        factoryAddress: '',
        contactNumber: null,
        factorySize: [
          'Below 1,000 square meters',
          '1,000~4,000 square meters',
          '4,000~6,000 square meters',
          '6,000~10,000 square meters',
          '10,000~30,000 square meters',
          '30,000~50,000 square meters',
          '50,000~100,000 square meters',
          'Above 100,000 square meters'
        ],
        production: [
          'Less than 5 people',
          '5~10 people',
          '11~30 people',
          '31~60 people',
          '61~100 people',
          'Above 100 people'
        ],
        qc: [
          'Less than 5 people',
          '5~10 people',
          '11~30 people',
          '31~60 people',
          '61~100 people',
          'Above 100 people'
        ],
        rd: [
          'Less than 5 people',
          '5~10 people',
          '11~30 people',
          '31~60 people',
          '61~100 people',
          'Above 100 people'
        ],
        productionLines: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          'Above 10'
        ],
        annual: [
          'Below US$ 1 Million',
          'US$ 1 million ~ US$ 2 Million',
          'US$ 2 million ~ US$ 5 Million',
          'US$ 5 million ~ US$ 10 Million',
          'US$ 10 million ~ US$ 50 Million',
          'US$ 50 million ~ US$ 100 Million',
          'Above US$ 100 Million'
        ],
        contactRules: [
          value => {
            const pattern = /^[0-9]*$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ]
      }
    },
    methods: {
      submit() {
        this.$emit('formData', this.factoryName);
      }
    }
  }
</script>
