<template>
  <div class="product">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <h2>Product list</h2>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>

      <v-row v-if="product_list.length>0">
        <v-col
          cols="12"
          >
          <v-simple-table >
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Title
                </th>
                <th class="text-left">
                  Category
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="item in product_list"
                :key="item.title"
              >
                <td>{{ item.title }}</td>
                <td>{{ item.category.title }}</td>
                <td>
                  <v-btn icon
                         :to="'/product_details/'+item._id"

                  >
                    <v-icon small
                            color="green"
                            class="mr-2">mdi-eye
                    </v-icon>
                  </v-btn>
                  <v-btn icon

                  >
                    <v-icon small
                            class="mr-2">mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn icon
                         color="error"
                         @click.stop="deleteConfirmDialog = true"
                  >
                    <v-icon small
                            class="mr-2">mdi-delete
                    </v-icon>
                  </v-btn>

                </td>
              </tr>
              </tbody>



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
                      @click="deleteProduct()"
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </template>
          </v-simple-table>
          <div class="text-center" v-if="total_page>1">
            <v-pagination
              circle
              v-model="page"
              :length="total_page"
              :total-visible="7"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <strong>No products have been created yet</strong>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout:"user_dashboard",
  name: "index",
  data(){
    return{
      product_list:[],
      page:1,
      total_page:0,
      deleteConfirmDialog:false
    }
  },
  mounted() {
    this.getProductList();
  },
  watch:{
    page(val){
      this.getProductList();
    }
  },
  methods:{
    getProductList(){
      this.$axios.$post('/api/user_product_list',
        {
          page:this.page
        })
        .then(res=>
        {
          this.product_list=res.data;
          this.total_page=Math.ceil(res.total/res.per_page);
        })
        .catch(err=>{
          this.$toast.error(err);
        })
    },
    deleteProduct(id){

    }
  }
}
</script>

<style scoped>

</style>
