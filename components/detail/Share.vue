<template>
  <v-row no-gutters>
    <v-icon color="white" small class="mx-1 py-1 px-2 rounded-lg icons">
      mdi-facebook
    </v-icon>
    <v-icon color="white" small class="mx-1 py-1 px-2 rounded-lg icons">
      mdi-instagram
    </v-icon>
    <v-icon color="white" small class="mx-1 py-1 px-2 rounded-lg icons">
      mdi-linkedin
    </v-icon>
    <v-icon color="white" small class="mx-1 py-1 px-2 rounded-lg icons">
      mdi-pinterest
    </v-icon>
    <v-icon small color="white" class="mx-1 py-1 px-2 rounded-lg icons">
      mdi-share-variant
    </v-icon>
      <v-btn
        class="mx-2"
        small
        :to="'/company-details/'">
        Contact supplier
      </v-btn>
  </v-row>
</template>

<script>

export default {};
</script>
<style scoped>
.icons {
  background-color: var(--v-primary-base);
  border-radius: 5px;
  width: 30px;
  height: 30px;
}

</style>

