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
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  auth:false,
  name: "help",
  data(){
    return{
      helpItem:[
        {
          title:"Sign up",
          describe:"First free signup in Macrob2b"
        },{
          title:"Complete company info",
          describe:"You need complete your company profile such as phone, email and ... "
        },{
          title:"Submit your product",
          describe:"Submit your product form product manage section"
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
