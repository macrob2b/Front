<template>
  <div class="add-certificate">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="certificateName"
              :items="certificateItems"
              label="Certificate Name"
              outlined
              required
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-select
              :items="issuerItems"
              label="Certificate Issuer"
              outlined
              required
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="certificateId"
              label="Certificate ID"
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="exDate"
              :rules="exRules"
              label="Expiry Date"
              outlined
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-file-input
              accept="image/*"
              label="Image"
              outlined
              required
            ></v-file-input>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              outlined
              name="description"
              label="Description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <div class="btn-container">
      <v-btn @click="submit">Submit</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        certificateName: '',
        certificateId: '',
        exDate: '',
        exRules: [
          value => {
            /* eslint-disable */
            const pattern = new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{4}');
            return pattern.test(value) || 'Set Date like MM/DD/YYYY'
          }
        ],
        certificateItems: [
          'SGS Gold Seal',
          'SGS Silver Seal',
          'SGS Blue Seal',
          'SGS Green Seal',
          'ISO 9001'
        ],
        issuerItems: [
          'ABS Quality Evaluation',
          'ARL (Applied Research Laboratories)'
        ],
      }
    },
    methods: {
      submit() {
        this.$emit('formData', this.certificateName);
      }
    }
  }
</script>
