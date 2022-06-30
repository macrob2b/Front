<template>
  <v-card class="card" color="transparent" height="100%">
    <div class="header py-5">
      <span>Tell us your <span> Buying </span> Requirement</span>
    </div>
    <div class="px-5 mb-5">
      <v-progress-linear
        value="15"
        height="1.5px"
        color="primary"
      />
    </div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <div class="px-5 py-1">
          <validation-provider v-slot="{errors}" name="product_name" rules="required|min:4">
            <v-text-field
              v-model="form.product_name"
              :error-messages="errors"
              label="Enter product" outlined dense/>
          </validation-provider>
        </div>
        <div class="px-5 py-1">
          <validation-provider v-slot="{errors}" name="detail" rules="required|min:5">
            <v-textarea
              v-model="form.detail"
              outlined no-resize name="input-7-4"
              :error-messages="errors"
              label="Detail"/>
          </validation-provider>
        </div>

        <div class="px-5 py-1">
          <validation-provider v-slot="{errors}" name="full_name" rules="required|min:5">
            <v-text-field
              v-model="form.full_name"
              label="Full name" outlined dense/>
          </validation-provider>
        </div>
        <div class="px-5 py-1">
          <validation-provider v-slot="{errors}" name="email" rules="required|email">
            <v-text-field
              v-model="form.email"
              :error-messages="errors"
              label="Business email" outlined dense/>
          </validation-provider>
        </div>
        <div class="px-5 pt-1 pb-10">
          <v-btn color="primary"
                 type="submit"
                 :disabled="invalid"
                 :loading="submit_loading"
                 width="100%"><span id="span1"> Submit </span></v-btn>
        </div>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: 'requirement_card',
  components:{
    ValidationProvider,
    ValidationObserver,
  },
  data(){
    return{
      form:{
        productName:''
      },
      submit_loading:false,
    }
  },
  methods: {
    async submit(){
      this.submit_loading=true;
      await this.$axios.$post('/api/create_buying_requirement',
        this.form)
        .then(response=>{
           if (typeof response==="object")
             for (let i in response) {
               let error = response[i][0];
               this.$toast.error(error);
               // break;
             }
             else
               this.$toast.success("Your request has been successfully submitted");
        }).finally(()=>{
          this.submit_loading=false;
        })
    }
  }
};
</script>

<style scoped>
#span1 {
  color: white
}

.header span span {
  color: primary;
}

.header {
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
}


.card {
  background-color: #f0f0f0 !important;
}

.v-input >>> .v-text-field__details {
  display: none;
}

.v-text-field--outlined >>> fieldset {
  border-width: 2px;
  border-color: #1111;
}

.v-text-field >>> .fieldset {
  border-width: 4px;
}
</style>
