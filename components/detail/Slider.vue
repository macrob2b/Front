<template>
  <div class="slid">
    <v-col v-if="$vuetify.breakpoint.xs">
      <v-slide-group center-active show-arrows>
        <v-slide-item v-for="n in 15" :key="n">
          <img src="/lorem-ipsum.png" alt="lorem-ipsum" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
    <v-col v-else>

      <v-slide-group center-active show-arrows>
        <v-slide-item v-for="n in 15" :key="n">
          <img src="/lorem-ipsum.png" alt="lorem-ipsum" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </div>
</template>

<script>

export default {

};
</script>

<style scoped>
img {
  width: 200px;
}
.slid {
  padding-left: 40px;
  padding-right: 40px;
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  .slid {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
