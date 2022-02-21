<template>
  <div class="contact-us-holder">
    <div class="mb-md-15 mb-4 mapbox">
      <client-only>
        <l-map id="map" :zoom=5 :center="[lat,lng-3]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
          <l-marker :lat-lng="[lat, lng]">
            <l-icon :icon-url="require('~/assets/img/marker-icon-red.png')"></l-icon>
          </l-marker>
        </l-map>
      </client-only>
      <div class="pa-5 office-address">
        <h4>Where to find us</h4>
        <p class="mb-4">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,
        </p>
        <v-row class="ma-0 mb-4">
          <v-col cols="5">
            <div>
              <h4>Address</h4>
              <p class="caption">{{address}}</p>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="mb-4">
              <h4>Telephone</h4>
              <p>{{phone}}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p class="caption">{{email}}</p>
            </div>
          </v-col>
        </v-row>
        <div>
          <v-btn>Sample btn</v-btn>
        </div>
      </div>
    </div>
    <div class="contact-form-holder">
      <h2 class="mb-3">Send us a message</h2>
      <div>
        <v-row class="ma-0 mb-5">
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              placeholder="John Thompson"
              v-model="userName"
              label="name *"
              :rules="nameRules"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              placeholder="sample@sample"
              v-model="userEmail"
              label="Email *"
              :rules="emailRules"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              placeholder="09380009900"
              v-model="userPhone"
              label="Telephone"
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              placeholder="sample.sample"
              v-model="userWebpage"
              label="Webpage"
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
          >
            <v-textarea
              placeholder="Write your message here"
              v-model="userMessage"
              rows="6"
              label="Message *"
              :rules="massageRules"
              required
              outlined
            ></v-textarea>
          </v-col>
          <v-col md="6" cols="12">
            <v-file-input
              counter
              small-chips
              multiple
              label="File input"
              class="w-50"
              v-model="userAttachFile"
            ></v-file-input>
          </v-col>
        </v-row>
        <div class="btn-container">
          <v-btn @click="submit" class="secondary-btn px-10">Send Message</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  auth:false,
  data() {
    return {
      address: 'Line17,st sample',
      phone: '+44 101 102 103',
      email: 'macro20_ui@gmail.com',
      lat: 55.9464418,
      lng: 8.1277591,
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
  }
}
</script>
