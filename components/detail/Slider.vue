<template>
  <div class="slid">
    <v-col v-if="$vuetify.breakpoint.xs">
      <!-- <hooper itemsToShow="2">
      <slide v-for="(items,i) in 10" class="pl-0">
        <img src="lorem-ipsum.png" alt="lorem-ipsum" style="width: 2%">
      </slide>
    </hooper> -->
      <v-slide-group center-active show-arrows>
        <v-slide-item v-for="n in 15" :key="n">
          <img src="lorem-ipsum.png" alt="lorem-ipsum" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
    <v-col v-else>
      <!-- <hooper itemsToShow="6">
      <slide v-for="(items,i) in 10" class="pl-0">
        <img src="lorem-ipsum.png" alt="lorem-ipsum" style="width: 2%">
      </slide>
    </hooper> -->
      <v-slide-group center-active show-arrows>
        <v-slide-item v-for="n in 15" :key="n">
          <img src="lorem-ipsum.png" alt="lorem-ipsum" />
        </v-slide-item>
      </v-slide-group>
    </v-col>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
  },
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
