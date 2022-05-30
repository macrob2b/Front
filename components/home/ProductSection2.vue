<template>
  <v-row>
    <v-col cols="12" md="6">
        <ProductContainer
          title="Buying leads"
          link="/product-list?lead_type=buy"
        >
          <!-- <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div> -->
          <div class="px-md-6">
            <v-simple-table>
              <tbody>
              <tr class="mt-12 mb-12" v-if="buying_loading">
                <td colspan="3" class="text-center">
                  <v-progress-circular
                    :size="40"
                    :width="3"
                    color="orange"
                    indeterminate
                  ></v-progress-circular>
                </td>
              </tr>
              <tr v-else v-for="item in buying_leads">
                <td>
                  <nuxt-link class="d-flex justify-start ml-1 align-center"
                             :to="'/buying-leads'"
                  >
                    <gb-flag
                      :code="item.company && item.company.country_code ? item.company.country_code  : ''" class="mr-2"/>

                    <div class="mx-3">{{ item.company.country ? item.company.country  : '' }}</div>
                    <v-divider class="my-3" vertical></v-divider>
                  </nuxt-link>
                </td>

                <td id="td1">
                  <nuxt-link :to="'/buying-leads/'">
                    {{ item.subject }}
                  </nuxt-link>
                </td>

                <td id="td2">
                  <div class="d-flex justify-end ml-5 align-center">
                    <v-divider class="mx-2" vertical></v-divider>
                    <nuxt-link :to="'/buying-leads/'">
                      {{ item.created_at }}
                    </nuxt-link>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </div>
        </ProductContainer>
    </v-col>
    <v-col cols="12" md="6">
        <ProductContainer
          title="Selling leads"
          link="/product-list?lead_type=ready-to-ship"
        >
          <!-- <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div> -->
          <div class="px-md-6">
            <v-simple-table>
              <tbody>
              <tr class="mt-12 mb-12" v-if="selling_loading">
                <td colspan="3" class="text-center">
                  <v-progress-circular
                    :size="40"
                    :width="3"
                    color="orange"
                    indeterminate
                  ></v-progress-circular>
                </td>
              </tr>
              <tr v-else v-for="item in selling_leads">
                <td>
                  <nuxt-link
                    :to="'/selling-leads'"
                    class="d-flex justify-start ml-1 align-center">
                    <gb-flag :code="item.company && item.company.country_code ? item.company.country_code  : ''" class="mr-2"/>

                    <div class="mx-3">{{ item.company.country ? item.company.country  : ''  }}</div>
                    <v-divider class="my-3" vertical></v-divider>
                  </nuxt-link>
                </td>

                <td>
                  <nuxt-link :to="'/selling-leads'">
                    {{ item.subject }}
                  </nuxt-link>
                </td>

                <td>
                  <div class="d-flex justify-end ml-5 align-center">
                    <v-divider class="mx-2" vertical></v-divider>
                    <nuxt-link :to="'/selling-leads/'">
                      {{ item.created_at }}
                    </nuxt-link>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </div>
        </ProductContainer>
    </v-col>
  </v-row>
</template>

<script>
import ProductCard2 from "../product/ProductCard2.vue";
import ProductContainer from "./ProductContainer.vue";

export default {
  components: {ProductContainer, ProductCard2},
  data() {
    return {
      buying_leads: {},
      selling_leads: {},

      buying_loading: false,
      selling_loading: false,
    };
  },
  mounted() {
    this.getLeads('buy');
    this.getLeads('sell');
  },
  methods: {
    async getLeads(lead_type) {
      if (lead_type == 'buy')
        this.buying_loading = true;
      else if (lead_type == 'sell')
        this.selling_loading = true;

      await this.$axios.$post('/api/trading_leads'
        , {
          take: 6,
          type: lead_type
        })
        .then(response => {
          if (lead_type == 'buy') {
            this.buying_leads = response;
            this.buying_loading = false;
          } else if (lead_type == 'sell') {
            this.selling_leads = response;
            this.selling_loading = false;
          }
        }).catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
#img1 {
  width: auto;
  height: 48px
}

#td1 {
  width: auto;
  height: 48px
}

#td2 {
  text-align: right
}

#td3 {
  text-align: left
}

#td4 {
  text-align: right
}

#span1 {
  text-align: left
}

tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

@media screen and (max-width: 600px) and (min-width: 320px) {
  td {
    padding-right: 2px !important;
    padding-left: 2px !important;
  }
}
</style>
