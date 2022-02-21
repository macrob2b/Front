<template>
  <v-container class="pa-0">
    <v-row
      v-if="subCats && subCats.length"
    >
      <v-col cols="12">
        <v-card
          v-scroll.self="onScroll"
          class="overflow-y-auto px-12"
          max-height="80vh"
        >
          <v-col cols="12">
            <vue-masonry-wall
              :items="subCats"
              :options="{width: 400}"
              class="d-none d-sm-flex"
            >
              <template v-slot:default="{item}">
                <div class="d-flex-column">
                <span class="subtitle-1 blue-grey--text pointer"
                      @click="openLink(item._id)"
                >{{ item.title }}</span>
                  <ul style="list-style: none;padding-left: 8px">
                    <li v-for="(sub,idx2) in item.grandchildren" :key="'A' + idx2"
                        @click="openLink(sub._id)">
                      <span class="subtitle-2 grey--text pointer">{{ sub.title }}</span>
                    </li>
                  </ul>
                </div>
              </template>
            </vue-masonry-wall>
            <vue-masonry-wall
              :items="subCats"
              class="d-flex d-sm-none"
            >
              <template v-slot:default="{item}">
                <div class="d-flex-column">
                  <h3
                    @click="openLink(item._id)"
                  >{{ item.title }}</h3>
                  <ul style="list-style: none;padding-left: 8px">
                    <li v-for="(sub,idx4) in item.grandchildren" :key="'C'+ idx4"
                        class="pointer"
                        @click="openLink(sub._id)">
                      <span class="subtitle-2 grey--text pointer">{{ sub.title }}</span>
                    </li>
                  </ul>
                </div>
              </template>
            </vue-masonry-wall>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="mt-4 mb-4">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          :size="30"
          :width="3"
          color="orange"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";

export default {
  components: {VueMasonryWall},

  props: ['subCats'],
  data() {
    scrollInvoked: 0
  },
  mounted() {

  }, methods: {
    openLink(id) {
      this.$router.push({
        path: 'product-list', query: {cate_id: id}
      })
    },
    onScroll() {
      this.scrollInvoked++
    }
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

.pointer:hover {
  color: orange !important;
}

#h1 {
  font-weight: 400
}
</style>
