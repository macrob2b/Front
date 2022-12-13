<template>
  <v-container class="order-request" fluid>
    <validation-observer ref="observer" v-slot="{invalid}">
      <form @submit.prevent="submitRequest">
        <div class="product-holder">
          <h2 class="headline font-weight-bold mb-2">Product</h2>
          <v-divider class="mb-8"></v-divider>
          <div class="d-flex flex-wrap align-center justify-md-start justify-center">
            <div class="d-flex flex-wrap justify-center align-center ms-md-8 mb-4">
              <nuxt-link
                :to="`/product-details/${productInfo._id}`"
                class="product-img-holder me-3">
                <img :src="getImgFile(productInfo)"
                     :alt="productInfo.title" class="product-image">
              </nuxt-link>
              <nuxt-link :to="`/product-details/${productInfo._id}`"
                         class="font-weight-bold body-2">{{productInfo.title}}</nuxt-link>
            </div>
            <div class="d-flex flex-wrap justify-center ms-md-16 ">
              <div class="px-2">
                <v-text-field
                  v-model="quantity"
                  min="1"
                  label="Quantity"
                  outlined
                  type="number"
                ></v-text-field>
              </div>
              <div class="px-2">
                <v-text-field
                  v-model="price"
                  label="Unit Price"
                  prepend-inner-icon="mdi-currency-usd"
                  min="10"
                  outlined
                  type="number"
                ></v-text-field>
              </div>
            </div>
            <div class="ms-md-16 subtotal-holder">
              <p class="font-weight-bold text-center mb-2">Total price</p>
              <p class="text-center">
                <span class="text-caption">us $</span>
                <span class="title font-weight-bold">{{price*quantity | currency}}</span>
              </p>
            </div>
          </div>
        </div>
        <v-divider class="mb-7"></v-divider>
        <!--    <div class="shipping-holder">-->
        <!--      <h2 class="headline font-weight-bold mb-5">Shipping</h2>-->
        <!--      <v-row class="align-center ma-0">-->
        <!--        <v-col cols="6" md="3">-->
        <!--          <div class="d-flex">-->
        <!--            <P>Preferred Shipping Method</P>-->
        <!--          </div>-->
        <!--        </v-col>-->
        <!--        <v-col cols="6" md="3">-->
        <!--          <v-select-->
        <!--            :items="shippingMethodList"-->
        <!--            label="Unit of measurement"-->
        <!--            outlined-->
        <!--          ></v-select>-->
        <!--        </v-col>-->
        <!--      </v-row>-->
        <!--      <v-row class="align-center ma-0">-->
        <!--        <v-col cols="6" md="3">-->
        <!--          <div class="d-flex">-->
        <!--            <P>- Preferred Trade Terms</P>-->
        <!--          </div>-->
        <!--        </v-col>-->
        <!--        <v-col cols="6" md="3">-->
        <!--          <v-select-->
        <!--            :items="preferredTradeList"-->
        <!--            label="Preferred Trade Terms"-->
        <!--            outlined-->
        <!--          ></v-select>-->
        <!--        </v-col>-->
        <!--      </v-row>-->
        <!--      <v-row class="align-center ma-0">-->
        <!--        <v-col cols="6" md="3">-->
        <!--          <div class="d-flex">-->
        <!--            <P>Expected Date of shipping</P>-->
        <!--          </div>-->
        <!--        </v-col>-->
        <!--        <v-col cols="12" md="9">-->
        <!--          <div class="d-flex flex-wrap align-center">-->
        <!--            <span class="me-10 mb-md-0 mb-4">The expected shipping date(goods arriving) </span>-->
        <!--            <v-text-field-->
        <!--              v-model="expectedShippingDate"-->
        <!--              label="The expected shipping date"-->
        <!--              outlined-->
        <!--              type="date"-->
        <!--            >-->
        <!--            </v-text-field>-->
        <!--          </div>-->
        <!--        </v-col>-->
        <!--      </v-row>-->
        <!--    </div>-->
        <v-divider class="mb-7"></v-divider>
        <div class="final-request-holder" v-show="!msg_sent">
          <h2 class="headline font-weight-bold mb-5">Describe</h2>
          <v-row >
            <v-col cols="12">
               <validation-provider
                 name="describe" rules="required" v-slot="{errors}"
               >
                 <v-textarea
                   label="Please leave any remarks related to products, payment, shipping of other terms related to this order here, other than the information provided above."
                   v-model="describe"
                   :error-messages="errors"
                   outlined
                 ></v-textarea>
               </validation-provider>
            </v-col>
          </v-row>

        </div>
        <!--    <div class="total-holder mt-5 mb-12">-->
        <!--      <div class="rounded-lg pa-md-10 pa-5 total-box">-->
        <!--        <div class="d-flex justify-space-between align-center">-->
        <!--          <p>Subtotal Price</p>-->
        <!--          <p>-->
        <!--            <span class="text-caption">US $ </span>-->
        <!--            <span id="subTotal" class="title font-weight-bold"> 30,000.00 </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--        <div class="d-flex justify-space-between align-center">-->
        <!--          <p>Shipping Cost</p>-->
        <!--          <p>-->
        <!--            <span id="shippingCost" class="title font-weight-bold"> Not decided yet </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--        <v-divider class="my-7"></v-divider>-->
        <!--        <div class="d-flex justify-space-between align-center">-->
        <!--          <p class="title font-weight-bold primary&#45;&#45;text">Total</p>-->
        <!--          <p>-->
        <!--            <span class="text-caption primary&#45;&#45;text">US $ </span>-->
        <!--            <span id="TotalCost" class="title font-weight-bold primary&#45;&#45;text"> 30,000.00 </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--    </div>-->
        <div class="text-center" v-show="!msg_sent">
          <v-btn
            type="submit"
            :disabled="invalid"
            :loading="submit_loading"
            class="text-capitalize text-md-h5 text-body-1 font-weight-bold text--white primary px-md-16 py-md-7">
            Send message
          </v-btn>
        </div>
        <v-row>
          <v-col cols="12">
            <v-alert type="info" v-show="msg_sent">
              Your request sent successfully
            </v-alert>
          </v-col>
        </v-row>
      </form>
    </validation-observer>

  </v-container>
