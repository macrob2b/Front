<template>
  <div>
    <v-row>
      <v-col class="d-md-flex d-lg-flex d-none">
        <v-img
          :src="`Designs/signup.webp`"
          aspect-ratio="1">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <h2>Forget password</h2>
          <v-divider class="mt-2 mb-6"></v-divider>
          <form @submit.prevent="submit">
            <v-row>

              <!--     Email     -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
                <validation-provider v-slot="{ errors }" name="emailOrPhone" rules="required|email">
                  <v-text-field
                    v-model="email"
                    :disabled="formLoader"
                    :error-messages="errors"
                    label="Email address"
                    outlined
                    required
                  >
                  </v-text-field>
                </validation-provider>
              </v-col>


            </v-row>

            <v-row class="mt-0">
              <v-col cols="12" md="4" lg="4" xl="4">
                <v-btn
                  class="rounded-lg"
                  color="primary"
                  type="submit"
                  :disabled="invalid"
                  :loading="formLoader"
                  large
                  block>
                  Send reset Email
                </v-btn>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4">
                <v-btn
                  to="/login"
                  class="rounded-lg"
                  large
                  block
                  nuxt>
                  Back to login
                </v-btn>
              </v-col>
            </v-row>


          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {ValidationProvider, ValidationObserver} from "vee-validate";

export default {
  name: "forget_pass",
  auth: false,
  head() {
    return {
      title: 'Forget password'
    }
  },
  data() {
    return {
      email: null,
      formLoader: false
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async submit() {
      this.formLoader = true;
      this.$axios.$post('/api/forget_pass'
        , {email: this.email})
        .then(res => {
          if (res == 'success'){
            this.$toast.success("Reset email sent");
            this.$router.push({
              path:'/login'
            })
          }
          else if (res === 'short_time_request')
            this.$toast.info('It is only possible to send a request every 5 minutes');
          else if (res === 'error')
            this.$toast.error("An error occured")
          else if (res == 'not_found')
            this.$toast.error("No user found with this email");

        }).catch(err => {
        this.$toast.error("An error occured")
      }).finally(() => {
        this.formLoader = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
