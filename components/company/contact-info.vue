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
              <v-text-field
                v-model="phone"
                :counter="10"
                label="Phone"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="fax"
                label="Fax"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="email"
                label="Email"
                required
                outlined
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
                label="Company Website URL"
                append-icon="mdi-crosshairs-gps"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="postalcode"
                label="Postal Code"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        phone: null,
        email: '',
        fax: null,
        postalcode: null,
        companywebsite: '',
      }
    },
    watch: {
      $data: {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data)
        },
        deep: true
      }
    },
  }
</script>
