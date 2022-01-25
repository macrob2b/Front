<template>
  <div class="contact-info">
    <div class="contact-info-header">
      <p>Contact info</p>
    </div>
    <v-divider></v-divider>
    <div class="contact-info-body">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <phone-number-input @numberEntered="phoneNumberEnterd"></phone-number-input>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="fax"
                label="Fax"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="companywebsite"
                append-icon="mdi-web"
                label="Company Website URL"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="postalcode"
                label="Postal Code"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import PhoneNumberInput from "../phoneNumberInput";

export default {
  components: {PhoneNumberInput},
  data() {
    return {
      phone: null,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      fax: null,
      postalcode: null,
      companywebsite: '',
    }
  },
  watch: {
    $data: {
      handler: function (val, oldVal) {
        this.$emit('updateData', this.$data)
      },
      deep: true
    }
  },
  methods: {
    phoneNumberEnterd(phoneEntered) {
      this.phone = phoneEntered
    }
  }
}
</script>
