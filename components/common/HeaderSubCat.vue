<template>
  <div class="container px-10">
    <v-row v-if="subCats && subCats.length">
      <v-col
        cols="3"
        class="d-none d-sm-flex"
        v-for="(cat,idx) in subCats"
        :key="idx"
      >
        <div class="d-flex-column">
          <h3 id="h1">{{ cat.title }}</h3>
          <div v-for="(sub,idx2) in cat.grandchildren" :key="'A' + idx2">{{ sub.title }}</div>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="d-flex d-sm-none"
        v-for="(cat,idx3) in subCats"
        :key="'B'+ idx3"
      >
        <div class="d-flex-column">
          <h3>{{ cat.title }}</h3>
          <div v-for="(sub,idx4) in cat.grandchildren" :key="'C'+ idx4">{{ sub.title }}</div>
        </div>
      </v-col>
    </v-row>
    <v-row v-else>{{loading}}</v-row>
  </div>
</template>

<script>
export default {
  props: ['subCats'],
  data() {
    return {
      loading: 'Loading ...'
    };
  },
  mounted() {

  },methods:{

  }
};
</script>

<style scoped>
.container {
  position: absolute;
  z-index: 50;
  height: auto;
  top: 145px;
  max-width: 100%;
  left: 0;
  right: 0;
  background-color: #e1e2e3;
}

#h1 {
  font-weight: 400
}
</style>
