<template>
  <v-timeline
    :reverse="true"
    :dense="$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item
      v-for="item in helpItem"
    >
      <v-card class="elevation-2">
        <v-card-title class="text-h5">
          {{item.title}}
        </v-card-title>
        <v-card-text>
          {{item.describe}}

          <video v-if="item.video" :src="item.video" controls >
            Your browser does not support the video tag.
          </video>

        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  auth:false,
  name: "help",
  head() {
    return {
      title: 'Help',

    }
  },

  data(){
    return{
      helpItem:[
        {
          title:"Sign up FREE",
          describe:"First free signup in Macrob2b",
          video:"/Signup.mp4"
        },{
          title:"Complete company info",
          describe:"You need complete your company profile such as phone, email and ... ",
          video:"/CompanyProfile.mp4"
        },{
          title:"Submit your product",
          describe:"Submit your product from product manage section",
          video:"/SubmitProduct.mp4"
        },
      ]
    }
  }
}
</script>

<style scoped>

video {
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  height: auto;
}
</style>
