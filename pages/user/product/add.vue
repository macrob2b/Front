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
                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>

                    </v-list-item-content>
                  </v-list-item>

                </template>


              </v-combobox>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                v-model="categoryVal"
                :items="cateItems"
                :loading="isLoading"
                :search-input.sync="cate_search"
                chips
                clearable
                hide-details
                hide-selected
                item-text="title"
                item-value="_id"
                label="Category"
                outlined
              ></v-autocomplete>
            </v-col>

          </v-row>
        </v-container>
        <v-container v-if="cateProperty.length>0">
          <v-row class="mb-2">
            <v-col cols="12">
              <h3>Category property</h3>
            </v-col>
          </v-row>
          <v-divider></v-divider>


          <v-row class="mt-2">
            <v-col
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
                    @input="applayCatVal($event, item.label)"
                  >
                  </v-text-field>
                </span>
              <span
                v-else-if="item.field_type=='Select'"
              >
                  <v-select
                    :items="item.values"
                    :label="item.label"
                    @input="applayCatVal($event, item.label)"
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
                      @change="applayCatVal($event, item.label)"
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
                     @input="applayCatVal($event, item.label)"
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
                  <v-text-field label="Label" :value="item.label" @input="applayLabelVal($event,index)" class="mr-2"
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
          <v-row class="mt-4 text-center">
            <v-col cols="12">
              <v-btn
                color="primary"
                class="mr-4"
                :loading="formLoader"
                @click="submitProduct"
                large
              >
                Create
              </v-btn>

              <v-btn
                class="mr-4"
                large
                @click="goBack"
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
    isLoading: false,
    cateItems: [],
    categoryVal: null,
    cate_search: null,

    cateProperty: [],


    productNameVal: null,

    keywordVal: null,
    keywordItems: [],
    keyword_search: null,

    fields: {},
    catPropertyVal: {},
    dynamicAttr: [],
    formLoader:false
  }),
  watch: {
    categoryVal(val) {
      this.loadProperty(val);
    },
    async cate_search(val) {
      // Items have already been loaded
      if (this.cateItems.length > 0) return

      this.isLoading = true

      // Lazily load input items

      await this.$axios.$post('/api/main_cate_list', {
        keyword: this.cate_search
      })
        .then(res => {
          this.cateItems = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  methods: {
    async loadProperty(catid) {
      await this.$axios.$post('/api/get_cate_property', {
        cate_id: catid
      })
        .then(res => {
          this.cateProperty = res
        })
        .catch(err => {
          console.log(err)
        })

    },
    applayCatVal(value, field) {
      console.log(value);
      this.catPropertyVal[field] = value;
    },
    applayLabelVal(value, index) {
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
    // applayCatValCheckbox(value, field, field_item) {
    //   this.fields[field_item] = value;
    //   this.catPropertyVal[field] = fields;
    // },
    async submitProduct() {
      this.formLoader = true;
      this.updateAttrFromCustom();
      var data = {
        title: this.productNameVal,
        keyword: this.keywordVal,
        cate_id: this.categoryVal,
        attribute: this.catPropertyVal
      };
      await this.$axios.$post('/api/create_product', data)
        .then(res => {
          this.formLoader = false;
          if (res.length == 0){
            this.$toast.success("Product create successfully");
            this.$router.push({
              path:'/user/product'
            });
          }
          else
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

    }
  }

}
</script>

<style scoped>

</style>
