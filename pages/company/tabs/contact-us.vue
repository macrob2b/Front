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
          v-show="!$auth.loggedIn"
          cols="12"
          sm="6"
          class="order-sm-0 order-1 bg-white rounded-lg py-4  fill-height">
          <p class="mb-2 font-weight-bold">
            Please login first to send a message
          </p>
          <v-btn to="/login" class="secondary-btn px-10 mb-15">
            Login here
          </v-btn>
        </v-col>
        <v-col
          v-show="$auth.loggedIn"
          cols="12"
          sm="6"
          class="order-sm-0 order-1 bg-white rounded-lg py-4  fill-height">
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="name"
                label="Name"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="email"
                label="Email address"
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
            <v-btn @click="submitMsg"
                   :loading="submit_loading" class="secondary-btn px-10">Send
            </v-btn>
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
                    {{ companyInfo.country }}-{{ companyInfo.state }}-{{ companyInfo.city }}
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
                  <v-list-item-title>
                    <a :href="'tel:'+companyInfo.phone">
                      {{ companyInfo.phone }}
                    </a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-fax
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="'tel:'+companyInfo.fax">
                      {{ companyInfo.fax }}
                    </a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-email
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="'mailto:'+companyInfo.email">
                      {{ companyInfo.email }}
                    </a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>
                    mdi-earth
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="companyInfo.website" target="_blank">
                      {{ companyInfo.website }}
                    </a>
                  </v-list-item-title>
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
  props: ['companyInfo'],
  components: {},
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      message: '',
      submit_loading: false,
      img: 'message.png'
    }
  },
  methods: {
    async submitMsg() {
      this.submit_loading = true;
      await this.$axios.$post('/api/send_msg_to_company', {
          company_id: this.companyInfo._id,
          name: this.name,
          email: this.email,
          message: this.message
        }
      ).then(response => {
        if (typeof response === 'object') {
          for (let i in response) {
            let error = response[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.name = '';
          this.email = '';
          this.message = '';
          this.$toast.success('Your message sent successfully')
        }
        this.submit_loading = false;
      }).catch(err => {
        this.submit_loading = false;
      });
    }
  }
}
</script>
