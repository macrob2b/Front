<template>
  <div class="sort-companies">

    <v-row class="d-flex items-center">
      <v-col cols="4" lg="2" class="pt-1 px-0">
        <v-select
          :items="items"
          item-value="value"
          item-text="title"
          v-model="sortForm.register_date"
          label="Sortby register date"
          outlined
          dense
          hide-details
        ></v-select>
      </v-col>
      <v-col lg="6"></v-col>
      <v-col lg="4">
<!--        <div class="search-bar-detail my-5 mx-0">-->
<!--          <div class="grid-section d-flex align-center justify-end">-->
<!--            <v-tabs-->
<!--              v-model="tabs"-->
<!--              class="tabs"-->
<!--            >-->
<!--              <v-tab-->
<!--                class="tab"-->
<!--              >-->
<!--                <v-icon>mdi-border-all</v-icon>-->
<!--              </v-tab>-->
<!--              <v-tab-->
<!--                class="tab"-->
<!--              >-->
<!--                <v-icon>mdi-format-list-bulleted</v-icon>-->
<!--              </v-tab>-->
<!--            </v-tabs>-->
<!--          </div>-->
<!--        </div>-->
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name: "SortCompanies",
  data() {
    return {
      user_role: [],
      items: [
        {title: 'Ascending', value: 'asc'},
        {title: 'Descending', value: 'desc'}
      ],
      sortForm: {
        register_date: 'desc'
      }
    }
  },
  watch: {
    sortForm: {
      handler(val, old_val) {
        this.$emit('sortChanged', val)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.sort-companies {
  border-bottom: 1px solid #eee;
  padding: 10px;
}
</style>
