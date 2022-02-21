<template>
  <div>
    <v-row>
      <h1 class="my-5">{{ cat_list_title }}</h1>

    </v-row>
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
      <tr class="mt-12 mb-12 " v-if="table_loading">
        <td colspan="2" class="text-center ">
          <v-progress-circular
            :size="40"
            class="my-10"
            :width="3"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </td>
      </tr>
      <tr v-else v-for="(category,index) in categories" :key="index">
        <td>
          {{ category.title }}
        </td>
        <td>
          <v-btn icon
                 :to="'/admin/category/'+category._id"
          >
            <v-icon small
                    color="green"
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>
          <!--          <v-btn icon-->
          <!--                 v-else-->
          <!--                 :to="'/admin/category/'+category._id"-->
          <!--          >-->
          <!--            <v-icon small-->
          <!--                    color="red"-->
          <!--                    class="mr-2">mdi-eye-off-->
          <!--            </v-icon>-->
          <!--          </v-btn>-->
          <v-btn icon
                 :to="'/admin/category/edit/'+category._id"
          >
            <v-icon small
                    class="mr-2">mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn icon
                 color="red"
                 @click="deleteCateConfirm(category._id)"
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

      </tbody>
    </v-simple-table>

    <div class="text-center" v-if="total_page>1">
      <v-pagination
        circle
        v-model="page"
        :length="total_page"
        total-visible="7"
      ></v-pagination>
    </div>


    <v-dialog
      v-model="deleteConfirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure?
        </v-card-title>

        <v-card-text>
          Click AGREE if you are sure
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="deleteConfirmDialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            :loading="delete_loading"
            @click="deleteCate"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      table_loading: false,
      deleteConfirmDialog: false,
      delete_item: null,
      delete_loading: false,
      search: '',
      //=======infiniteScroll
      enough: false,
      page: 1,
      total_page: 0,
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
      this.cat_list_title = 'Main categories';
    this.getData();
    if (this.$route.params.id != undefined)
      this.new_item_parent = this.$route.params.id;
  },
  watch: {
    page(val) {
      this.getData();
    }
  },
  methods: {
    searchData() {
      this.page = 1;
      this.categories = [];
      this.getData();
    },
    async getData() {
      this.table_loading = true;
      this.total_page = 0;
      //Get brand list
      let categoryApiURL = `/api/category_list`;
      await this.$axios.$post(categoryApiURL,
        {
          "parent": this.$route.params.id,
          "paginate": true,
          "keyword": this.search,
          "page": this.page
        }
      ).then(response => {
        if (response) {
          window.scrollTo(0, 0)
          this.categories = response.data;
          this.total_page = Math.ceil(response.total / response.per_page);
        } else
          this.table_status = "Not found";

        this.table_loading = false;
      })
        .catch(e => {
          this.table_status = "Not found"
          this.table_loading = false;
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
    deleteCate() {
      this.delete_loading=true;
      const response = this.$axios.$delete('/api/delete_category',
        {
          params: {
            id: this.delete_item
          }
        }).then(response => {
        this.delete_item = null;
        this.deleteConfirmDialog=false;
        this.delete_loading=false;
        this.$toast.success('Deleted successfully');
        this.page = 1;
        this.categories = [];
        this.getData();
        // this.$router.go(-1);
      }).catch(e => {
        this.delete_item = null;
        this.delete_loading=false;
        this.$toast.error('Error on deleting');
      });
    },
    deleteCateConfirm(id) {
      this.delete_item = id;
      this.deleteConfirmDialog = true;
    },

    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
