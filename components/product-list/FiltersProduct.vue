<template>
  <div class="my-12 my-md-4">

<!--    <v-container class="filter-container">-->
<!--      <h3>Certificate Type</h3>-->
<!--      <v-card-->
<!--        flat-->
<!--        v-scroll.self="onScroll"-->
<!--        class="overflow-y-auto"-->
<!--        max-height="150"-->
<!--      >-->
<!--        <v-checkbox v-for="item in certificate_type_arr"-->
<!--                    v-model="filterForm.certificate_type"-->
<!--                    :label="item.title"-->
<!--                    :value="item.title"-->
<!--                    hide-details="true"-->
<!--                    multiple-->
<!--                    class="small"-->
<!--        />-->
<!--      </v-card>-->
<!--    </v-container>-->


    <v-container class="filter-container">
      <h3>Color</h3>
      <v-card
        flat
        v-scroll.self="onScroll"
        class="overflow-y-auto"
        max-height="150"
      >
        <v-checkbox v-for="item in color_list"
                    :label="item"
                    :value="item"
                    hide-details="true"
                    multiple
                    v-model="filterForm.color"
                    class="small"
        />
      </v-card>
    </v-container>

    <v-container class="filter-container">
      <div
        v-for="(item,index) in property_filters"
        cols="12"

      >
        <h3>{{ item.label }}</h3>
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
                  <v-autocomplete
                    :return-object="true"
                    :items="item.values"
                    :label="item.label"
                    @input="applyCatVal($event, item.label)"
                    outlined
                  >
                  </v-autocomplete>
                </span>
        <span
          v-else-if="item.field_type=='Radio'"
        >
                    <v-radio-group
                      class="mt-0"
                      mandatory

                    >
                      <v-radio
                        v-for="(radio_val,index) in item.values"
                        :label="radio_val.label"
                        :value="radio_val.val"

                      ></v-radio>

                    </v-radio-group>
        </span>
        <div
          class="mb-6"
          v-else-if="item.field_type=='Checkbox'"
        >
          <v-card
            flat
            v-scroll.self="onScroll"
            class="overflow-y-auto"
            max-height="150"
          >
            <v-checkbox v-for="(val,index) in item.values"
                        v-model="filterForm[item.machine_name]"
                        :label="val.label"
                        :value="val.label"
                        hide-details="true"
                        multiple
                        class="small"
            />
          </v-card>

        </div>
        <span
          v-else-if="item.field_type=='Textarea'"
        >
                   <v-textarea
                     outlined
                     :label="item.label"
                     @input="applyCatVal($event, item.label)"
                   ></v-textarea>
                </span>
      </div>
    </v-container>


    <v-container class="filter-container">
      <h3>Payment terms</h3>
      <v-card
        flat
        v-scroll.self="onScroll"
        class="overflow-y-auto"
        max-height="150"
      >
        <v-checkbox v-for="item in payment_terms_list"
                    :label="item"
                    :value="item"
                    hide-details="true"
                    multiple
                    v-model="filterForm.payment_term"
                    class="small"
        />
      </v-card>
    </v-container>


  </div>
</template>

<script>

export default {
  name: "FilterContainer",
  auth: false,
  data() {
    return {
      scrollInvoked: 0,
      certificate_type_arr: [],
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
      color_list:[
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Purple',
        'Pink',
        'Orange',
        'Brown',
        'Black',
        'White',
        'Gray',
        'Gold',
        'Silver',
        'Navy blue',
        'Sky blue',
        'Lime green',
        'Teal',
        'Indigo',
        'Magenta',
        'Violet',
        'Khaki',
        'Salmon',
        'Crimson',
        'Lavender',
        'Plum',
        'Blue violet',
        'Olive',
        'Cyan',
        'Maroon',
        'Beige'
      ],

      property_filters: [],
      filterForm: {
        certificate_type: [],
        payment_term: [],
        color:[]
      }
    }
  },
  mounted() {
    this.getPropertyFilterList();
    // this.getCertificateType();
  },
  watch: {
    filterForm: {
      handler(val, old_val) {
        this.$emit('filterChanged', val)
      },
      deep: true
    },
    "$route.query.cate_id"(val) {
      this.getPropertyFilterList();
    }
  },
  methods: {
    onScroll() {
      this.scrollInvoked++
    },
    async getPropertyFilterList() {
      await this.$axios.$post('/api/property_filter_builder',
        {
          cate_id: this.$route.query.cate_id
        })
        .then(response => {
          this.property_filters = response;
        }).catch(err => {

        });
    },
    getCertificateType() {
      this.$axios.post('/api/certificate_type',
        {}).then(response => {
        this.certificate_type_arr = response.data;
      });
    },

  }
}
</script>


<style scoped>
.v-input--selection-controls {
  margin-top: 0 !important;
}

.v-list-item--dense .v-list-item__content, .v-list--dense .v-list-item .v-list-item__content {
  padding: 0 !important;
}

.v-list-item--dense, .v-list--dense .v-list-item {
  min-height: unset;
  padding: 2px 0;
}

.filter-container {
  /*max-height: calc(100vh - 150px);*/
  overflow: auto;
}

</style>
