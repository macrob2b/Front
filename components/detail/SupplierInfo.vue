<template>
  <v-row class="mt-5">
    <v-col cols="12" md="4" order="2" order-md="1">
      <RequirementCard/>
    </v-col>
    <v-col cols="12" md="8" order="1" order-md="2">
      <Description :productInfo="productInfo" cardTitle="Description by Manufacturer"/>
    </v-col>

    <v-col cols="12" md="6" order="3">
      <v-col style="background-color: #f3f3f3;height: 100%;overflow:auto;" class="rounded-lg">
        <v-row justify="space-between" class="py-4 px-3">
          <v-col class="font-weight-black"> Supplier info
          </v-col>
          <!--      If Have Rate prop-->

        </v-row>
        <v-divider></v-divider>
        <!--    If have description prop  -->
        <v-col>
          <v-simple-table dense class="detail-table">
            <tbody>
            <tr>
              <td class="detail-title">Name</td>
              <td class="detail-value">
                <nuxt-link
                  :to="`/company/${(productInfo.company.username && productInfo.company.username!=='undefined') ? productInfo.company.username : productInfo.company._id}`"
                >
                  {{ productInfo.company && productInfo.company.company_name ? productInfo.company.company_name : '-' }}
                </nuxt-link>
              </td>
            </tr>
            <tr>
              <td class="detail-title">Location</td>
              <td class="detail-value">
                {{ productInfo.company && productInfo.company.country ? productInfo.company.country : '-' }}

              </td>
            </tr>
            <tr>
              <td class="detail-title">Tel</td>
              <td class="detail-value">
                <a
                  :href="`tel:${productInfo.company && productInfo.company.phone ? productInfo.company.phone : ''}`">
                  {{ productInfo.company && productInfo.company.phone ? productInfo.company.phone : '-' }}
                </a>
              </td>
            </tr>
            <tr>
              <td class="detail-title">Email</td>
              <td class="detail-value">
                <a
                  :href="`mailto:${productInfo.company && productInfo.company.email ? productInfo.company.email : ''}`">
                  {{ productInfo.company && productInfo.company.email ? productInfo.company.email : '-' }}
                </a>
              </td>
            </tr>
            </tbody>
          </v-simple-table>

        </v-col>
      </v-col>
    </v-col>


    <v-col cols="12" md="6" order="3">
      <v-col style="background-color: #f3f3f3;height: 100%;overflow:auto;" class="rounded-lg">
        <v-row justify="space-between" class="py-4 px-3">
          <v-col class="font-weight-black"> Packing & Shipping</v-col>
          <!--      If Have Rate prop-->

        </v-row>
        <v-divider></v-divider>
        <!--    If have description prop  -->
        <v-col>
          <v-simple-table dense class="detail-table">
            <tbody>
            <tr>
              <td class="detail-title">Packing</td>
              <td class="detail-value">
                {{
                  productInfo.packing && productInfo.packing.pieces_per_box ? productInfo.packing.pieces_per_box : '-'
                }}
              </td>
            </tr>
            <tr>
              <td class="detail-title">Pack weight</td>
              <td class="detail-value">
                {{ productInfo.packing && productInfo.packing.pack_weight ? productInfo.packing.pack_weight : '-' }}
                {{
                  productInfo.packing && productInfo.packing.pack_weight_unit ? productInfo.packing.pack_weight_unit : ''
                }}
              </td>
            </tr>
            <tr>
              <td class="detail-title">Pack dimension</td>
              <td class="detail-value">
                {{ calcDimension(productInfo) }}
                {{
                  productInfo.packing && productInfo.packing.pack_dimension_unit ? productInfo.packing.pack_dimension_unit : ''
                }}
              </td>
            </tr>
            <tr>
              <td class="detail-title">Shipping carrier</td>
              <td class="detail-value">
                {{ productInfo.shipping_carrier ? productInfo.shipping_carrier : '-' }}
              </td>
            </tr>
            </tbody>
          </v-simple-table>

        </v-col>
      </v-col>
    </v-col>


    <v-col cols="12" md="12" order="3">
      <div style="background-color: #f3f3f3;" class="pb-2 rounded-lg">
        <v-row justify="space-between" class="py-4 px-3">
          <v-col class="font-weight-black">Payment Terms</v-col>
          <!--      If Have Rate prop-->

        </v-row>
        <v-divider></v-divider>
        <!--    If have description prop  -->
        <v-row class="ma-2">
              <div  v-for="item in payment_terms_list" class="pa-2" >
                <v-chip
                  outlined
                  color="success"
                  v-if="productInfo.payment_terms && productInfo.payment_terms.includes(item)">
                  {{item}}
                </v-chip>
                <v-chip
                  outlined
                  color="error"
                  v-else>
                  {{item}}
                </v-chip>
              </div>
        </v-row>
      </div>
    </v-col>


  </v-row>
</template>

<script>
import RequirementCard from "../home/RequirementCard";
import Description from "./Description";

export default {
  props: ['productInfo'],
  components: {RequirementCard, Description},
  data(){
    return{
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
    }
  },
  methods: {
    calcDimension(product_info) {
      if (product_info.packing && product_info.packing.pack_length && product_info.packing.pack_width
        && product_info.packing.height)
        return `${product_info.packing.pack_length}*${product_info.packing.pack_width}*${product_info.packing.pack_height}`;
      else
        return `-`;
    }
  }
}
</script>


<style>
.detail-table {
  background: none !important;
}

.detail-table td {
  border: none !important;
}

.detail-title {
  width: 150px;
  padding-right: 15px;
  color: gray;
}

.detail-value {
  font-weight: bold;
}
</style>
