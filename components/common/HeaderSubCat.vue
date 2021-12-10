<template>
  <div class="container px-10">
    <v-row>
      <v-col
        cols="3"
        v-show="!$vuetify.breakpoint.xs"
        v-for="cat in subCats"
        :key="cat"
      >
        <div class="d-flex-column">
          <h3 style="font-weight:400">{{ cat.cat }}</h3>
          <div v-for="sub in cat.sub" :key="sub">{{ sub }}</div>
        </div>
      </v-col>
      <v-col
        cols="5"
        v-show="$vuetify.breakpoint.xs"
        v-for="cat in subCats"
        :key="cat"
      >
        <div class="d-flex-column">
          <h3>{{ cat.cat }}</h3>
          <div v-for="sub in cat.sub" :key="sub">{{ sub }}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subCats: [
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
        {
          cat: "Media",
          sub: [
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
            "Smart TV",
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  z-index: 50;
  height: auto;
  top: 160px;
  max-width: 100%;
  left: 0;
  right: 0;
  background-color: #F3F3F3;
}
</style>