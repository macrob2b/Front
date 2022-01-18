<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content contact-us-tab-content">
      <v-row>
        <v-col
          cols="12"
        class="order-sm-first order-0">
          <div class="mb-8 title">
            <v-icon class="secondary-color">mdi-message</v-icon>
            Send message to supplier
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="order-sm-0 order-1 bg-white rounded-lg py-4  fill-height">
          <v-row>
            <v-col
            cols="12"
            sm="6"
            >
              <v-text-field
                placeholder="John Thompson"
                v-model="from"
                label="From"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="6"
            >
              <v-text-field
                placeholder="Global BNB marketing"
                v-model="to"
                label="To"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-textarea
                placeholder="Write your message here"
                v-model="message"
                rows="16"
                outlined
                name="input-7-4"
                label="Message"
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="btn-container">
            <v-btn @click="submit" class="secondary-btn px-10">Send</v-btn>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        class="order-sm-1 order-first py-0  fill-height">
          <v-card
            class="mx-auto"
          >
            <v-img
              :src="require('~/assets/img/' + img)"
              dark
            >
            </v-img>

            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-map-marker
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Chicago , Bedford street , across the street from lufga academy
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-phone
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>+44 21 6547 2134</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-email
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Example@gmail.com</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-list-item-title class="font-weight-bold primary-color">
                    Country/region
                  </v-list-item-title>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Example</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-list-item-title class="font-weight-bold primary-color">
                    Fax
                  </v-list-item-title>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Example</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      valid: false,
      from: '',
      to: '',
      message: '',
      img: 'message.png'
    }
  }
}
</script>
