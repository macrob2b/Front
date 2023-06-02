<template>
  <v-col style="background-color: #f3f3f3;height: 100%;overflow:auto;" class="rounded-lg">
    <v-row justify="space-between" class="py-4 px-3">
      <v-col class="font-weight-black"> {{cardTitle}} </v-col>
      <!--      If Have Rate prop-->

    </v-row>
    <v-divider></v-divider>
    <!--    If have description prop  -->
    <v-col>
      <div class="text-grey text-justify" v-if="productInfo && productInfo.details" v-html="productInfo.details">
      </div>
    </v-col>
  </v-col>
</template>

<script>

export default {
  props:['productInfo','cardTitle'],
  data() {
    return {

    };
  },
};

</script>
