<template>
  <v-row>
    <v-col>
      <ContainerCard width="100%">
        <ProductContainer title="LATEST BUY OFFERS">
          <!-- <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div> -->
          <div class="px-6">
            <v-simple-table>
              <tbody>
                <tr v-for="item in products1" :key="item.name">
                  <td>
                    <div class="d-flex justify-start ml-1 align-center">
                      <img
                        style="width: auto; height: 48px"
                        class="pa-2"
                        v-show="!$vuetify.breakpoint.xs"
                        :srcset="item.img"
                      />
                      <div class="mx-3">{{ item.country }}</div>
                      <v-divider class="my-3" vertical></v-divider>
                    </div>
                  </td>

                  <td style="text-align: left">
                    {{ item.title }}
                  </td>

                  <td style="text-align: right">
                    <div class="d-flex justify-end ml-5 align-center">
                      <v-divider class="mx-2" vertical> </v-divider>
                      <div>
                        {{ item.date }}
                      </div>
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
        <ProductContainer title="LATEST PRODUCTS">
          <!-- <div class="d-flex justify-center">
            <ProductCard2 />
            <ProductCard2 />
            <ProductCard2 />
          </div> -->
          <div class="px-6">
            <v-simple-table>
              <tbody>
                <tr v-for="item in products2" :key="item.name">
                  <td>
                    <div class="d-flex justify-start ml-1 align-center">
                      <img
                        style="width: auto; height: 48px"
                        class="pa-2"
                        v-show="!$vuetify.breakpoint.xs"
                        :srcset="item.img"
                      />
                      <div class="mx-3">{{ item.country }}</div>
                      <v-divider class="my-3" vertical></v-divider>
                    </div>
                  </td>

                  <td style="text-align: left">
                    {{ item.title }}
                  </td>

                  <td style="text-align: right">
                    <div class="d-flex justify-end ml-5 align-center">
                      <v-divider class="mx-2" vertical> </v-divider>
                      <div>
                        {{ item.date }}
                      </div>
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
  components: { ContainerCard, ProductContainer, ProductCard2 },
  data() {
    return {
      products1: [
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
      ],
      products2: [
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
        {
          img: "flag-thumbnail.jpg",
          country: "China",
          title: "Crystal",
          date: "03-Jun",
        },
      ],
    };
  },
};
</script>

<style scoped>
tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.05);
}
@media screen and (max-width : 600px) and (min-width : 320px){
  td{
    padding-right:2px !important;
    padding-left:2px !important;
  }
}
</style>