<template>
  <v-container class="trade-order" fluid>
    <v-row>
      <v-col
        cols='12'
      >
        <div class="order-request-holder">
          <div class="header">
            <div class="d-flex align-center header-title-holder mb-2">
              <v-icon class="mdi-rotate-90 me-3">mdi-triangle</v-icon>
              <h1 class="text-h5 font-weight-bold header-title">Start Order</h1>
            </div>
            <div class="pa-10 rounded-lg mb-2 header-description">
              <p class="text-white ">
                Try to make an offer to this seller. Please note that this is just making an offer, not final condition.<br>
                When the seller check your order, the seller will either confirm this order as you offered, or readjust
                the condition and send back to you.<br>
                Also please make sure your contact information is correct ( View and Edit ).<br>
                Your order will be sent directly to the seller and will not be publicly displayed.
              </p>
            </div>
          </div>
          <trade-order-tabs></trade-order-tabs>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from '../../components/company/side-bar'
import tradeOrderTabs from '../../components/trade-order/trade-order-tabs'

export default {
  auth:false,
  components: {
    SideBar,
    tradeOrderTabs
  }
}
</script>
