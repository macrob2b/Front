<template>
  <div>
    <h1>{{ cat_list_title }}</h1>
    <hr>
    <v-app-bar
    >


      <v-spacer></v-spacer>


      <v-col cols="10">
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          @keyup="searchData()"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-btn
          @click="goBack()"
          class="mx-2"
          fab
          dark
          small
          color="pink"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>

        </v-btn>

        <v-btn
          :to="'/admin/category/add/'+new_item_parent"
          class="mx-2"
          fab
          dark
          small
          color="teal"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>

        </v-btn>
      </v-col>


    </v-app-bar>
    <v-simple-table>
      <thead>
      <tr>
        <th>
          Title
        </th>
        <th>
          Operation
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(category,index) in categories" :key="index">
        <td>
          {{ category.title }}
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
          <v-btn icon
                 @click="deleteCate(category._id)"
          >
            <v-icon small
                    class="mr-2">mdi-delete
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
      <InfiniteScroll :enough="enough" @load-more="getData()"/>

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
      table_status: 'Loading information ...',
      search: '',
      //=======infiniteScroll
      enough: false,
      page: 1,
      pageSize: 20,
      //=====================
      categories: [],
      cat_list_title: null,

      //To create new item button
      new_item_parent: null
    }
  },
  mounted() {
    if (this.$route.params.id)
      this.getCatListTitle();
    else
      this.cat_list_title='Main categories';
    this.getData();
    if (this.$route.params.id != undefined)
      this.new_item_parent = this.$route.params.id;
  },
  methods: {
    searchData() {
      this.page = 1;
      this.categories = [];
      this.getData();
    },
    async getData() {
      //Get brand list
      let categoryApiURL = `/api/category_list`;
      await this.$axios.$post(categoryApiURL,
        {
          "parent": this.$route.params.id,
          "paginate": true,
          "keyword": this.search,
          "page": this.page++
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
    getCatListTitle() {
      const response = this.$axios.$post('/api/find_category',
        {id: this.$route.params.id}).then(response => {
        this.cat_list_title = response.title;
      }).catch(e => {
        this.$toast.error('Error on updating');

      });
    },
    deleteCate(cat_id) {
      const response = this.$axios.$delete('/api/delete_category',
        {
          params: {
            id: cat_id
          }
        }).then(response => {
        this.$toast.success('Deleted successfully');
        this.page = 1;
        this.categories = [];
        this.getData();
        // this.$router.go(-1);
      }).catch(e => {
        this.$toast.error('Error on deleting');

      });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
