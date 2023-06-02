<template>
  <div class="branch-supervisor">
    <div class="branch-supervisor-header">
      <p>Branch Supervisor</p>
    </div>
    <v-divider></v-divider>
    <div class="branch-supervisor-body">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="supervisor"
                label="Supervisor"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="fax"
                :rules="faxRules"
                label="Fax"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
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
  export default {
    data() {
      return {
        valid: false,
        supervisor: '',
        phone: null,
        fax: null,
        email: '',
        phoneRules: [
          value => {
            const pattern = /^[0-9]*$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ],
        faxRules: [
          value => {
            const pattern = /^[0-9]*$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ],
        emailRules: [
          value => !!value || 'E-mail is required',
          value => /.+@.+/.test(value) || 'E-mail must be valid',
        ],
      }
    }
  }
</script>
