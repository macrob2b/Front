<template>
  <div class="annual-production">
    <div class="annual-production-header my-8">
      <p>Annual Production Capacity</p>
    </div>
    <v-divider></v-divider>
    <v-row v-for="(item, index) in annualProductions" :key="index" class="mb-5 rounded-lg grey lighten-2">
      <v-col
        class="btn-group"
        cols="2"
      >
        <v-btn @click="deleteFactoryProduct(index)">
          <v-icon>mdi-trash-can</v-icon>
          delete
        </v-btn>

        <v-btn @click="addFactoryProduct" color="primary">
          <v-icon>mdi-plus</v-icon>
          Add
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
                      v-model="item.product_name"
                      label="Production Name"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="item.produced_val"
                      label="Units Produced(Previous Year)"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="item.produced_unit"
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
                      v-model="item.highest_annual_output_val"
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
                      v-model="item.highest_annual_output_unit"
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
  </div>
</template>

<script>
  export default {
    props: ['value', 'measurementUnitArr', 'annualRules'],
    data() {
      return {
        annualProductions: [],
        annualProductionCapacity: {
          product_name: '',
          produced_unit: '',
          produced_val: '',
          highest_annual_output_val: '',
          highest_annual_output_unit: ''
        },
      }
    },
    watch: {
      value: {
        handler: function(val) {
          // this.annualProductions = Array.isArray(val) ? val : [];
          this.annualProductions = val;
        },
        immediate: true
      }
    },
    methods: {
      addFactoryProduct() {
        this.annualProductions.push(Object.assign({}, this.annualProductionCapacity));
        this.$emit('input', this.annualProductions);
        this.annualProductionCapacity = {
          product_name: '',
          produced_unit: '',
          produced_val: '',
          highest_annual_output_val: '',
          highest_annual_output_unit: ''
        };
      },
      deleteFactoryProduct(index) {
        this.annualProductions.splice(index, 1);
        this.$emit('input', this.annualProductions);
      },
    },
  }
</script>
