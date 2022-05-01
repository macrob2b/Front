<template>
  <v-row no-gutters>
    <a :href="'https://www.facebook.com/sharer/sharer.php?u=https://macrob2b.com/product-details/'+$route.params.id" target="_blank">
      <v-icon color="white" small class="mx-1 py-1 px-2 rounded-lg icons">
        mdi-facebook
      </v-icon>
    </a>

    <a :href="'https://www.linkedin.com/sharing/share-offsite/?url=https://macrob2b.com/product-details/'+$route.params.id"
    target="_blank"
    >
      <v-icon color="white" small class="mx-1 py-1 px-2 rounded-lg icons">
        mdi-linkedin
      </v-icon>
    </a>

  </v-row>
</template>

<script>

export default {
  name:'share_product',
  props:['companyId']
};
</script>
<style scoped>
.icons {
  color: #3E3E3E!important;
  background-color: var(--v-primary-base);
  border-radius: 5px;
  width: 30px;
  height: 30px;
}

</style>

