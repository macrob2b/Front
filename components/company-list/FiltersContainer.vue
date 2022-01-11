<template>
  <v-block>

    <FilterItems type="checkbox" title="Markets" :list="['filterOne','filterTwo','filterThree','filterFour']"/>
    <FilterItems type="text" title="Total Revenue" :list="['filterOne','filterTwo','filterThree','filterFour']"/>
    <FilterItems type="checkbox" title="Certification" :list="['filterOne','filterTwo','filterThree','filterFour']"/>
    <FilterItems type="checkbox" title="Employees" :list="['filterOne','filterTwo','filterThree','filterFour']"/>

  </v-block>
</template>

<script>
  import FilterItems from "./FilterItems";

  export default {
    name: "FilterContainer",
    auth: false,
    components: {
      FilterItems
    }
  }
</script>
