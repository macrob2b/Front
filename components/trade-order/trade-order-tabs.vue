<template>
  <div class="trade-order-tabs-holder">
    <v-tabs
      v-model="tab"
      class="trade-order-tabs rounded-lg"
    >
      <v-tab>
        Order Request
      </v-tab>
      <v-tab>
        Negotiating
      </v-tab>
      <v-tab>
        Order Confirmed
      </v-tab>
      <v-tab>
        Funded to Escrow
      </v-tab>
      <v-tab>
        Shipped
      </v-tab>
      <v-tab>
        Completed Order
      </v-tab>
    </v-tabs>
    <div class="company-details-items">
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <order-request/>
        </v-tab-item>
        <v-tab-item></v-tab-item>
        <v-tab-item></v-tab-item>
        <v-tab-item></v-tab-item>
        <v-tab-item></v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import orderRequest from "~/pages/trade-order/order-request"

export default {
  components: {
    orderRequest,
  },
  data() {
    return {
      tab: null
    }
  },
  mounted() {
  }
}
</script>


