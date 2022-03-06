<template>
  <div class="product">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <h2>Add a New Product</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <div class="product-info-body">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="productNameVal"
                label="Product Name"
                append-icon="mdi-pencil"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="8"
            >
              <v-combobox
                v-model="keywordVal"
                :items="keywordItems"
                :search-input.sync="keyword_search"
                hide-selected
                hint="Maximum of 10 tags"
                label="Keyword"
                multiple
                outlined
                persistent-hint
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ keyword_search }}</strong>". Press <kbd>enter</kbd> to create a
                        new one
                      </v-list-item-title>

                    </v-list-item-content>
                  </v-list-item>

                </template>


              </v-combobox>
            </v-col>

            <v-col
              cols="12"
              md="4"
              v-for="(item,index) in categoryTree"
            >
              <v-autocomplete
                v-model="item.value"
                :items="item.items"
                :loading="item.loading"
                item-text="title"
                :item-value="item.item_val"
                :label="item.label"
                @change="selectCate(item.value,index)"
                outlined
              ></v-autocomplete>
            </v-col>


          </v-row>
        </v-container>
        <v-container v-if="property_section">
          <v-row class="mb-2">
            <v-col cols="12">
              <h3>Category property</h3>
            </v-col>
          </v-row>
          <v-divider></v-divider>


          <v-row class="mt-2">
            <v-col cols="12" class="text-center" v-if="property_loading">
              <v-progress-circular
                class="mt-4"
                :size="30"
                :width="3"
                color="orange"
                indeterminate
              ></v-progress-circular>
            </v-col>
            <v-col v-else-if="cate_not_exist" cols="12">
              No attributes entered for this group, you can enter some custom attribute by below button
            </v-col>
            <v-col v-else
                   v-for="(item,index) in cateProperty"
                   cols="12"
                   md="4"
            >
              <span
                v-if="item.field_type=='Text'"
              >
                  <v-text-field
                    :label="item.label"
                    outlined
                    @input="applyCatVal($event, item.label)"
                  >
                  </v-text-field>
                </span>
              <span
                v-else-if="item.field_type=='Select'"
              >
                  <v-select
                    :items="item.values"
                    :label="item.label"
                    @input="applyCatVal($event, item.label)"
                    outlined
                  >
                  </v-select>
                </span>
              <span
                v-else-if="item.field_type=='Radio'"
              >
                   <p style="font-size: 16px">{{ item.label }}</p>
                    <v-radio-group
                      class="mt-0"
                      mandatory
                      row
                      @change="applyCatVal($event, item.label)"
                    >
                      <v-radio
                        v-for="(radio_val,index) in item.values"
                        :label="radio_val.label"
                        :value="radio_val.val"

                      ></v-radio>

                    </v-radio-group>
                </span>
              <span
                v-else-if="item.field_type=='Textarea'"
              >
                   <v-textarea
                     outlined
                     :label="item.label"
                     @input="applyCatVal($event, item.label)"
                   ></v-textarea>
                </span>
            </v-col>
          </v-row>

          <span v-if="dynamicAttr.length>0">
             <v-row class="mb-2">
            <v-col cols="12">
              <h3>Manual property</h3>
            </v-col>
          </v-row>
          <v-divider class="mb-4"></v-divider>

              <v-row
                v-for="(item,index) in dynamicAttr"
              >
                <v-col cols="12" md="4">
                  <v-text-field label="Label" :value="item.label" @input="applyLabelVal($event,index)" class="mr-2"
                                outlined/>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field label="Value" :value="item.value" @input="applayCustomPropertyVal($event,index)"
                                outlined/>

                </v-col>


              </v-row>

          </span>
          <v-row>
            <v-col
              cols="12"
              class="text-center"
            >
              <v-btn
                @click="createCustomProperty"
              >
                Add custom attribute
              </v-btn>
            </v-col>
          </v-row>
        </v-container>


        <v-container>
          <v-row>
            <v-col cols="12">
              <h2>Trade information</h2>
              <v-divider></v-divider>
            </v-col>
            <v-col
              cols="4"
            >
              <v-text-field
                outlined
                type="number"
                v-model="min_order"
                label="Minimum Order (Only numbers)"
              ></v-text-field>
            </v-col>
            <v-col
              cols="4"
            >
              <v-autocomplete
                outlined
                v-model="order_unit"
                :items="measurement_list"
                item-text="title"
                item-value="title"
                label="Unit of measurement"
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
            >
              <p>Set price</p>
              <v-radio-group
                v-model="price_type"
                row
              >
                <v-radio
                  value="base_on_qty"
                  label="Different price based on quantity range">
                </v-radio>
                <v-radio
                  value="range"
                  label="Price Range">
                </v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12">
              <section v-if="price_type=='base_on_qty'">
                <v-row v-for="(item,index) in price_set">
                  <v-col cols="12" md="2">
                    <v-text-field
                      type="number"
                      outlined
                      v-model="item.min_qty"
                      prefix="≥"
                      label="Quantity"
                    />

                  </v-col>

                  <v-col cols="12" md="3">
                    <v-select
                      v-model="item.currency"
                      :items="currencyTypeItems"
                      item-value="title"
                      item-text="title"
                      label="Currency"
                      outlined
                    />
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.value"
                      outlined
                      label="Price"
                    />
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      v-if="price_set.length===(index+1) & index!==3"
                      icon color="green" @click="addNewPriceRange()">
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                    <v-btn
                      v-if="index!==0"
                      icon color="red" @click="removePriceRange(index)">
                      <v-icon>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="2" class="mt-4">
                    <span v-if="item.max_qty">
                      [{{ item.min_qty }}~{{ item.max_qty }}]
                    </span>
                    <span v-else>
                      <span v-if="item.min_qty">≥ {{ item.min_qty }}</span>
                    </span>

                  </v-col>
                  <v-col>

                  </v-col>
                </v-row>
              </section>
              <section v-if="price_type=='range'">
                <v-row>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="price_range.currency"
                      :items="currencyTypeItems"
                      item-value="title"
                      item-text="title"
                      label="Currency"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="price_range.min_value"
                      label="Min price"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="price_range.max_value"
                      label="Max price"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="3" class="mt-3">
                    <p>
                      per Twenty-Foot Container
                    </p>
                  </v-col>
                </v-row>
              </section>
            </v-col>


            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                outlined
                v-model="hs_code"
                label="Hs code"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="2" cols="6">
              <p class="mt-5">
                Payment Terms
              </p>
            </v-col>
            <v-col md="2" cols="6" v-for="item in payment_terms_list">
              <v-checkbox
                v-model="payment_terms"
                :label="item"
                :value="item"
              ></v-checkbox>
            </v-col>
          </v-row>


          <v-row>
            <v-col cols="12">
              <h2>Product Description</h2>
              <v-divider></v-divider>
            </v-col>

            <v-col cols="12">
              <v-textarea
                outlined
                label="Product details"
              >

              </v-textarea>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-file-input
                v-model="images"
                accept="image/*"
                small-chips
                multiple
                label="Images"
                outlined
              ></v-file-input>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-file-input
                v-model="video"
                accept="video/mp4,video/x-m4v,video/*"
                label="Video"
                outlined
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <h4>Certificates Approval	</h4>
              <v-data-table
                :headers="cert_table_headers"
                :items="product_cert_list"
                :items-per-page="10"
                class="elevation-1"
                hide-default-footer
              ></v-data-table>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h2>Ready to display?</h2>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p> If you select “No”, your product will not be searchable.</p>
              <v-radio-group
                v-model="ready_display"
                class="mx-0"
                row
              >
                <v-radio
                  label="Yes"
                  value="yes"
                ></v-radio>
                <v-radio
                  label="No"
                  value="no"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>


        <v-container>
          <v-row class="mt-4 text-center">
            <v-col cols="12">
              <v-btn
                color="primary"
                class="mr-4"
                :loading="formLoader"
                :disabled="!property_section"
                @click="submitProduct"
                large
              >
                Create
              </v-btn>

              <v-btn
                class="mr-4"
                large
                to="/user/product"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>

