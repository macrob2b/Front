<template>
  <v-container class="order-request" fluid>
    <div class="product-holder">
      <h2 class="headline font-weight-bold mb-2">Product</h2>
      <v-divider class="mb-8"></v-divider>
      <div class="d-flex flex-wrap align-center justify-md-start justify-center">
        <div class="d-flex flex-wrap justify-center align-center ms-md-8 mb-4">
          <div class="product-img-holder me-3">
            <img :src="require('~/assets/img/' + product.image)" alt="" class="product-image">
          </div>
          <span class="font-weight-bold body-2">Sweet Potato Bread</span>
        </div>
        <div class="d-flex flex-wrap justify-center ms-md-16 quantity-price-holder">
          <div class="px-2">
            <p><span></span>Quantity</p>
            <v-text-field
              v-model="quantity"
              class=""
              outlined
              type="number"
            ></v-text-field>
          </div>
          <div class="px-2">
            <p><span></span>Measure Unit</p>
            <v-text-field
              v-model="measureUnit"
              class=""
              outlined
              type="number"
            ></v-text-field>
          </div>
          <div class="px-2">
            <p><span></span>Unit Price</p>
            <v-text-field
              v-model="product.price"
              append-icon="mdi-currency-usd"
              class="rtl"
              outlined
              type="number"
            ></v-text-field>
          </div>
        </div>
        <div class="ms-md-16 subtotal-holder">
          <p class="font-weight-bold text-center mb-2">Total price</p>
          <p class="text-center">
            <span class="text-caption">us $ </span>
            <span class="title font-weight-bold">30000</span>
          </p>
        </div>
      </div>
    </div>
    <v-divider class="mb-7"></v-divider>
    <div class="shipping-holder">
      <h2 class="headline font-weight-bold mb-5">Shipping</h2>
      <v-row class="align-center ma-0">
        <v-col cols="6" md="3">
          <div class="d-flex">
            <P>Preferred Shipping Method</P>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            :items="shippingMethodList"
            label="Unit of measurement"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="align-center ma-0">
        <v-col cols="6" md="3">
          <div class="d-flex">
            <P>- Preferred Trade Terms</P>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <v-select
            :items="preferredTradeList"
            label="Preferred Trade Terms"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="align-center ma-0">
        <v-col cols="6" md="3">
          <div class="d-flex">
            <P>Expected Date of shipping</P>
          </div>
        </v-col>
        <v-col cols="12" md="9">
          <div class="d-flex flex-wrap align-center">
            <span class="me-10 mb-md-0 mb-4">The expected shipping date(goods arriving) </span>
            <v-text-field
              v-model="expectedShippingDate"
              label="The expected shipping date"
              outlined
              type="date"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-divider class="mb-7"></v-divider>
    <div class="final-request-holder">
      <h2 class="headline font-weight-bold mb-5">Final Request</h2>
      <v-row>
        <v-col cols="12">
          <v-textarea
            label="Please leave any remarks related to products, payment, shipping of other terms related to this order here, other than the information provided above."
            name="finalRequest"
            outlined
            required
          ></v-textarea>
        </v-col>
      </v-row>

    </div>
    <div class="total-holder mt-5 mb-12">
      <div class="rounded-lg pa-md-10 pa-5 total-box">
        <div class="d-flex justify-space-between align-center">
          <p>Subtotal Price</p>
          <p>
            <span class="text-caption">US $ </span>
            <span id="subTotal" class="title font-weight-bold"> 30,000.00 </span>
          </p>
        </div>
        <div class="d-flex justify-space-between align-center">
          <p>Shipping Cost</p>
          <p>
            <span id="shippingCost" class="title font-weight-bold"> Not decided yet </span>
          </p>
        </div>
        <v-divider class="my-7"></v-divider>
        <div class="d-flex justify-space-between align-center">
          <p class="title font-weight-bold primary--text">Total</p>
          <p>
            <span class="text-caption primary--text">US $ </span>
            <span id="TotalCost" class="title font-weight-bold primary--text"> 30,000.00 </span>
          </p>
        </div>
      </div>
    </div>
    <div class="text-center">
      <v-btn class="text-capitalize text-md-h5 text-body-1 font-weight-bold text--white primary px-md-16 py-md-7">Start
        Order Now
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      quantity: 10,
      measureUnit: '',
      product: {
        image: 'product.jpg',
        name: '',
        price: '200',
      },
      shippingMethodList: ['sea', 'air', 'express'],
      preferredTradeList: ['FOB', 'FAS', 'CPT', 'CIP'],
      expectedShippingDate: ''
    }
  }
}
</script>
