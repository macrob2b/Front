<template>
  <div>
    <h1>Edit {{ cateTitle }} category and its properties</h1>
    <hr class="mt-5 mb-5">
    <v-tabs vertical
            background-color="deep-cyan accent-4" dark
            class="text-left"
    >
      <v-tab>
        <v-icon>mdi-plus</v-icon>
        Edit title
      </v-tab>
      <v-tab>
        <v-icon>mdi-plus</v-icon>
        Add property
      </v-tab>
      <v-tab-item class="px-12">
        <h3>Edit</h3>
        <v-row class="mt-12 mb-12"  v-if="loading_edit_page">
          <v-col cols="12" class="text-center">
            <v-progress-circular
              :size="50"
              :width="5"
              color="orange"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
        <v-form
          v-else
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-text-field
            v-model="cateTitle"
            :counter="10"
            label="Title"
            required
          ></v-text-field>


          <v-btn
            color="success"
            class="mr-4"
            :loading="submit_loading"
            @click="updateCategory"
          >
            {{ this.submit_btn }}
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="goBack"
          >
            Cancel
          </v-btn>

        </v-form>
      </v-tab-item>


      <v-tab-item class="px-12">
        <h2>Add property</h2>
        <v-form>
          <v-row>
            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="field_source"
                v-model="field_source_val"
                @change="fieldSourceChange"
                label="Field Source"
              ></v-select>

            </v-col>
            <v-col
              v-if="field_source_val=='From reusable'"
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="reusableFieldList"
                v-model="selectedReusable"
                @change="reusableFieldChange()"
                item-text="label"
                item-value="_id"
                label="Reusable field list"
              ></v-select>

            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-select
                :items="field_type"
                v-model="field_type_val"
                label="Field type"
              ></v-select>

            </v-col>
            <v-col
              class="d-flex"
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="label"
                label="Label"
              ></v-text-field>
            </v-col>

            <v-col
              v-if="field_type_val=='Select' || field_type_val=='Radio' || field_type_val=='Checkbox'"

              class="d-flex"
              cols="12"

            >
              <v-textarea
                v-model="optionValues"
                label="Value(s), Separate by enter"
                placeholder="Separate by enter"
                hint="Separate by enter"
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
            >

              <v-checkbox
                label="Required field"
                color="red darken-3"
                :value="true"
                v-model="required_field"
              ></v-checkbox>


            </v-col>


            <v-col
              cols="12"
              v-if="field_source_val=='Generate new'"
            >

              <v-checkbox
                label="Reusable field"
                :value="true"
                v-model="reusable_field"
              ></v-checkbox>


            </v-col>
          </v-row>

          <v-btn
            color="success"
            class="mr-4"
            @click="addCateProperty"
          >
            {{ this.property_submit_btn }}
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="goBack"
          >
            Cancel
          </v-btn>
        </v-form>

        <v-simple-table class="mt-12">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Field type
              </th>
              <th class="text-left">
                Label
              </th>
              <th class="text-left">
                Required
              </th>
              <th class="text-left">
                Preview
              </th>
              <th class="text-left">
                Action
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="item in propertyList"
              :key="item.name"
            >
              <td>{{ item.field_type }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.required_field == true ? "Yes" : "No" }}</td>
              <td>
                <span
                  v-if="item.field_type=='Text'"
                >
                  <v-text-field
                    :label="item.label"
                  >
                  </v-text-field>
                </span>
                <span
                  v-else-if="item.field_type=='Select'"
                >
                  <v-select
                    :items="item.values"
                    :label="item.label"
                  >
                  </v-select>
                </span>
                <span
                  v-else-if="item.field_type=='Radio'"
                >
                   <p>{{ item.label }}</p>
                    <v-radio-group
                      mandatory
                    >
                      <v-radio
                        v-for="(radio_val,index) in item.values"
                        :label="radio_val.label"
                        :value="radio_val.val"
                      ></v-radio>

                    </v-radio-group>
                </span>
                <span
                  v-else-if="item.field_type=='Checkbox'"
                >
                   <p>{{ item.label }}</p>
                      <v-checkbox
                        v-for="(checkbox_val,index) in item.values"
                        :label="checkbox_val.label"
                        :value="checkbox_val.val"
                      ></v-checkbox>
                </span>
                <span
                  v-else-if="item.field_type=='Textarea'"
                >
                   <v-textarea
                     :label="item.label"
                   ></v-textarea>
                </span>


              </td>
              <td>
                <v-btn icon
                       @click="deleteProperty(item._id)"
                >
                  <v-icon small
                          class="mr-2">mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
    </v-tabs>


  </div>
</template>


