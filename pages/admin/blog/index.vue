<template>
  <div>
    <h1>Blog list</h1>
    <v-divider/>
    <v-row class="mt-3">
<!--      <v-col cols="10">-->
<!--        <v-text-field-->
<!--          v-model="search"-->
<!--          label="Search"-->
<!--          class="mx-4"-->
<!--          @keyup="searchData()"-->
<!--        ></v-text-field>-->
<!--      </v-col>-->

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
          to="/admin/blog/create"
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
    </v-row>

    <v-simple-table>
      <thead>
      <tr>
        <th>
          Title
        </th>
        <th>
          Describe
        </th>
        <th>
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="mt-12 mb-12 " v-if="table_loading">
        <td colspan="3" class="text-center ">
          <v-progress-circular
            :size="40"
            class="my-10"
            :width="3"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </td>
      </tr>
      <tr v-else v-for="(blog,index) in blog_list" :key="index">
        <td>
          {{ blog.title }}
        </td>
        <td>
          <span v-html="blog.describe.substring(0,30)+' ...'"/>
        </td>
        <td>
          <v-btn icon
                 :to="`/blog/${blog._id}`"
          >
            <v-icon small
                    color="green"
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>

          <v-btn icon
                 :to="'/admin/blog/edit/'+blog._id"
          >
            <v-icon small
                    class="mr-2">mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn icon
                 color="red"
                 @click.stop="openDeleteConfirmDialog(blog)"
          >
            <v-icon small
                    class="mr-2">mdi-delete
            </v-icon>
          </v-btn>
          <!--          <v-icon-->
          <!--            small-->
          <!--            @click="deleteItem(blog)"-->
          <!--          >-->
          <!--            mdi-delete-->
          <!--          </v-icon>-->
        </td>
      </tr>

      </tbody>
    </v-simple-table>

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
            @click="deletePage()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <div class="text-center" v-if="total_page>1">
      <v-pagination
        circle
        v-model="page"
        :length="total_page"
        total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  name: "blog-mange",
  data() {
    return {
      total_page: 0,
      page: 1,
      table_loading: false,

      deleteConfirmDialog: false,
      delete_loading:false,
      delete_item:null,

      blog_list: {}
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.table_loading=true;
      this.$axios.$get('/api/blog')
        .then(response => {
          this.blog_list = response;
        }).catch(err => {
        console.log(err);
      }).finally(msg=>{
        this.table_loading=false;
      })
    },
    goBack() {
      this.$router.go(-1);
    },
    deletePage() {
      this.delete_loading=true;
      this.$axios.$delete('/api/delete_blog',
        {
          params:
            {id: this.delete_item._id}
        })
        .then(response => {
          if (typeof response.data === 'object') {
            for (let i in response.data) {
              let error = response.data[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.$toast.success("Deleted successfully");
            this.getList();
            this.delete_loading=false;
            this.deleteConfirmDialog=false;
          }
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
        this.delete_loading=false;
        this.deleteConfirmDialog=false;
      });
    },
    openDeleteConfirmDialog(item) {
      this.deleteConfirmDialog = true;
      this.delete_item = item;
    },
  }

}
</script>

<style scoped>

</style>
