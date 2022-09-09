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
      <validation-observer ref="observer" v-slot="{invalid}">
        <v-form @submit.prevent="submitProduct">
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <validation-provider
                  immediate
                  rules="required|min:4" name="title" v-slot="{errors}">
                  <v-text-field
                    v-model="productItems.title"
                    label="Product Name"
                    append-icon="mdi-pencil"
                    :error-messages="errors"
                    required
                    outlined
                  />
                </validation-provider>
              </v-col>


              <v-col
                cols="12"
                md="4"
                v-for="(item,index) in categoryTree"
              >
                <validation-provider
                  immediate
                  rules="required" name="category" v-slot="{errors}">
                  <v-autocomplete
                    v-model="item.value"
                    :items="item.items"
                    :loading="item.loading"
                    item-text="title"
                    :item-value="item.item_val"
                    :error-messages="errors"
                    :label="item.label"
                    @change="selectCate(item.value,index)"
                    outlined
                  />
                </validation-provider>
              </v-col>


            </v-row>
          </v-container>

          <!--Property section-->
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
                />
              </v-col>
              <v-col v-else-if="cate_not_exist" cols="12">
                No attributes entered for this group, you can enter some custom attribute by below button
              </v-col>
              <v-col v-else
                     v-for="(item,index) in cateProperty"
                     cols="12"
                     md="4"
              >

                <v-text-field
                  v-if="item.field_type=='Text'"
                  :label="item.label"
                  outlined
                  @input="applyCatVal($event, item.label)"
                />

                <v-autocomplete
                  v-else-if="item.field_type=='Select'"
                  :return-object="true"
                  :items="item.values"
                  :label="item.label"
                  :name="'property'+index"
                  @input="applyCatVal($event, item.label)"
                  outlined/>
                <div
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
                </div>

                <v-textarea
                  v-else-if="item.field_type=='Textarea'"
                  outlined
                  :label="item.label"
                  @input="applyCatVal($event, item.label)"
                ></v-textarea>
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
                  <v-text-field label="Value" :value="item.value" @input="applyCustomPropertyVal($event,index)"
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
          <!--End property section-->

          <v-container>
            <v-row>
              <v-col cols="12">
                <h2>Trade information</h2>
                <v-divider></v-divider>
              </v-col>
              <v-col
                cols="12" md="4"
              >
                <validation-provider
                  immediate
                  rules="required" name="title" v-slot="{errors}">
                  <v-text-field
                    outlined
                    type="number"
                    :error-messages="errors"
                    v-model="productItems.min_order"
                    label="Minimum Order (Only numbers)"
                  />
                </validation-provider>
              </v-col>
              <v-col
                cols="12" md="4"
              >
                <v-autocomplete
                  outlined
                  v-model="productItems.order_unit"
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
                  v-model="productItems.price_type"
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
                <section v-if="productItems.price_type=='base_on_qty'">
                  <v-row v-for="(item,index) in price_set" class="range_item">
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
                    <v-col cols="12" md="2" class="d-none d-md-block">
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
                    <v-col cols="12" md="2" class="d-md-none text-center">
                      <v-btn
                        class="white--text"
                        v-if="price_set.length===(index+1) & index!==3"
                         color="green" @click="addNewPriceRange()">
                        <v-icon>
                          mdi-plus
                        </v-icon>
                        Add range
                      </v-btn>
                      <v-btn
                        class="white--text"
                        v-if="index!==0"
                        color="red" @click="removePriceRange(index)">
                        <v-icon>
                          mdi-minus
                        </v-icon>
                        Delete range
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
                <section v-else-if="productItems.price_type=='range'">
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
                  v-model="productItems.hs_code"
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
                  v-model="productItems.payment_terms"
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
                <validation-provider
                  immediate
                  rules="required|min:10" name="details" v-slot="{errors}">
                  <v-textarea
                    v-model="productItems.details"
                    :error-messages="errors"
                    outlined
                    label="Product details"
                  />

                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <validation-provider
                  immediate
                  rules="required|image" v-slot="{ validate, errors }">
                  <v-file-input
                    v-model="productItems.images"
                    accept="image/*"
                    small-chips
                    multiple
                    persistent-hint
                    hint="Max num of file: 5"
                    label="Images"
                    @change="validate"
                    :error-messages="errors"
                    outlined
                  ></v-file-input>
                </validation-provider>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-file-input
                  v-model="productItems.video"
                  accept="video/mp4,video/x-m4v,video/*"
                  label="Video"
                  :rules="fileSizeRule"
                  persistent-hint
                  hint="Max: 1MB"
                  outlined
                ></v-file-input>
              </v-col>

              <v-col cols="12">
                <h4>Certificates Approval </h4>
                <v-simple-table>
                  <thead>
                  <tr>
                    <td>
                      Certificate Name
                    </td>
                    <td>
                      Certificate Number
                    </td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in productItems.certificates">
                    <td>
                      <v-checkbox
                        :label="index"
                        v-model="item.value"
                      />
                    </td>
                    <td>
                      <v-text-field
                        class="my-2  certificate_text"
                        outlined
                        hide-details
                        v-model="item.num"
                      />
                    </td>
                  </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-row>


            <v-row>
              <v-col cols="12">
                <h2>Packaging & Shipping Information</h2>
                <v-divider></v-divider>
              </v-col>
              <v-col md="4" cols="12">
                <v-text-field
                  outlined
                  v-model="productItems.packing.pieces_per_box"
                  label="Packing ex: 10 pieces per box"
                />
              </v-col>
              <v-col cols="6" md="2">
                <v-text-field
                  outlined
                  v-model="productItems.packing.pack_length"
                  label="Length"
                />
              </v-col>
              <v-col cols="6" md="2">
                <v-text-field
                  outlined
                  v-model="productItems.packing.pack_width"
                  label="Width"
                />
              </v-col>
              <v-col cols="6" md="2">
                <v-text-field
                  outlined
                  v-model="productItems.packing.pack_height"
                  label="Height"
                />
              </v-col>
              <v-col cols="6" md="2">
                <v-autocomplete
                  outlined
                  :loading="dimension_unit_loading"
                  :items="dimensionUnitList"
                  item-text="title"
                  item-value="title"
                  v-model="productItems.packing.pack_dimension_unit"
                  label="Size unit"
                />
              </v-col>
              <v-col cols="6" md="4">
                <v-text-field
                  outlined
                  v-model="productItems.packing.pack_weight"
                  label="Weight"
                />
              </v-col>
              <v-col cols="6" md="2">
                <v-autocomplete
                  outlined
                  :loading="weight_unit_loading"
                  :items="weightUnitList"
                  item-text="title"
                  item-value="title"
                  v-model="productItems.packing.pack_weight_unit"
                  label="Weight unit"
                />
              </v-col>


            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  v-model="productItems.delivery_lead_time"
                  label="Delivery Lead Time ex: 60 days for OEM, 7 days for ready goods"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  v-model="productItems.supply_ability"
                  label="Supply Ability ex: 30,000 Set/ Sets per Month"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="shippingCarrierList"
                  :loading="shipping_carrier_loading"
                  item-value="title"
                  v-model="productItems.shipping_carrier"
                  item-text="title"
                  label="Shipping Carrier	"
                  outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
              >
                <p>If you want your product to be in the following lists</p>
                <v-checkbox
                  v-model="productItems.product_type"
                  label="Ready to ship"
                  value="ready_to_ship"
                ></v-checkbox>
                <v-checkbox
                  v-model="productItems.product_type"
                  label="Customize"
                  value="customize"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <h2>Ready to display?</h2>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p> If you select “No”, your product will not be searchable.</p>
                <v-radio-group
                  v-model="productItems.ready_display"
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
                  :disabled="invalid"
                  type="submit"
                  large
                >
                  <!--                :disabled="!property_section"-->
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
      title: "Add new product"
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  layout: "user_dashboard",
  data: () => ({
    productItems: {
      title: '',
      all_related_category: [],
      cate_id: '',
      attribute: {},
      min_order: 100,
      order_unit: '',
      price_type: 'base_on_qty',
      price: '',
      hs_code: '',
      payment_terms: [],
      ready_display: "yes",
      images: [],
      video: null,
      certificates: {
        CCC: {
          value: false,
          num: "",
        },
        CE: {
          value: false,
          num: "",
        },
        FCC: {
          value: false,
          num: "",
        },
        TUV: {
          value: false,
          num: "",
        },
        UL: {
          value: false,
          num: "",
        },
        FDA: {
          value: false,
          num: "",
        },

      },
      product_type: [],
      packing: {
        pieces_per_box: null,
        pack_length: null,
        pack_width: null,
        pack_height: null,
        pack_dimension_unit: null,
        pack_weight: null,
        pack_weight_unit: null,
      },
      delivery_lead_time: null,
      supply_ability: null,
      shipping_carrier: null
    },

    cateItems: [],
    cate_search: null,

    dimensionUnitList: [],
    dimension_unit_loading: false,

    weightUnitList: [],
    weight_unit_loading: false,

    shippingCarrierList: [],
    shipping_carrier_loading: false,


    cateProperty: [],


    price_set: [
      {
        min_qty: '',
        max_qty: '',
        currency: 'USD',
        value: '',
      }
    ],
    //==== When user select price range
    price_range: {
      currency: 'USD',
      min_value: '',
      max_value: '',
    },



    currencyTypeItems: [],

    fields: {},
    mainAttr: {},
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
    categoryTreeIndex: 0,
    property_section: false,
    property_loading: false,
    cate_not_exist: false,

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

    fileSizeRule: [
      (value) =>
        !value ||
        value.size < 1024 * 1024 ||
        "File is too big",
    ],


  }),
  mounted() {
    this.getCurrencyType();
    this.getDimensionUnit();
    this.getShippingCarrier();
    this.getWeightUnit();
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
      this.productItems.all_related_category = [];
      if (val === true) {
        this.productItems.all_related_category = [];
        for (let i in this.categoryTree) {
          this.productItems.all_related_category.push(this.categoryTree[i].value);
        }
      }
    },
    'productItems.min_order': {
      handler: function (val) {
        this.price_set[0].min_qty = val;
      },
      deep: true
    },
    'price_set.0.min_qty': {
      handler: function (val) {
        console.log(val);
        this.productItems.min_order = val;
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
    'productItems.price_type': {
      handler: function (val) {
        this.productItems.price = (val === 'base_on_qty' ? this.price_set : this.price_range);
      },
      deep: true
    },
    'price_range': {
      handler: function (val) {
        this.price_range.min_value = this.spilitter(val.min_value);
        this.price_range.max_value = this.spilitter(val.max_value);
      },
      deep: true
    }
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
          if (err.response.status == 401) {
            this.$auth.logout();
          }
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
            this.productItems.all_related_category.push(val);
            this.productItems.cate_id = val;

            this.property_section = true;
            this.loadProperty(val);
          }
          this.categoryTree[index].loading = false;

        }).catch(err => {
          if (err.response.status == 401) {
            this.$auth.logout();
          }
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
          if (err.response.status == 401) {
            this.$auth.logout();
          }
          console.log(err)
        }).finally(() => {
          this.property_loading = false;
        });
    },
    applyCatVal(value, field) {
      this.mainAttr[field] = value;
    },
    applyLabelVal(value, index) {
      this.dynamicAttr[index].label = value;
    },
    applyCustomPropertyVal(value, index) {
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
    async submitProduct() {
        this.formLoader = true;
        this.updateAttrFromCustom();

        let formData = new FormData();
        for (let key in this.productItems) {
          if (!(key === 'images' || key === 'video')) {
            if (!(this.productItems[key] === "" || this.productItems[key] === null ||
              this.productItems[key].length === 0))
              formData.append(key, JSON.stringify(this.productItems[key]));
          }

        }


        formData.append("video", this.productItems.video);


        //Multiple files
        var ins = this.productItems.images.length;
        for (var x = 0; x < ins; x++) {
          formData.append("images[]", this.productItems.images[x]);
        }

        this.$axios.$post('/api/create_product'
          , formData,
          {
            onUploadProgress: progressEvent => {
              let percentComplete = progressEvent.loaded / progressEvent.total
              percentComplete = parseInt(percentComplete * 100);
              console.log(percentComplete);
            },
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
                path: '/user/product'
              });
            }

          }).catch(err => {
          if (err.response.status == 401) {
            this.$auth.logout();
          }
          this.formLoader = false;
          this.$toast.error(err);
        });

    },
    updateAttrFromCustom() {//Update attribute from custom user attribute
      this.productItems.attribute = this.mainAttr;
      for (var i = 0; i < this.dynamicAttr.length; i++) {
        this.productItems.attribute[this.dynamicAttr[i].label] = this.dynamicAttr[i].value;
      }
    },
    goBack() {

    },


    getCurrencyType() {
      this.$axios.$post('/api/currency_type'
      ).then(response => {
        this.currencyTypeItems = response;
      }).catch(err => {
        if (err.response.status == 401) {
          this.$auth.logout();
        }
        console.log(err);
      });
    },
    getWeightUnit() {
      this.weight_unit_loading = true;
      this.$axios.$post('/api/weight_measurement'
      ).then(response => {
        this.weightUnitList = response;
      }).catch(err => {
        if (err.response.status == 401) {
          this.$auth.logout();
        }
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
        this.$toast.error(err);
        if (err.response.status == 401) {
          this.$auth.logout();
        }
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
        this.$toast.error(err);
        if (err.response.status == 401) {
          this.$auth.logout();
        }
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
      }).catch(({err}) => {
        if (err.response.status == 401) {
          this.$auth.logout();
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (err.response.status == 400) {
          this.$toast.error(this.$t(`Bad Request`));
        } else if (err.response.status == 403) {
          this.$toast.error(this.$t(`Forbidden`));
        } else if (err.response.status == 404) {
          this.$toast.error(this.$t(`not found`));
        }
      });
    },

  }

}
</script>

<style scoped>
.certificate_text {
  max-width: 300px;
}
.range_item{
  background: #e1e2e3;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 2px;
}
</style>