<script>
export default {
  middleware: ['auth', 'is_admin'],
  name: "category.vue",
  layout: "admin",
  head() {
    return {
      title: 'Edit ' + this.cateTitle + ' category and its properties'
    }
  },
  data() {
    return {
      cateTitle: null,
      submit_btn: 'Update',
      submit_loading:false,
      loading_edit_page:false,
      property_submit_btn: 'Create',
      field_type: [
        'Text',
        'Select',
        'Radio',
        'Checkbox',
        'Textarea',
      ],
      field_source: [
        'Generate new',
        'From reusable',
        'General field'
      ],
      reusableFieldList: [],
      selectedReusable: null,
      field_source_val: 'Generate new',
      label: "",
      field_type_val: "",
      optionValues: null,
      optionValuesArr: [],
      final_option_val_string: null,
      propertyList: [],
      required_field: false,
      reusable_field: true,
      general_field: false,
    }
  },
  mounted() {
    this.loadCategory();
    this.getPropertyList();
  },
  watch: {
    optionValues(newVal, oldVal) {
      this.final_option_val_string = newVal.split('\n').join('|');
    },
    field_source_val(newVal){
      if (newVal=="General field")
        this.general_field=true;
      else
        this.general_field=false;
    }
  },
  methods: {
    loadCategory(event) {
      this.loading_edit_page=true;
      const response = this.$axios.$post('/api/find_category', {id: this.$route.params.id}).then(response => {
        this.cateTitle = response.title
        this.loading_edit_page=false;
      }).catch(e => {
        this.$toast.error('Error on loading');
        this.loading_edit_page=false;
      });
    },
    updateCategory() {
      this.submit_loading=true;
      const response = this.$axios.$put('/api/update_category',
        {id: this.$route.params.id, title: this.cateTitle}).then(response => {
        this.$toast.success('Updated successfully');
        this.submit_loading=false;
        this.$router.go(-1);
      }).catch(e => {
        this.$toast.error('Error on updating');
        this.submit_loading=false;
      });
    },
    async addCateProperty() {
      this.property_submit_btn = 'Creating, please wait...';
      const response = await this.$axios.$post('/api/create_cate_property',
        {
          cate_id: this.$route.params.id,
          field_type: this.field_type_val,
          label: this.label,
          values: this.final_option_val_string,
          required_field: this.required_field,
          reusable_field: this.reusable_field,
          general_field: this.general_field
        }).then(response => {
        this.$toast.success('Property Created successfully');
        this.label = "";
        this.field_type_val = "";
        this.optionValues = "";
        this.field_source_val = "Generate new";
        this.reusable_field = "";
        this.required_field = false;
        this.selectedReusable = "";
        this.getPropertyList();
        this.property_submit_btn = 'Create';
      }).catch(e => {
        this.$toast.error('Error on creating');
        this.property_submit_btn = 'Create';

      });
    },
    getPropertyList() {
      this.propertyList = [];
      const response = this.$axios.$post('/api/get_cate_property',
        {
          cate_id: this.$route.params.id
        }).then(response => {
        this.propertyList = response;
      }).catch(e => {
        this.$toast.error('Error on loading property');

      });
    },
    deleteProperty(id) {
      const response = this.$axios.$delete('/api/delete_cate_property',
        {
          params: {
            id: id
          }
        }).then(response => {
        this.$toast.success('Deleted successfully');
        this.getPropertyList();
        // this.$router.go(-1);
      }).catch(e => {
        this.$toast.error('Error on deleting');

      });
    },
    goBack() {
      this.$router.go(-1);
    },
    fieldSourceChange() {
      this.label = "";
      this.field_type_val = "";
      this.optionValues = "";
      this.required_field = false;
      this.reusable_field = false;

      if (this.field_source_val == 'From reusable') {
        this.reusable_field = false;
        this.getReusableProperty();
      }
    },
    getReusableProperty() {
      this.reusableFieldList = [];
      this.selectedReusable = null;
      const response = this.$axios.$post('/api/get_cate_reusable_property',
      ).then(response => {
        this.reusableFieldList = response;
      }).catch(e => {
        this.$toast.error('Error on loading property');

      });
    },
    reusableFieldChange() {
      this.label = "";
      this.field_type_val = "";
      this.optionValues = "";
      this.required_field = false;
      this.reusable_field = false;


      this.findProperty(this.selectedReusable);
    },
    findProperty(id) {
      const response = this.$axios.$post('/api/find_property',
        {
          id: id
        }
      ).then(response => {
        this.field_type_val = response.field_type;
        this.label = response.label;
        this.required_field = response.required_field;
        if (!(this.field_type_val == "Text" || this.field_type_val == 'Textarea')) {
          if (this.field_type_val == 'Select')
            this.optionValues = response.values.join("\n");
          else {
            for (var i = 0; i < response.values.length; i++) {
              this.optionValuesArr[i] = response.values[i].label;
            }
            console.log(this.optionValuesArr);

            this.optionValues = this.optionValuesArr.join("\n");
          }
        }
        console.log(response);
        // this.reusableFieldList = response;
      }).catch(e => {
        this.$toast.error('Error on loading property');

      });
    },
  }
}
</script>

<style scoped>

</style>
