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
    <v-col
      cols="auto"
      align-self="center"
      class="
        d-none d-md-flex
        mx-4
        pa-2
        rounded-lg
        justify-space-between
        align-center
        grey
        lighten-2
      "
    >
      <v-icon color="white" class="mx-1 pa-1 icons" small> mdi-phone </v-icon>
      contact supplier
    </v-col>
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