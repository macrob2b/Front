<template>
  <div>
    <h1>Edit {{cateTitle}} category and its properties</h1>
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
        <v-form
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
                Filed type
              </th>
              <th class="text-left">
                Label
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
      title: 'Edit '+this.cateTitle+' category and its properties'
    }
  },
  data() {
    return {
      cateTitle: null,
      submit_btn: 'Update',
      property_submit_btn: 'Create',
      field_type: [
        'Text',
        'Select',
        'Radio',
        'Checkbox',
        'Textarea',
      ],
      label: "",
      field_type_val: "",
      optionValues: null,
      final_option_val_string: null,
      propertyList: []
    }
  },
  mounted() {
    this.loadCategory();
    this.getPropertyList();
  },
  watch: {
    optionValues(newVal, oldVal) {
      this.final_option_val_string = newVal.split('\n').join('|');
    }
  },
  methods: {
    loadCategory(event) {
      const response = this.$axios.$post('/api/find_category', {id: this.$route.params.id}).then(response => {
        this.cateTitle = response.title
      }).catch(e => {
        this.$toast.error('Error on loading');

      });
    },
    updateCategory() {
      const response = this.$axios.$put('/api/update_category',
        {id: this.$route.params.id, title: this.cateTitle}).then(response => {
        this.$toast.success('Updated successfully');
        this.$router.go(-1);
      }).catch(e => {
        this.$toast.error('Error on updating');

      });
    },
    addCateProperty() {
      this.property_submit_btn = 'Creating, please wait...';
      const response = this.$axios.$post('/api/create_cate_property',
        {
          cate_id: this.$route.params.id,
          field_type: this.field_type_val,
          label: this.label,
          values: this.final_option_val_string
        }).then(response => {
        this.$toast.success('Property Created successfully');
        this.label = "";
        this.field_type_val = "";
        this.optionValues = "";
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
  }
}
</script>

<style scoped>

</style>
