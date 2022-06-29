<template>
  <div class="selling-lead">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <h2>Add a New Selling Lead</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <div class="selling-lead-info-body">
      <validation-observer ref="observer" v-slot="{invalid}">
        <v-form @submit.prevent="submitLead">
          <v-row class="mt-3">
            <v-col cols="12" md="4">
              <validation-provider rules="required|min:4" name="subject" v-slot="{errors}">
                <v-text-field
                  v-model="sellItems.subject"
                  outlined
                  :error-messages="errors"
                  label="Subject"
                />
              </validation-provider>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <validation-provider rules="required" name="keywords" v-slot="{errors}">
                <v-combobox
                  hide-selected
                  v-model="sellItems.keywords"
                  :error-messages="errors"
                  hint="Maximum of 3 keyword"
                  label="Keywords"
                  multiple
                  outlined
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Type keyword and Press <kbd>enter</kbd> to create a
                          new one
                        </v-list-item-title>

                      </v-list-item-content>
                    </v-list-item>

                  </template>


                </v-combobox>
              </validation-provider>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <validation-provider rules="required|size:200" name="image" v-slot="{errors,validate}">
                <v-file-input
                  v-model="sellItems.image"
                  @change="validate"
                  :error-messages="errors"
                  hint="Max size: 200KB"
                  persistent-hint
                  accept="image/*"
                  small-chips
                  label="Image"
                  outlined
                />
              </validation-provider>
            </v-col>

            <v-col
              cols="12"
              md="4"
              v-for="(item,index) in categoryTree"
            >
              <validation-provider name="cate" v-slot="{errors}" rules="required">
                <v-autocomplete
                  v-model="item.value"
                  :items="item.items"
                  :error-messages="errors"
                  :loading="item.loading"
                  item-text="title"
                  :item-value="item.item_val"
                  :label="item.label"
                  @change="selectCate(item.value,index)"
                  outlined
                ></v-autocomplete>
              </validation-provider>
            </v-col>

            <v-col
              cols="12"
              md="12"
            >
              <v-radio-group
                v-model="sellItems.expire_status"
                row
              >
                <v-radio
                  label="Has expire date"
                  value="has_expire_date"
                />
                <v-radio
                  value="never_expired"
                  label="Never expired"
                />
              </v-radio-group>
              <v-date-picker
                v-if="sellItems.expire_status==='has_expire_date'"
                ref="picker"
                :allowed-dates="allowedDate"
                v-model="sellItems.expire_date"
                full-width
              ></v-date-picker>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" name="details" v-slot="{errors}">
                <v-textarea
                  outlined
                  :error-messages="errors"
                  v-model="sellItems.details"
                  label="Details"
                />
              </ValidationProvider>
            </v-col>

            <v-col cols="12" class="text-center">
              <v-btn
                class="primary"
                :disabled="invalid"
                :loading="formLoader"
                type="submit"
              >
                Submit
              </v-btn>
              <v-btn class="default" nuxt to="/user/selling-lead">
                Cancel
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </validation-observer>
    </div>
  </div>


