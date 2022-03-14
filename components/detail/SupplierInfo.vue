<template>
  <v-row class="mt-5">
    <v-col cols="12" md="4" order="2" order-md="1">
      <RequirementCard/>
    </v-col>
    <v-col cols="12" md="8" order="1" order-md="2">
      <Description :productInfo="productInfo"/>
    </v-col>
<!--    <v-col cols="12" md="6" order="3">-->
<!--      <Description/>-->
<!--    </v-col>-->
<!--    <v-col cols="12" md="6" order="4">-->
<!--      <Description/>-->
<!--    </v-col>-->

  </v-row>
</template>

<script>
  import RequirementCard from "../home/RequirementCard";
  import Description from "./Description";
  export default {
    props:['productInfo'],
    components: {RequirementCard, Description},
  }
</script>
