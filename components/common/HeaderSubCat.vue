<template>
  <div class="container px-10">
    <v-row>
      <v-col
        cols="3"
        v-show="!$vuetify.breakpoint.xs"
        v-for="(cat,idx) in subCats"
        :key="idx"
      >
        <div class="d-flex-column">
          <h3  id="h1">{{ cat.cat }}</h3>
          <div v-for="(sub,idx2) in cat.sub" :key="'A' + idx2">{{ sub }}</div>
        </div>
      </v-col>
      <v-col
        cols="5"
        v-show="$vuetify.breakpoint.xs"
        v-for="(cat,idx3) in subCats"
        :key="'B'+ idx3"
      >
        <div class="d-flex-column">
          <h3>{{ cat.cat }}</h3>
          <div v-for="(sub,idx4) in cat.sub" :key="'C'+ idx4">{{ sub }}</div>
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
#h1{
  font-weight:400
}
</style>