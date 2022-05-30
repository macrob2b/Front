<template>
  <div>
    <v-card height="auto" class="mt-8 buying-leads-banner">
      <v-img :src="require('../../assets/img/buying_leads_banner.webp')" class="pa-8" cover
             :max-height="$vuetify.breakpoint.xsOnly ? 'auto' : '400px'">
        <v-card-title class="white--text">
          <h3> How one request - get multiple quotes</h3>
        </v-card-title>
        <p class="white--text">How does it work? Easy!</p>
        <ul class="white--text">
          <li>Submit your Request for Quotation.</li>
          <li>Receive multiple quotations.</li>
          <li>Select the quotation you prefer.</li>
          <li>Negotiate with the seller</li>
          <li>Secure you transaction by placing your order on MacroB2B</li>
        </ul>

        <v-btn
          class="white--text"
          color="#fb641e"
          @click="goToBuyingReq"
        >
          Create Buying Request
        </v-btn>
      </v-img>
    </v-card>

    <v-dialog
      v-model="login_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Buying lead submit
        </v-card-title>

        <v-card-text>
          For submit buying lead, first you need to login to MacroB2B
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>


          <v-btn
            color="green darken-1"
            text
            to="/login"
          >
            Go to login page
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "buying-leads-banner",
  data() {
    return {
      login_dialog: false
    }
  },
  methods: {
    goToBuyingReq() {
      if (!this.$auth.loggedIn)
        this.login_dialog = true;
      else
        this.$router.push({
          path: '/user/buying-lead/add'
        })
    }
  }
}
</script>

<style scoped>

.buying-leads-banner p {
  font-size: 25px !important;
  margin-left: 20px;
}

.buying-leads-banner ul {
  font-size: 20px !important;
  margin-bottom: 20px;
  margin-left: 35px;
}

.buying-leads-banner button {
  margin-left: 35px !important;

}

@media only screen and (max-width: 600px) {
  .buying-leads-banner h3 {
    font-size: 18px;

  }

  .buying-leads-banner p {
    font-size: 17px !important;
  }

  .buying-leads-banner ul {
    font-size: 14px !important;
    margin-left: 16px;
  }

  .buying-leads-banner button {
    margin-left: 25px;
    font-size: 10px;

  }

}
</style>

