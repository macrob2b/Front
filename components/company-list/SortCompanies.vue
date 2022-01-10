<template>
  <div class="sort-companies">
    <v-row class="d-flex items-center">
      <v-col cols="auto" class="px-0">
        <v-checkbox
          v-model="enabled"
          hide-details
          class="shrink mr-2 mt-0"
          label="Supplier"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="auto" class="px-0">
        <v-checkbox
          v-model="enabled"
          hide-details
          class="shrink mr-2 mt-0"
          label="Trade Assurance"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col cols="4" lg="2" class="pt-1 px-0">
        <v-select
          :items="items"
          label="SortBy"
          outlined
          dense
          hide-details
        ></v-select>
      </v-col>

    </v-row>
  </div>
</template>

<script>
  export default {
    name: "SortCompanies",
    data() {
      return {
        items: ['Best Match', 'Ascending', 'descending', 'all'],
      }
    }
  }
</script>
<style scoped>
  .sort-companies{
    border-bottom: 1px solid #eee;
    padding: 10px;
  }
</style>
