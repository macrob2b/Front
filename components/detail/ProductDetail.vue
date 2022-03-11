<template>
  <div>
    <section class="product-info pa-md-5" v-if="loading">
      <v-row class="mt-12 mb-12">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            :size="50"
            :width="5"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </section>
    <section class="product-info pa-md-5" v-else>
      <h1 class="text-h4">
        {{ productDetails.title }}
      </h1>

      <!--  Product Rate  -->
      <v-rating
        class="d-none d-md-block"
        v-model="rating"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        half-increments
        hover
      ></v-rating>

      <v-divider class="my-3"></v-divider>

      <!-- Information List    -->
      <v-list class="transparent">
        <v-list-item v-for="(info, i) in productDetails.attribute" :key="i">
          <v-list-item-content>
            <v-row no-gutters>
              <v-col cols="12" lg="6">
                <strong>{{ i }}:</strong>
                {{ info }}
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!--Share-->
      <Share v-show="!$vuetify.breakpoint.xs"
             :companyId="productDetails.company_id"
      />

      <v-row v-show="$vuetify.breakpoint.xs">
        <v-col
          cols="6" lg="auto"
          align-self="center"
          class="d-flex mx-lg-4 pa-2 rounded-lg  justify-space-between align-center grey lighten-2 text-md-body-2"
        >
          <v-icon

            color="white"
            style="background-color: #444;border-radius:5px"
            class="ml-1 mr-3 pa-1"
            small
          >
            mdi-phone
          </v-icon>
          Contact supplier
        </v-col>
        <v-col cols="6" class="px-0">
          <Stars/>
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="12">
          <div v-if="productDetails.price_type=='base_on_qty'">
            <v-simple-table>
              <tbody>
              <tr v-for="item in productDetails.price">
                <td><strong>Qty:</strong>
                  <span v-if="item.max_qty>0">
                    {{ item.min_qty }} ~ {{ item.max_qty }}
                  </span>
                  <span v-else>
                    ≥{{ item.min_qty }}
                  </span>
                </td>
                <td>{{ item.value | currencyFormatted }} {{ item.currency }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </div>
          <div v-else>
            <v-col cols="12">
              <strong>Price range: </strong>
              {{productDetails.price.min_value |currencyFormatted}} ~ {{productDetails.price.max_value | currencyFormatted }} {{ productDetails.price.currency }}
            </v-col>
          </div>
        </v-col>
      </v-row>
      <v-row class="ml-md-4 mt-8 d-flex align-center justify-space-between justify-lg-start px-0">
        <v-col cols="3" lg="4" class="px-lg-0 mb-lg-5 mb-lg-0 mr-lg-8">
          <v-btn
            :to="'/trade-order/'+this.$route.params.id"
            block
            color="grey darken-2 "
            dark
            x-large
            elevation="1"
          >
            <v-icon>
              mdi-cart-plus
            </v-icon>
            <span class="d-none d-md-block">Start Order</span>
          </v-btn>
        </v-col>

      </v-row>


    </section>
  </div>
</template>


<script>
import Count from "./Count";
import Stars from "./Stars";
import Share from "./Share";

export default {
  components: {
    Count,
    Stars,
    Share
  },
  props: ['productDetails'],
  filters: {
    currencyFormatted: function (value) {
      return Number(value).toLocaleString("en-US", {
        // style: "currency",
        currency: "USD"
      });
    },
  },
  data() {
    return {
      productDetails: {},
      infos: [
        {
          label: "Brand Name",
          value: "AAA"
        },
        {
          label: "Place Of Origin",
          value: "AAA"
        },
        {
          label: "Condition",
          value: "AAA"
        },
        {
          label: "Model Number",
          value: "AAA"
        },
        {
          label: "Supply Type",
          value: "AAA"
        },
        {
          label: "Color",
          value: "AAA"
        },
      ],
      price: "195.562 $",
      loading: false,
      rating: 5,
    }
  },
  mounted() {
    if (this.productDetails.rate)
      this.rating = this.productDetails.rate / this.productDetails.rate_count;
  },
  methods: {}
}
</script>

<style scoped>

</style>
