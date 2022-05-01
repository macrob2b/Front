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
              <a :href="`tel:${phone}`" target="_blank" class="caption" >{{ phone }}</a>
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
          <l-map id="map" class="show-mobile" :center="[lat-4,lng-3]" :zoom=5  >
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
                <a :href="`tel:${phone}`" target="_blank" class="caption" >{{ phone }}</a>
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
            <v-form>
              <v-row class="ma-0 mb-5">
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="userName"
                    :rules="nameRules"
                    label="name *"
                    outlined
                    placeholder="John Thompson"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="userEmail"
                    :rules="emailRules"
                    label="Email *"
                    outlined
                    placeholder="sample@sample"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="userPhone"
                    label="Telephone"
                    outlined
                    placeholder="09380009900"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="userWebpage"
                    label="Webpage"
                    outlined
                    placeholder="sample.sample"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="userMessage"
                    :rules="massageRules"
                    label="Message *"
                    outlined
                    placeholder="Write your message here"
                    required
                    rows="6"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="userAttachFile"
                    class="w-50"
                    counter
                    label="File input"
                    multiple
                    small-chips
                    outlined
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-form>
            <div class="btn-container">
              <v-btn class="primary px-10">Send Message</v-btn>
            </div>
          </div>
        </v-container>
      </div>
    </div>
  </v-container>
</template>
<script>

export default {
  auth:false,
  data() {
    return {
      address: 'Mecidiyekoy, Mecidiyekoy Yolu Cd. No:9, 34387 Sisli/Istanbul',
      phone: '+90 5350384909',
      email: 'info@macrob2b.com',
      lat: 41.067369,
      lng: 28.9929992,
      userName: '',
      nameRules: [
        name => !!name || 'name is required'
      ],
      userEmail: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      userWebpage: '',
      userMessage: '',
      massageRules: [
        message => !!message || 'message is required'
      ],
      userPhone: '',
      userAttachFile: []
    }
  },
  head() {
    return {
      title: "Contact us"
    }
  },
}
</script>
