<template>
  <div>
    <v-simple-table>
      <thead>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        @keyup="searchData()"
      ></v-text-field>
      <tr>
        <th >
          Title
        </th>
        <th >
          Operation
        </th>
      </tr>
      </thead>
      <tbody >
      <tr v-for="(category,index) in categories" :key="index">
        <td>
          {{category.title}}
        </td>
        <td>
          <v-btn icon
                 :to="'/admin/category/'+category._id"
          >
            <v-icon small
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>
          <v-btn icon
                 :to="'/admin/category/edit/'+category._id"
          >
            <v-icon small
                    class="mr-2">mdi-pencil
            </v-icon>
          </v-btn>
<!--          <v-icon-->
<!--            small-->
<!--            @click="deleteItem(category)"-->
<!--          >-->
<!--            mdi-delete-->
<!--          </v-icon>-->
        </td>
      </tr>
      <InfiniteScroll :enough="enough" @load-more="getData()" />

      </tbody>
    </v-simple-table>



  </div>
</template>


<script>
export default {
  middleware: ['auth', 'is_admin'],
  name: "category.vue",
  layout: "admin",
  data() {
    return {
      table_status: 'در حال دریافت اطلاعات',
      search: '',
      //=======infiniteScroll
      enough: false,
      page: 1,
      pageSize: 20,
      //=====================
      categories: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    searchData(){
      this.page=1;
      this.categories=[];
      this.getData();
    },
    async getData() {
      //Get brand list
      let categoryApiURL = `/api/category_list`;
      await this.$axios.$post(categoryApiURL,
        {
            "parent":this.$route.params.id,
          "paginate":true,
          "keyword":this.search,
          "page":this.page++
        }
      ).then(response => {
        if (response)
          this.categories = this.categories.concat(response.data);
        else
          this.table_status = "Not found"
      })
        .catch(e => {
          this.table_status = "Not found"
          console.log('error');
        })
    },
  }
}
</script>

<style scoped>

</style>
