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
              <td class="detail-value">{{productInfo.packing && productInfo.packing.pieces_per_box ? productInfo.packing.pieces_per_box : '-'}}</td>
            </tr>
            <tr>
              <td class="detail-title">Pack weight</td>
              <td class="detail-value">
                {{productInfo.packing && productInfo.packing.pack_weight ? productInfo.packing.pack_weight : '-'}}
                 {{productInfo.packing && productInfo.packing.pack_weight_unit ? productInfo.packing.pack_weight_unit : ''}}
              </td>
            </tr>
            <tr>
              <td class="detail-title">Pack dimension</td>
              <td class="detail-value">
                {{calcDimension(productInfo)}}
                 {{productInfo.packing && productInfo.packing.pack_dimension_unit ? productInfo.packing.pack_dimension_unit : ''}}
              </td>
            </tr>
            <tr>
              <td class="detail-title">Shipping carrier</td>
              <td class="detail-value">
                 {{productInfo.shipping_carrier ? productInfo.shipping_carrier : '-'}}
              </td>
            </tr>
            </tbody>
          </v-simple-table>

        </v-col>
      </v-col>
    </v-col>


  </v-row>
</template>

<script>
import RequirementCard from "../home/RequirementCard";
import Description from "./Description";

export default {
  props: ['productInfo'],
  components: {RequirementCard, Description},
  methods:{
    calcDimension(product_info){
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
.detail-table{
  background: none!important;
}
.detail-table td{
  border: none!important;
}
.detail-title{
  width: 150px;
  padding-right: 15px;
  color: gray;
}

.detail-value{
  font-weight: bold;
}
</style>
