<template>
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
        <h2>{{ $t(`LOGIN`) }}</h2>
        <v-divider class="mt-2 mb-6"></v-divider>
        <form @submit.prevent="submit">
          <v-row>

            <!--     Email     -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{ errors }" name="emailOrPhone" rules="required">
                <v-text-field
                  v-model="emailOrPhone"
                  :disabled="formLoader"
                  :error-messages="errors"
                  :label="$t(`E_MAIL`) + ' ' + $t(`OR`) + ' ' + $t(`PHONE_NUMBER`)"
                  outlined
                  required>
                </v-text-field>
              </validation-provider>
            </v-col>

            <!-- Password  -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{errors}" name="password" rules="required">
                <v-text-field
                  v-model="password"
                  type="password"
                  :disabled="formLoader"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :error-messages="errors"
                  hide-details
                  :label="$t(`PASSWORD`)"
                  outlined>
                </v-text-field>
                <nuxt-link class="ma-2 d-inline-block" to="/forget_pass">Forgot password?</nuxt-link>
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
                {{ $t(`LOGIN`) }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-btn
                to="register"
                class="rounded-lg"
                large
                block
                nuxt>
                {{ $t(`SIGN_UP`) }}
              </v-btn>
            </v-col>
          </v-row>

          <div class="mt-5">
            <p class="d-inline-block">{{ $t(`SIGN_IN_WITH`) + ':' }}</p>
            <v-btn icon class="ml-2 mr-2" @click="loginWithGoogle()">
              <v-icon large color="red">mdi-google</v-icon>
            </v-btn>
<!--            <v-btn icon class="ml-2 mr-2" @click="loginWithFacebook()">-->
<!--              <v-icon large color="blue">mdi-facebook</v-icon>-->
<!--            </v-btn>-->
            <v-btn icon class="ml-2 mr-2" @click="loginWithLinkedIn()">
              <v-icon large color="blue">mdi-linkedin</v-icon>
            </v-btn>
          </div>

        </form>
      </validation-observer>
    </v-col>
  </v-row>
</template>

<script>

import {ValidationProvider, ValidationObserver} from "vee-validate";

export default {
  name: 'login',
  auth: 'guest',
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
    emailOrPhone: '',
    password    : '',
    showPassword: false,
    formLoader  : false,
  }),
  mounted() {
  },
  methods: {
    async submit() {
      this.formLoader = true;
      await this.$auth.loginWith('local', {
        data   : {
          username: this.emailOrPhone,
          password: this.password
        },
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        this.formLoader = false;
        this.$auth.setUserToken(response.data.token);
        this.$toast.success(this.$t(`LOGIN_SUCCESSFUL`));
        this.$router.push({
          path: "/user-dashboard"
        })
      }).catch(({response}) => {
        this.formLoader = false;
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
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
