<template>
  <v-container class="" fluid>
    <div class="contact-us-holder">
      <div class="d-block d-md-none pa-3 pa-sm-5 rounded-lg office-address">
        <!--        <h4>Where to find us</h4>-->
        <!--        <p class="mb-4">-->
        <!--          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in-->
        <!--          some form, by injected humour,-->
        <!--        </p>-->
        <v-row class="ma-0 mb-4">
          <v-col cols="12">
            <div>
              <h4>Address</h4>
              <p class="caption">{{ address }}</p>
            </div>
            <div class="mb-4">
              <h4>Telephone</h4>
              <a :href="`tel:${phone}`" target="_blank" class="caption">{{ phone }}</a>
            </div>
            <div>
              <h4>Email</h4>
              <a :href="`mailto:${email}`" target="_blank" class="caption">{{ email }}</a>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="mb-md-15 mb-4 mapbox ">
        <client-only>
          <l-map id="map" class="rounded-lg show-desktop" :center="[lat,lng-3]" :zoom=5
                 :options="{scrollWheelZoom: false}">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[lat, lng]">
              <l-icon :icon-url="require('~/assets/img/marker-icon-red.png')"></l-icon>
            </l-marker>
          </l-map>
          <l-map id="map" class="show-mobile" :center="[lat-4,lng-3]" :zoom=5>
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[lat, lng]">
              <l-icon :icon-url="require('~/assets/img/marker-icon-red.png')"></l-icon>
            </l-marker>
          </l-map>
        </client-only>
        <div class="d-none d-md-block pa-3 pa-sm-5 rounded-lg office-address">
          <!--          <h4>Where to find us</h4>-->
          <!--          <p class="mb-4">-->
          <!--            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in-->
          <!--            some form, by injected humour,-->
          <!--          </p>-->
          <v-row class="ma-0 mb-4">
            <v-col cols="12">
              <div class="mb-4">
                <h4>Address</h4>
                <p class="caption">{{ address }}</p>
              </div>
              <div class="mb-4">
                <h4>Telephone</h4>
                <a :href="`tel:${phone}`" target="_blank" class="caption">{{ phone }}</a>
              </div>
              <div>
                <h4>Email</h4>
                <a :href="`mailto:${email}`" target="_blank" class="caption">{{ email }}</a>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="contact-form-holder">
        <v-container>
          <h2 class="mb-3">Send us a message</h2>
          <v-divider class="mb-4"></v-divider>
          <div>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <v-form @submit.prevent="submit">
                <v-row class="ma-0 mb-5">
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <validation-provider v-slot="{errors}" name="fullName" rules="required|min:5">
                      <v-text-field
                        v-model="contactUsForm.fullName"
                        :error-messages="errors"
                        label="Full name"
                        outlined
                        placeholder="Denis Cole"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <validation-provider v-slot="{errors}" name="email" rules="required|email">
                      <v-text-field
                        v-model="contactUsForm.email"
                        :error-messages="errors"
                        label="Email"
                        outlined
                        placeholder="sample@gmail.com"
                        required
                      />
                    </validation-provider>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="contactUsForm.phone"
                      label="Telephone"
                      outlined
                      placeholder="+909380009900"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="contactUsForm.website"
                      label="Website"
                      outlined
                      placeholder="https://www.macrob2b.com"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <validation-provider v-slot="{errors}" name="message" rules="required|min:15">
                      <v-textarea
                        v-model="contactUsForm.message"
                        :error-messages="errors"
                        label="Message"
                        outlined
                        placeholder="Write your message here"
                        required
                        rows="6"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="contactUsForm.attachFile"
                      class="w-50"
                      accept="image/*"
                      label="Attach file"
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" class="btn-container">
                    <v-btn class="primary px-10" :disabled="invalid"
                           type="submit"
                           :loading="submitLoading"
                    >Send Message
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

            </validation-observer>

          </div>
        </v-container>
      </div>
    </div>
  </v-container>
</template>
<script>
import {ValidationObserver, ValidationProvider, validate} from "vee-validate";

export default {
  auth: false,
  data() {
    return {
      address: 'Mecidiyekoy, Mecidiyekoy Yolu Cd. No:9, 34387 Sisli/Istanbul',
      phone: '+90 5350384909',
      email: 'info@macrob2b.com',
      lat: 41.067369,
      lng: 28.9929992,
      contactUsForm: {
        fullName: '',
        email: '',
        website: '',
        message: '',
        phone: '',
        attachFile: []
      },
      submitLoading: false
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  head() {
    return {
      title: "Contact us"
    }
  },
  methods: {
    submit() {
      this.submitLoading = true;
      let formData = new FormData;
      for (let key in this.contactUsForm) {
        if (key === 'attachFile')
          formData.append(key, this.contactUsForm[key]);
        else
          formData.append(key, JSON.stringify(this.contactUsForm[key]));
      }

      this.$axios.$post('/api/submit_contact_us', formData
        , {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      ).then(response => {
        if (typeof response === 'object') {
          for (let i in response) {
            let error = response[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.$toast.success("Your message sent successfully");
          this.$router.push({
            path:"/"
          });
        }
      }).catch(err => {
        this.$toast.error("An error occurred");
      }).finally(() => {
        this.submitLoading = false;
      });
    }
  }
}
</script>
