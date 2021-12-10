<template>
  <v-row class="mt-2 mb-2">

    <v-col class="d-md-flex d-lg-flex d-none">
      <v-img
        :src="`Designs/signup.svg`"
        aspect-ratio="1">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate></v-progress-circular>
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
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{errors}" name="fullName" rules="required">
                <v-text-field
                  v-model="firstName"
                  :error-messages="errors"
                  :label="$t(`FIRST_NAME`)"
                  outlined>
                </v-text-field>
              </validation-provider>
            </v-col>

            <!--     Last Name       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{errors}" name="fullName" rules="required">
                <v-text-field
                  v-model="lastName"
                  :error-messages="errors"
                  :label="$t(`LAST_NAME`)"
                  outlined>
                </v-text-field>
              </validation-provider>
            </v-col>

            <!--     Email       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  :label="$t(`E_MAIL`)"
                  outlined>
                </v-text-field>
              </validation-provider>
            </v-col>

            <!--     Phone Number       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="pt-0 pb-0">
              <validation-provider v-slot="{errors}" ref="phoneNumberProvider" name="phoneNumber"
                                   rules="required|phone">
                <!--       Hidden field for validation         -->
                <input hidden v-model="phoneNumber">
                <PhoneNumberInput @numberEntered="changePhoneNumber" :model="phoneNumber" :errors="errors"/>
              </validation-provider>
            </v-col>

            <!--     Gender       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider class="d-flex flex-row" v-slot="{errors}" name="gender" rules="required">
                <v-select
                  v-model="gender"
                  :items="genders"
                  item-text="name"
                  item-value="value"
                  :label="$t(`GENDER`)"
                  outlined>
                </v-select>
              </validation-provider>
            </v-col>

            <!--     Business Type       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider class="d-flex flex-row" v-slot="{errors}" name="businessType" rules="required">
                <v-select
                  v-model="businessType"
                  :items="businessTypes"
                  item-text="name"
                  item-value="value"
                  :label="$t(`I_AM_A`)"
                  multiple
                  outlined>
                </v-select>
              </validation-provider>
            </v-col>

            <!--     Company Name       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider class="d-flex flex-row" v-slot="{errors}" name="companyName" rules="required">
                <v-text-field
                  v-model="companyName"
                  :error-messages="errors"
                  :label="$t(`COMPANY_NAME`)"
                  outlined>
                </v-text-field>
              </validation-provider>
            </v-col>

            <!--     MY Business Location       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{ errors }" name="businessLocation" rules="required">
                <v-text-field
                  v-model="businessLocationName"
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
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider v-slot="{errors}" name="password" rules="required|min:8">
                <v-text-field
                  v-model="password"
                  type="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :error-messages="errors"
                  :label="$t(`PASSWORD`)"
                  outlined>
                </v-text-field>
              </validation-provider>
            </v-col>

            <!--     Confirm Password       -->
            <v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pt-0 pb-0">
              <validation-provider name="confirmPassword" v-slot="{errors}" rules="required|min:8|confirmed:password">
                <v-text-field
                  v-model="confirmPassword"
                  type="password"
                  :error-messages="errors"
                  :label="$t(`CONFIRM_PASSWORD`)"
                  outlined>
                </v-text-field>
              </validation-provider>
            </v-col>

          </v-row>

          <!--     Accept Terms       -->
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
</template>

<script>

import {ValidationObserver, ValidationProvider, validate} from "vee-validate";
import LeafletMap                                         from "../components/leafletMap/LeafletMap";
import PhoneNumberInput                                   from "../components/phoneNumberInput";

export default {
  name      : "signup",
  auth      : 'guest',
  components: {
    PhoneNumberInput,
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
      phoneNumber           : '',
      businessLocation      : '',
      businessLocationName  : '',
      businessType          : '',
      acceptTerms           : false,
      showPassword          : false,
      businessLocationDialog: false,
    };
  },
  computed: {
    genders      : () => {
      return [
        {name: 'Male', value: 'male'},
        {name: 'Female', value: 'female'},
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
    async submit() {
      let checkRegister = await this.$axios.post('register', {
        "first_name"       : this.firstName,
        "last_name"        : this.lastName,
        "mobile_num"       : this.phoneCode + this.phoneNumber,
        "email"            : this.email,
        "password"         : this.password,
        "gender"           : this.gender,
        "role"             : this.businessType.join(),
        "business_location": this.businessLocation
      });

      // Handler of signup api
      if (checkRegister.status == 200) {
        await this.$auth.setUserToken(checkRegister.data.token);
      }

    },
    selectLocation(location) {
      this.businessLocation     = location.lat + ',' + location.lng;
      this.businessLocationName = location.locationName;
    },
    loginWithGoogle() {
      this.$auth.loginWith('google', {params: {prompt: "select_account"}})
    },
    loginWithFacebook() {
      this.$auth.loginWith('facebook')
    },
    loginWithLinkedIn() {
      this.$auth.loginWith('linkedin')
    },
    changePhoneNumber(event) {
      this.phoneNumber = event;
      const field      = this.$refs.phoneNumberProvider;
      field.validate();
    }
  },
}
</script>

<style scoped>

</style>