</template>

<script>
export default {
  name: "add",
  head() {
    return {
      title: "Add new product"
    }
  },
  layout: "user_dashboard",
  data: () => ({
    cateItems: [],
    cate_search: null,

    cateProperty: [],
    cert_table_headers:[
      {
        text: "Certificate Name",
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Certificate Number', value: 'num' },

    ],

    min_order: 0,
    order_unit: '',
    price_set: [
      {
        min_qty: '',
        max_qty: '',
        currency: 'USD',
        value: ''
      }
    ],
    //==== When user select price range
    price_range: {
      currency: '',
      min_value: '',
      max_value: '',
    },

    hs_code: '',

    productNameVal: null,

    keywordVal: null,
    keywordItems: [],
    keyword_search: null,

    currencyTypeItems: [],

    fields: {},
    catPropertyVal: {},
    dynamicAttr: [],
    formLoader: false,
    category_parent_id: null,
    measurement_list: [],

    categoryTree: [
      {
        label: "Main category",
        value: null,
        items: [],
        loading: false,
        item_val: '_id'
      },
    ],
    all_related_category: [],
    category_id: null,
    categoryTreeIndex: 0,
    property_section: false,
    property_loading: false,
    price_type: 'range',
    cate_not_exist: false,
    ready_display: "yes",

    payment_terms: [],
    payment_terms_list: [
      'Payoneer',
      'L/C',
      'T/T',
      'D/P',
      'Western Union',
      'Paypal',
      'Money Gram',
      'Others'
    ],
  }),
  mounted() {
    this.getCurrencyType();
    this.loadCateList();
    this.getMeasurementUnit();
  },
  filters: {
    currencyFormatted: function (value) {
      return Number(value).toLocaleString("fa-IR", {
        // style: "currency",
        currency: "IRR"
      });
    },
  },
  watch: {
    property_section(val) {
      this.all_related_category = [];
      if (val === true) {
        this.all_related_category = [];
        for (let i in this.categoryTree) {
          this.all_related_category.push(this.categoryTree[i].value);
        }
      }
    },
    min_order(val) {
      this.price_set[0].min_qty = val;
    },
    'price_set.0.min_qty': {
      handler: function (val) {
        console.log(val);
        this.min_order = val;
      },
      deep: true

    },
    'price_set': {
      handler: function (val) {
        for (let i in val) {
          if (i > 0)
            if (val[i].min_qty > val[i - 1].min_qty)
              this.price_set[i - 1].max_qty = val[i].min_qty - 1;

          this.price_set[i].value = this.spilitter(val[i].value)
        }
      },
      deep: true
    },
  },
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

      //When change one select category, hidden property section
      this.property_section = false;


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
            this.all_related_category.push(val);
            this.category_id = val;

            this.property_section = true;
            this.loadProperty(val);
          }
          this.categoryTree[index].loading = false;

        }).catch(err => {
          this.$toast.error(err);
          this.property_section = false;
          this.categoryTree[index].loading = false;
        });
    },

    async loadProperty(catid) {
      this.property_loading = true;
      await this.$axios.$post('/api/get_cate_property', {
        cate_id: catid
      })
        .then(res => {
          if (res.length > 0) {
            this.cate_not_exist = false;
            this.cateProperty = res;
          } else
            this.cate_not_exist = true;
        })
        .catch(err => {
          console.log(err)
        }).finally(() => {
          this.property_loading = false;
        });

    },
    applyCatVal(value, field) {
      console.log(value);
      this.catPropertyVal[field] = value;
    },
    applyLabelVal(value, index) {
      this.dynamicAttr[index].label = value;
    },
    applayCustomPropertyVal(value, index) {
      this.dynamicAttr[index].value = value;
    },
    createCustomProperty() {
      var can_create = false;
      var err_msg = false;
      if (this.dynamicAttr.length === 0)
        can_create = true;

      this.dynamicAttr.filter(function (elem) {
        if (elem.label === "" || elem.value === "") {
          can_create = false;
          err_msg = true;
        } else
          can_create = true;

      });
      if (can_create)
        this.dynamicAttr.push({label: "", value: "", custom_attr: true});

      if (err_msg)
        this.$toast.error("Before create new attribute, fill in the available fields")

    },
    // applyCatValCheckbox(value, field, field_item) {
    //   this.fields[field_item] = value;
    //   this.catPropertyVal[field] = fields;
    // },
    async submitProduct() {
      this.formLoader = true;
      this.updateAttrFromCustom();
      var data = {
        title: this.productNameVal,
        keyword: this.keywordVal,
        all_related_category: this.all_related_category,
        cate_id: this.category_id,
        attribute: this.catPropertyVal,
        min_order: this.min_order,
        order_unit: this.order_unit,
        price_type: this.price_type,
        price: (this.price_type === 'base_on_qty' ? this.price_set : this.price_range),
        hs_code: this.hs_code,
        payment_terms: this.payment_terms,
      };
      await this.$axios.$post('/api/create_product', data)
        .then(res => {
          this.formLoader = false;
          if (res.length == 0) {
            this.$toast.success("Product create successfully");
            this.$router.push({
              path: '/user/product'
            });
          } else
            this.$toast.error("Some error on form input");

        }).catch(err => {
          this.formLoader = false;
          this.$toast.error(err);
        });

    },
    updateAttrFromCustom() {//Update attribute from custom user attribute
      for (var i = 0; i < this.dynamicAttr.length; i++) {
        this.catPropertyVal[this.dynamicAttr[i].label] = this.dynamicAttr[i].value;
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

  }

}
</script>

<style scoped>

</style>
