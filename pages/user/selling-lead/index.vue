<template>
  <div class="selling_lead">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <h2>Selling lead list</h2>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>

      <v-row class="mt-12 mb-12" v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            :size="50"
            :width="5"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-row v-if="selling_leads_list.length>0">
          <v-col
            cols="12"
          >
            <v-simple-table>
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
                  v-for="item in selling_leads_list"
                  :key="item.title"
                >
                  <td>{{ item.title }}</td>
                  <td>
                    <span v-if="item.category">
                    {{ item.category.title }}
                    </span>
                  </td>
                  <td>
                    <v-btn icon
                           :to="'/selling_lead-details/'+item._id"

                    >
                      <v-icon small
                              color="green"
                              class="mr-2">mdi-eye
                      </v-icon>
                    </v-btn>
                    <v-btn icon
                           :to="'/user/selling_lead/edit/'+item._id"
                    >
                      <v-icon small
                              class="mr-2">mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn icon
                           color="error"
                           @click.stop="openDeleteConfirmDialog(item)"
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
                        :loading="delete_loading"
                        @click="deleteSellingLead()"
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
            <strong>No selling lead have been created yet</strong>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "user_dashboard",
  name: "selling-lead",
  head() {
    return {
      title: "Selling leads list"
    }
  },
  data() {
    return {
      selling_leads_list: [],
      page: 1,
      total_page: 0,
      deleteConfirmDialog: false,
      loading: false,
      delete_loading:false,
      delete_item:null,
    }
  },
  mounted() {
    this.$auth.user;
    this.getSellingLeadsList();
  },
  watch: {
    page(val) {
      this.getSellingLeadsList();
    }
  },
  methods: {
    getSellingLeadsList() {

      this.loading = true;
      this.$axios.$post('/api/user_selling_leads_list',
        {
          page: this.page
        })
        .then(res => {
          this.selling_leads_list = res.data;
          this.total_page = Math.ceil(res.total / res.per_page);
          this.loading = false;
        })
        .catch(err => {
            this.loading = false;
            this.$toast.error(err);
          }
        )
    },
    deleteSellingLead() {
      this.delete_loading=true;
      this.$axios.$delete('/api/delete_selling_lead',
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
            this.getSellingLeadsList();
            this.delete_loading=false;
            this.deleteConfirmDialog=false;
          }
        }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
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
