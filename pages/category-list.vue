<template>
  <v-container >
    <h1 class="text-center blue-grey--text">All categories</h1>
    <v-divider class="mt-3 mb-2"/>
    <v-row class="mt-12 mb-12"  v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          :size="50"
          :width="5"
          color="orange"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">

        <vue-masonry-wall :items="categories" :options="{width: 400, padding: 12}" @append="append">
          <template v-slot:default="{item}">
            <div class="item">
              <h2 @click="openLink(item._id)" class="light-green--text pointer">{{item.title}}</h2>
              <ul>
                <li
                  v-for="(child_item,child_index) in item.children"
                >
                  <h3 @click="openLink(child_item.id)" class="blue-grey--text pointer">{{ child_item.title }}</h3>
                </li>
              </ul>
            </div>
          </template>
        </vue-masonry-wall>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
export default {
  components: {VueMasonryWall},
  auth: false,
  name: "all-categories",
  data() {
    return {
      categories: [],
      loading: false
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading=true;
      //Get brand list
      let categoryApiURL = `/api/category_list`;
      await this.$axios.$post(categoryApiURL,
      ).then(response => {
        this.categories = response;
        this.loading=false;
      })
        .catch(e => {
          this.loading=false;
          this.table_status = "Not found"
          console.log('error');
        })
    },
    openLink(id) {
      this.$router.push({
        path: 'product-list', query: {cate_id: id}
      })
    },
  }
}
</script>

<style scoped>

.pointer:hover {
  color: orange !important;
}

</style>
