<template>
  <div>
    <v-row>
      <v-col
        cols="12"
      >
        <h2>Edit password</h2>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>

    <validation-observer ref="observer" v-slot="{invalid}">
      <form @submit.prevent="updatePass">
        <v-row class="mt-6 mb-12">
          <v-col cols="12" md="3">
            <validation-provider name="old_password" v-slot="{errors}" rules="required|min:8">
              <v-text-field
                type="password"
                v-model="form.old_password" label="Old password"
                outlined
                :error-messages="errors"
                :append-icon="showOldPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showOldPass ? 'text' : 'password'"
                @click:append="showOldPass= !showOldPass"
              />
            </validation-provider>
          </v-col>
          <v-col cols="12" md="3">
            <validation-provider name="password" v-slot="{errors}" rules="required|min:8">
              <v-text-field v-model="form.password"
                            type="password"
                            :error-messages="errors"
                            label="New Password"
                            outlined
                            :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showNewPass ? 'text' : 'password'"
                            @click:append="showNewPass=!showNewPass"
              />
            </validation-provider>
          </v-col>
          <v-col cols="12" md="3">
            <validation-provider rules="required|min:8|confirmed:password" v-slot="{errors}" name="password_confirmation">
              <v-text-field
                :error-messages="errors"
                v-model="form.password_confirmation" label="Confirm new password"
                outlined
                :append-icon="showNewPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showNewPassConfirm ? 'text' : 'password'"
                @click:append="showNewPassConfirm=!showNewPassConfirm"
              />
            </validation-provider>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              :disabled="invalid"
              class="primary"
              x-large
              :loading="submit_loading"
              type="submit">
              Apply
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </validation-observer>

  </div>
</template>

<script>
import {ValidationProvider, ValidationObserver} from "vee-validate";

export default {
  layout: 'user_dashboard',
  name: "edit-pass",
  head() {
    return {
      title: "Edit password"
    }
  },
  data() {
    return {
      form: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      showOldPass:false,
      showNewPass:false,
      showNewPassConfirm:false,
      submit_loading:false
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    updatePass() {
      this.submit_loading=true;
      this.$axios.$post('/api/update_pass', this.form)
        .then(response => {
          if (response.error == 'not_match')
            this.$toast.error("Old password is incorrect");
          else
            this.$toast.success("Changed successfully");
        }).catch(err => {
        this.$toast.error("An error occurred");
      }).finally(()=>{
        this.submit_loading=false;
      })
    }
  }
}
</script>

<style scoped>

</style>