</template>

<script>
import {ValidationObserver,ValidationProvider} from "vee-validate";

export default {
  name:"order-request",
  props:["productInfo"],
  data() {
    return {
      quantity: '',
      price: '',
      describe:'',

      full_describe:'',
      submit_loading:false,
      msg_sent:false
    }
  },
  components:{
    ValidationObserver,
    ValidationProvider
  },
  watch:{
    describe(val){
      this.updateFullDescribe();
    },
    price(val){
      this.updateFullDescribe();
    },
    quantity(val){
      this.updateFullDescribe();
    },
  },
  methods:{
    getImgFile(item) {
      var img = require('assets/img/no-image.png');
      if (item.images && item.images.length > 0)
        img = "/storage/products/" + item._id + "/images/thumbnail/" + item.images[0];
      return img;

    },
    async submitRequest(){
      this.submit_loading = true;
      await this.$axios.$post('/api/send_msg_to_company', {
          company_receiver_id: this.productInfo.company_id,
          user_receiver_id: this.productInfo.user_id,
          message: this.full_describe,
          type: 'order',
          product_id:this.$route.params.id,
          quantity:this.quantity,
          price:this.price,
          total_price:(this.price=this.quantity),
        }
      ).then(response => {
        if (typeof response === 'object') {
          for (let i in response) {
            let error = response[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.describe = '';
          this.msg_sent=true;
          // this.$toast.success('Your message sent successfully')
        }
        this.submit_loading = false;
      }).catch(err => {
        this.submit_loading = false;
      });
      },
    numFormat(val){
      return Number(val).toLocaleString("en-US", {
        // style: "currency",
        currency: "USD"
      })
    },
    updateFullDescribe(){
      this.full_describe=`
         <strong>Request for:</strong> ${this.productInfo.title}
         <br>
         <strong>Qty:</strong> ${this.numFormat(this.quantity)}
         <br>
         <strong>Price:</strong> $${this.numFormat(this.price)}
         <br>
         <strong>Total price:</strong> $${this.numFormat(this.price* this.quantity)}
         <br>
         <strong>Describe</strong> ${this.describe}`;
    }
  }
}
</script>