</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: "add",
  head() {
    return {
      title: "Add new selling lead"
    }
  },
  layout: "user_dashboard",
  data: () => ({
    categoryTree: [
      {
        label: "Main category",
        value: null,
        items: [],
        loading: false,
        item_val: '_id'
      },
    ],
    categoryTreeIndex: 0,
    cateItems: [],

    sellItems: {
      type: `sell`,
      all_related_category: [],
      cate_id: '',
      expire_status: `has_expire_date`,
      expire_date: null,

    },
    formLoader: false


  }),
  mounted() {
    this.loadCateList();
    let expire_date = new Date();
    expire_date.setDate(expire_date.getDate() + 6);
    this.sellItems.expire_date = expire_date.toISOString().substr(0, 10);
  },
  watch: {},
  methods: {
    //Load category list
    async loadCateList() {
      // Items have already been loaded
      if (this.cateItems.length > 0) return

      this.categoryTree[0].loading = true;

      // Lazily load input items

      await this.$axios.$post('/api/category_list', {
        parent: this.category_parent_id,
      })
        .then(res => {
          this.categoryTree[this.categoryTreeIndex].items = res;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.categoryTree[0].loading = false;
        });
    },


    async selectCate(val, index) {
      this.categoryTree[index].loading = true;
      //When user change again parent or grandparent select, remove current children after changed select
      this.categoryTreeIndex = index + 1;
      if (this.categoryTree.length > this.categoryTreeIndex) {
        this.categoryTree.splice(this.categoryTreeIndex, this.categoryTree.length - 1);
      }
      //End when user change again parent or grandparent select, remove current children after changed select


      await this.$axios.$post('/api/find_category', {id: val})
        .then(response => {

          if (response.child_ids && response.child_ids.length) {
            //Create new child category based on parent
            this.categoryTree.push(
              {
                label: response.title,
                value: null,
                items: response.children,
                loading: false,
                item_val: 'id'
              }
            );
            //En create new child category based on parent
          } else {
            //Category select for product
            this.sellItems.all_related_category=[];
            for (let i in this.categoryTree) {
              this.sellItems.all_related_category.push(this.categoryTree[i].value);
            }
            this.sellItems.cate_id = val;

          }
          this.categoryTree[index].loading = false;

        }).catch(err => {
          this.$toast.error(err);
          if (err.response.status == 401)
            this.$auth.logout();
          this.categoryTree[index].loading = false;
        });
    },


    async submitLead() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        // ABORT!!
      }else {
        this.formLoader = true;

        let formData = new FormData();
        for (let key in this.sellItems) {
          if (!(key === 'image')) {
            if (!(this.sellItems[key] === "" || this.sellItems[key] === null ||
              this.sellItems[key].length === 0))
              formData.append(key, JSON.stringify(this.sellItems[key]));
          }

        }

        formData.append("image", this.sellItems.image);


        this.$axios.$post('/api/create_trading_lead'
          , formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        )
          .then(res => {
            this.formLoader = false;
            if (typeof res === 'object') {
              for (let i in res) {
                let error = res[i][0];
                this.$toast.error(error);
                // break;
              }
            } else {
              this.$toast.success("Product create successfully");
              this.$router.push({
                path: '/user/selling-lead'
              });
            }

          }).catch(err => {
          this.formLoader = false;
          this.$toast.error(err);
        });
      }
    },
    goBack() {

    },


    getCurrencyType() {
      this.$axios.$post('/api/currency_type'
      ).then(response => {
        this.currencyTypeItems = response;
      }).catch(err => {
        console.log(err);
      });
    },
    getWeightUnit() {
      this.weight_unit_loading = true;
      this.$axios.$post('/api/weight_measurement'
      ).then(response => {
        this.weightUnitList = response;
      }).catch(err => {
        console.log(err);
      }).finally(res => {
        this.weight_unit_loading = false;
      });
    },
    getDimensionUnit() {
      this.dimension_unit_loading = true;
      this.$axios.$post('/api/dimension_measurement'
      ).then(response => {
        this.dimensionUnitList = response;
      }).catch(err => {
        console.log(err);
      }).finally(res => {
        this.dimension_unit_loading = false;
      });
    },
    getShippingCarrier() {
      this.shipping_carrier_loading = true;
      this.$axios.$post('/api/shipping_carrier'
      ).then(response => {
        this.shippingCarrierList = response;
      }).catch(err => {
        console.log(err);
      }).finally(res => {
        this.shipping_carrier_loading = false;
      });
    },


    spilitter(val) {
      val = val.replace(/,/g, '');
      const str = val.toString().split(".");
      return str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    //Add new price range to price set (different price based on quantity range)
    addNewPriceRange() {
      if (this.price_set.length < 4)
        this.price_set.push({
          min_qty: '',
          max_qty: '',
          currency: 'USD',
          value: ''
        })
      else
        this.$toast.error("Max record for range is 4")
    },
    removePriceRange(index) {
      this.price_set.splice(index, 1);

      //Remove max price from before object
      if (index > 0)
        this.price_set[index - 1].max_qty = '';
    },
    async getMeasurementUnit() {
      await this.$axios.post('/api/measurement_unit').then(response => {
        this.measurement_list = response.data;
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 400) {
          this.$toast.error(this.$t(`Bad Request`));
        } else if (response.status == 403) {
          this.$toast.error(this.$t(`Forbidden`));
        } else if (response.status == 404) {
          this.$toast.error(this.$t(`not found`));
        }
      });
    },
    allowedDate(val) {
      let date = new Date();
      date.setDate(date.getDate() + 5);
      return val >= date.toISOString().substr(0, 10);
    }

  },
  components: {
    ValidationProvider,
    ValidationObserver,
  }

}
</script>

<style scoped>
.certificate_text {
  max-width: 300px;
}
</style>
