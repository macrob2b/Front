<template>
  <div class="media">
    <div class="media-header">
      <p>media</p>
    </div>
    <v-divider></v-divider>
    <div class="media-body">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-file-input
                v-model="value"
                small-chips
                multiple
                outlined
                append-icon="mdi-cloud-upload"
                label="Business Logo"
              ></v-file-input>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-file-input
                small-chips
                multiple
                outlined
                append-icon="mdi-cloud-upload"
                label="Company Image"
              ></v-file-input>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-file-input
                small-chips
                multiple
                outlined
                append-icon="mdi-cloud-upload"
                label="Company Brochure"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="video"
                label="Video"
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
        video: '',
        value: null
      }
    },
    watch: {
      value (val) {
        /* eslint-disable */
        console.log(val[0].name);
      }
    }
  }
</script>
