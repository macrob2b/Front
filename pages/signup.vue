<template>
  <v-container>
    <v-row class="mt-2">

      <v-col class="d-md-flex d-lg-flex d-none">
        <v-img
          :src="`https://picsum.photos/500/300?image=165`"
          :lazy-src="`https://picsum.photos/10/6?image=165`"
          aspect-ratio="1"
          class="grey lighten-2">
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>

      <v-col>
        <h2>{{ $t(`SIGN_UP`) }}</h2>
        <v-divider class="mt-2 mb-6"></v-divider>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">

            <!--     Business Location Map Dialog       -->
            <v-dialog
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
              v-model="businessLocationDialog">
              <v-card>
                <v-toolbar
                  color="primary"
                  outlined
                  dark>
                  <v-toolbar-title>{{ $t(`SELECT_BUSINESS_LOCATION`) }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn
                      text
                      color="white"
                      @click="businessLocationDialog = false">
                      {{ $t(`SELECT`) }}
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>

                <LeafletMap @locationSelected="selectLocation"/>

              </v-card>
            </v-dialog>

            <v-row>

              <!--     First Name       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider v-slot="{errors}" name="fullName" rules="required">
                  <v-text-field
                    v-model="firstName"
                    prepend-inner-icon="mdi-account-outline"
                    :error-messages="errors"
                    :label="$t(`FIRST_NAME`)"
                    outlined>
                  </v-text-field>
                </validation-provider>
              </v-col>
              <!--     Last Name       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider v-slot="{errors}" name="fullName" rules="required">
                  <v-text-field
                    v-model="lastName"
                    prepend-inner-icon="mdi-account"
                    :error-messages="errors"
                    :label="$t(`LAST_NAME`)"
                    outlined>
                  </v-text-field>
                </validation-provider>
              </v-col>

              <!--     Email       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                  <v-text-field
                    v-model="email"
                    prepend-inner-icon="mdi-email"
                    :error-messages="errors"
                    :label="$t(`E_MAIL`)"
                    outlined>
                  </v-text-field>
                </validation-provider>
              </v-col>

              <!--     Phone Number       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="mb-8">
                <validation-provider v-slot="{errors}" name="companyName" rules="required">
                  <v-text-field
                    v-model="phoneNumber"
                    :error-messages="errors"
                    :label="$t(`PHONE_NUMBER`)"
                    :height="55"
                    hide-details
                    outlined>
                    <template slot="prepend-inner">
                      <v-select class="phoneCodeSelect"
                                v-model="phoneCode"
                                :items="phoneCodes"
                                item-text="name"
                                item-value="code"
                                flat
                                solo
                                dense>
                      </v-select>
                    </template>
                  </v-text-field>
                </validation-provider>
              </v-col>

              <!--     Gender       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider class="d-flex flex-row" v-slot="{errors}" name="gender" rules="required">
                  <v-select
                    v-model="gender"
                    :items="genders"
                    item-text="name"
                    item-value="value"
                    prepend-inner-icon="mdi-gender-male-female"
                    :label="$t(`GENDER`)"
                    outlined>
                  </v-select>
                </validation-provider>
              </v-col>

              <!--     Business Type       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider class="d-flex flex-row" v-slot="{errors}" name="businessType" rules="required">
                  <v-select
                    v-model="businessType"
                    :items="businessTypes"
                    item-text="name"
                    item-value="value"
                    prepend-inner-icon="mdi-handshake-outline"
                    :label="$t(`I_AM_A`)"
                    multiple
                    outlined>
                  </v-select>
                </validation-provider>
              </v-col>

              <!--     Company Name       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider class="d-flex flex-row" v-slot="{errors}" name="companyName" rules="required">
                  <v-text-field
                    v-model="companyName"
                    prepend-inner-icon="mdi-domain"
                    :error-messages="errors"
                    :label="$t(`COMPANY_NAME`)"
                    outlined>
                  </v-text-field>
                </validation-provider>
              </v-col>

              <!--     MY Business Location       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider v-slot="{ errors }" name="businessLocation" rules="required">
                  <v-text-field
                    v-model="businessLocation"
                    append-icon="mdi-crosshairs-gps"
                    @click:append="businessLocationDialog = !businessLocationDialog"
                    :error-messages="errors"
                    :label="$t(`MY_BUSINESS_LOCATION`)"
                    outlined
                    readonly>
                  </v-text-field>
                </validation-provider>
              </v-col>

              <!--     Password       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider v-slot="{errors}" name="password" rules="required">
                  <v-text-field
                    v-model="password"
                    type="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    @click:append="showPassword = !showPassword"
                    :error-messages="errors"
                    :label="$t(`PASSWORD`)"
                    outlined>
                  </v-text-field>
                </validation-provider>
              </v-col>

              <!--     Confirm Password       -->
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <validation-provider name="confirmPassword" v-slot="{errors}" rules="required|confirmed:password">
                  <v-text-field
                    v-model="confirmPassword"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    :error-messages="errors"
                    :label="$t(`CONFIRM_PASSWORD`)"
                    outlined>
                  </v-text-field>
                </validation-provider>
              </v-col>

            </v-row>

            <validation-provider v-slot="{errors}" name="acceptTerms" :rules="{ required: { allowFalse: false } }">
              <v-checkbox v-model="acceptTerms"
                          :label="$t(`ACCEPT_TERMS`)">
              </v-checkbox>
            </validation-provider>

            <v-row>
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <v-btn
                  class="rounded-lg"
                  large
                  color="primary"
                  type="submit"
                  :disabled="invalid"
                  block>
                  {{ $t(`CREATE_MY_ACCOUNT`) }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6" class="ma-0">
                <v-btn
                  to="login"
                  class="rounded-lg"
                  large
                  block
                  nuxt>
                  {{ $t(`SIGN_IN`) }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="pt-3">
              <v-col cols="12" class="ma-0 pl-3 pr-2 pb-0 pt-0">
                <p class="d-inline-block">
                  {{ $t(`OR`) + ' ' + $t(`SIGN_IN_WITH`) }}:
                </p>
                <v-btn icon class="ml-2 mr-2" @click="loginWithGoogle()">
                  <v-icon large color="red">mdi-google</v-icon>
                </v-btn>
                <v-btn icon class="ml-2 mr-2" @click="loginWithFacebook()">
                  <v-icon large color="blue">mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon class="ml-2 mr-2" @click="loginWithLinkedIn()">
                  <v-icon large color="blue">mdi-linkedin</v-icon>
                </v-btn>
              </v-col>
            </v-row>

          </form>
        </validation-observer>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

import {ValidationObserver, ValidationProvider} from "vee-validate";
import LeafletMap                               from "../components/LeafletMap";

export default {
  name      : "signup",
  auth      : 'guest',
  components: {
    LeafletMap,
    ValidationProvider,
    ValidationObserver,
  },
  head() {
    return {
      title: this.$t(`SIGN_UP`)
    };
  },
  data() {
    return {
      email                 : '',
      password              : '',
      confirmPassword       : '',
      gender                : '',
      firstName             : '',
      lastName              : '',
      companyName           : '',
      phoneCode             : '',
      phoneNumber           : '',
      businessLocation      : '',
      businessType          : '',
      searchLocationValue   : '',
      acceptTerms           : false,
      showPassword          : false,
      businessLocationDialog: false,
    };
  },
  computed: {
    genders      : () => {
      return [
        {name: 'Male', value: 1},
        {name: 'Female', value: 0},
      ];
    },
    phoneCodes   : () => {
      return [
        '+98',
        '+70',
        '+4589',
      ];
    },
    businessTypes: () => {
      return [
        'Buyer',
        'Seller',
        'Agent',
      ];
    }
  },
  methods : {
    submit() {
      this.$refs.observer.validate();
    },
    searchLocation() {
      console.log(this.searchLocationValue);
    },
    selectLocation(position) {
        this.businessLocation = position.lat + ',' + position.lng;
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
  },
}
</script>

<style scoped>
.phoneCodeSelect {
  width: 90px;
  margin-top: -8px;
}
</style>
