<template>
  <div>
    <h1>Products</h1>
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
          :to="'/admin/product/add/'+new_item_parent"
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
          Views
        </th>
        <th>
          Owner name
        </th>
        <th>
          Category
        </th>
        <th>
          Create at
        </th>
        <th>
          Action
        </th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(product,index) in products" :key="index">
        <td>
          <nuxt-link :to="'/product-details/'+product._id">
            {{ product.title }}
          </nuxt-link>
        </td>
        <td>
          {{ product.views_count }}
        </td>
        <td>
          {{ product.company.company_name }}
        </td>
        <td>
          {{ product.category.title }}
        </td>
        <td>
           {{product.created_at}}
        </td>
        <td>
          <v-btn icon
                 color="green"
                 :to="'/product-details/'+product._id"
          >
            <v-icon small
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>

          <v-btn icon
                 color="error"
                 @click.stop="openDeleteConfirmDialog(product)"
          >
            <v-icon small
                    class="mr-2">mdi-delete
            </v-icon>
          </v-btn>
        </td>
      </tr>
      <InfiniteScroll :enough="enough" @load-more="getData()"/>

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
          Click AGREE if you are sure to delete
          <strong class="red--text">{{delete_item===null ? '' : delete_item.title}}</strong>
        </v-card-text>
        <v-col cols="12">
          <v-text-field
            v-model="admin_delete_pass"
            label="Admin pass"
          />
        </v-col>

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
            @click="deleteProduct()"
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
  name: "admin-product",
  layout: "admin",
  head(){
    return{
      title:"Product manage"
    }
  },
  data() {
    return {
      table_status: 'Loading information ...',
      search: '',
      //=======infiniteScroll
      enough: false,
      page: 1,
      pageSize: 20,
      //=====================
      products: [],
      product_list_title: null,

      delete_item:null,
      delete_loading:false,
      deleteConfirmDialog: false,
      admin_delete_pass:null,

      //To create new item button
      new_item_parent: null
    }
  },
  mounted() {

    this.getData();
    if (this.$route.params.id != undefined)
      this.new_item_parent = this.$route.params.id;
  },
  methods: {
    searchData() {
      this.page = 1;
      this.products = [];
      this.getData();
    },
    async getData() {
      //Get brand list
      let productApiURL = `/api/admin_product_list`;
      await this.$axios.$post(productApiURL,
        {
          "paginate": true,
          "keyword": this.search,
          "page": this.page++
        }
      ).then(response => {
        if (response)
          this.products = this.products.concat(response.data);
        else
          this.table_status = "Not found"
      })
        .catch(e => {
          this.table_status = "Not found"
          console.log('error');
        })
    },

    goBack() {
      this.$router.go(-1);
    },
    deleteProduct() {
      if (this.admin_delete_pass!=="195256"){
        this.$toast.error(this.$t(`Password is wrong`));
      }else{
        this.delete_loading=true;
        this.$axios.$delete('/api/delete_product',
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
              this.page = 1;
              this.products = [];
              this.getData();
              this.delete_loading=false;
              this.deleteConfirmDialog=false;
              this.admin_delete_pass=null;
            }
          }).catch(({response}) => {
          if (response.status == 401) {
            this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
          } else if (response.status == 500 || response.status == 504) {
            this.$toast.error(this.$t(`REQUEST_FAILED`));
          }
          this.delete_loading=false;
          this.deleteConfirmDialog=false;
          this.admin_delete_pass=null;
        });
      }

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
