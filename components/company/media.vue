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
                v-model="logo"
                small-chips
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
                v-model="companyImage"
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
                v-model="companyBrochure"
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
              <v-file-input
                v-model="video"
                label="Video"
                outlined
                append-icon="mdi-cloud-upload"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
  export default {
    inject: {
      theme: {
        default: { isDark: false },
      },
    },
    data() {
      return {
        logo: null,
        companyImage: null,
        companyBrochure: null,
        video: null,
      }
    },
    watch: {
      $data: {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data)
        },
        deep: true
      }
    }
  }
</script>

