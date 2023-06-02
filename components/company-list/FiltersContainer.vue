<template>
  <div class=" mr-6">

    <!--Markets filter-->
      <v-container
        fluid
        id="scroll-target"
        style="max-height: 100%"
        class="overflow-y-auto filter-container"
      >
        <v-row
          v-scroll:#scroll-target="onScroll"
          align="center"
          justify="center"
          style="height: 510px;overflow-x: hidden"
        >
          <!--Markets filter-->
          <v-col cols="12">
            <h3>Markets</h3>
            <v-divider class="mb-3"/>
            <v-checkbox v-for="item in markets"
                        v-model="filterForm.market"
                        :label="item"
                        :value="item"
                        hide-details="true"
                        multiple
                        class="small"
            />
          </v-col>

          <!--Employees filter-->
          <v-col cols="12">
            <h3>Employees</h3>
            <div>
              <v-radio-group
                v-model="filterForm.employee"
              >
                <v-radio v-for="item in employees"
                         :label="item"
                         :value="item"
                         hide-details="true"
                         multiple
                         class="small"
                />
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
      </v-container>

    <!--    <FilterItems type="text" title="Total Revenue" :list="['filterOne','filterTwo','filterThree','filterFour']"/>-->
    <!--    <FilterItems type="checkbox" title="Certification" :list="['filterOne','filterTwo','filterThree','filterFour']"/>-->

  </div>
</template>

<script>
import FilterItems from "./FilterItems";

export default {
  name: "FilterContainer",
  auth: false,
  components: {
    FilterItems
  },
  data() {
    return {
      scrollInvoked:0,
      markets: [],
      employees:[
        'All',
        '1-5',
        '6-10',
        '11-50',
        '51-100',
        '101-500',
        '501-1000',
        'Above 1000',
      ],
      filterForm:{
        market:[],
        employee:'All'
      }
    }
  },
  mounted() {
    this.getMarkets();
  },
  watch:{
    filterForm:{
      handler(val,old_val){
       this.$emit('filterChanged',val)
      },
      deep:true
    }
  },
  methods: {
    onScroll() {
      this.scrollInvoked++
    },
    getMarkets() {
      this.$axios.$post('/api/company_country_filter')
        .then(response => {
          this.markets = response;
        }).catch(error => {
        console.log('error load on markets')
      });
    }
  }
}
</script>


<style scoped>
.v-input--selection-controls {
  margin-top: 0 !important;
}

.v-list-item--dense .v-list-item__content, .v-list--dense .v-list-item .v-list-item__content {
  padding: 0 !important;
}
.v-list-item--dense, .v-list--dense .v-list-item{
  min-height: unset;
  padding: 2px 0;
}
.filter-container{
  /*max-height: calc(100vh - 150px);*/
  overflow: auto;
}

</style>
