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
                v-model="media.logo"
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
                v-model="media.companyImage"
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
                v-model="media.companyBrochure"
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
                v-model="media.video"
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
    props:['serverData'],
    inject: {
      theme: {
        default: { isDark: false },
      },
    },
    data() {
      return {
        media: {
          logo: null,
          companyImage: null,
          companyBrochure: null,
          video: null,
        },
        
      }
    },
    watch: {
      '$data.media': {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data.media)
        },
        deep: true
      },
      serverData: {
        handler: function(val, oldVal) {
          for(let i in val) {
            if(this.$data.media.hasOwnProperty(i)) {
              this.media[i] = val[i] ? {name: val[i], ignore: true} : null
            }
          }
        },
        deep: true
      }
    }
  }
</script>

