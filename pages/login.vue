<template>
  <v-col sm="12" md="6" lg="4" offset-lg="4" offset-md="3">
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-card>
        <v-card-title>{{ $t(`LOGIN`) }}</v-card-title>
        <v-card-text>
          <form @submit.prevent="submit">
            <validation-provider v-slot="{ errors }" name="email" rules="required|email">
              <v-text-field
                v-model="email"
                prepend-inner-icon="mdi-email"
                :error-messages="errors"
                :label="$t(`E_MAIL`)"
                required>
              </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{errors}" name="password" rules="required">
              <v-text-field
                v-model="password"
                type="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
                :error-messages="errors"
                :label="$t(`PASSWORD`)">
              </v-text-field>
            </validation-provider>
            <v-btn
              color="primary"
              block
              type="submit"
              :disabled="invalid">
              {{ $t(`LOGIN`) }}
            </v-btn>

            <v-divider class="mt-5 mb-2"></v-divider>

            <p>{{ $t(`SIGN_IN_WITH`) + ':' }}</p>
            <v-btn icon class="ml-2 mr-2" @click="loginWithGoogle()">
              <v-icon x-large color="red">mdi-google</v-icon>
            </v-btn>
            <v-btn icon class="ml-2 mr-2" @click="loginWithFacebook()">
              <v-icon x-large color="blue">mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon class="ml-2 mr-2" @click="loginWithLinkedIn()">
              <v-icon x-large color="blue">mdi-linkedin</v-icon>
            </v-btn>

          </form>
        </v-card-text>
      </v-card>
    </validation-observer>
  </v-col>
</template>

<script>

import {ValidationProvider, ValidationObserver} from "vee-validate";

export default {
  name: 'login',
  head() {
    return {
      title: this.$t('LOGIN')
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data      : () => ({
    email       : '',
    password    : '',
    showPassword: false,
  }),
  methods   : {
    submit() {
      this.$refs.observer.validate();
    },
    loginWithGoogle() {
      this.$auth.loginWith('google', {params: {prompt: "select_account"}})
    },
    loginWithFacebook() {
      this.$auth.loginWith('facebook')
    },
    loginWithLinkedIn() {
      this.$auth.loginWith('linkedin')
    }
  }
}
</script>
