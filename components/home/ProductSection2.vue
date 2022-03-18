<template>
  <v-row>
    <v-col>
      <ContainerCard width="100%">
        <ProductContainer
          title="CUSTOMIZED PRODUCTS"
          link="/product-list?product_type=customize"
        >
          <!-- <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div> -->
          <div class="px-6">
            <v-simple-table>
              <tbody>
              <tr class="mt-12 mb-12" v-if="customized_loading">
                <td colspan="3" class="text-center">
                  <v-progress-circular
                    :size="40"
                    :width="3"
                    color="orange"
                    indeterminate
                  ></v-progress-circular>
                </td>
              </tr>
              <tr v-else v-for="item in customized_products">
                <td>
                  <nuxt-link class="d-flex justify-start ml-1 align-center"
                             :to="'/product-details/'+item._id"
                  >
                    <gb-flag
                      :code="item.company.country_code" class="mr-2"/>

                    <div class="mx-3">{{ item.company.country }}</div>
                    <v-divider class="my-3" vertical></v-divider>
                  </nuxt-link>
                </td>

                <td id="td1">
                  <nuxt-link :to="'/product-details/'+item._id">
                    {{ item.title }}
                  </nuxt-link>
                </td>

                <td id="td2">
                  <div class="d-flex justify-end ml-5 align-center">
                    <v-divider class="mx-2" vertical></v-divider>
                    <nuxt-link :to="'/product-details/'+item._id">
                      {{ item.created_at }}
                    </nuxt-link>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </div>
        </ProductContainer>
      </ContainerCard>
    </v-col>
    <v-col>
      <ContainerCard width="100%">
        <ProductContainer
          title="READY-TO-SHIP PRODUCTS"
          link="/product-list?product_type=ready-to-ship"
        >
          <!-- <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div> -->
          <div class="px-6">
            <v-simple-table>
              <tbody>
              <tr class="mt-12 mb-12" v-if="ready_to_ship_loading">
                <td colspan="3" class="text-center">
                  <v-progress-circular
                    :size="40"
                    :width="3"
                    color="orange"
                    indeterminate
                  ></v-progress-circular>
                </td>
              </tr>
              <tr v-else v-for="item in ready_to_ship_products">
                <td>
                  <nuxt-link
                    :to="'/product-details/'+item._id"
                    class="d-flex justify-start ml-1 align-center">
                    <gb-flag :code="item.company.country_code" class="mr-2"/>

                    <div class="mx-3">{{ item.company.country }}</div>
                    <v-divider class="my-3" vertical></v-divider>
                  </nuxt-link>
                </td>

                <td>
                  <nuxt-link :to="'/product-details/'+item._id">
                    {{ item.title }}
                  </nuxt-link>
                </td>

                <td>
                  <div class="d-flex justify-end ml-5 align-center">
                    <v-divider class="mx-2" vertical></v-divider>
                    <nuxt-link :to="'/product-details/'+item._id">
                      {{ item.created_at }}
                    </nuxt-link>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </div>
        </ProductContainer>
      </ContainerCard>
    </v-col>
  </v-row>
</template>

<script>
import ProductCard2 from "../product/ProductCard2.vue";
import ContainerCard from "./ContainerCard.vue";
import ProductContainer from "./ProductContainer.vue";

export default {
  components: {ContainerCard, ProductContainer, ProductCard2},
  data() {
    return {
      customized_products: {},
      ready_to_ship_products: {},

      customized_loading: false,
      ready_to_ship_loading: false,
    };
  },
  mounted() {
    this.getProducts('customize');
    this.getProducts('ready_to_ship');
  },
  methods: {
    async getProducts(product_type) {
      if (product_type == 'customize')
        this.customized_loading = true;
      else if (product_type == 'ready_to_ship')
        this.ready_to_ship_loading = true;

      await this.$axios.$post('/api/product_list'
        , {
          take: 6,
          by_company: true,
          product_type: product_type
        })
        .then(response => {
          if (product_type == 'customize') {
            this.customized_products = response;
            this.customized_loading = false;
          } else if (product_type == 'ready_to_ship') {
            this.ready_to_ship_products = response;
            this.ready_to_ship_loading = false;
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
