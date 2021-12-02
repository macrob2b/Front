<template>
  <div class="mapSearch">
    <v-text-field
      class="mapSearchInput rounded-0"
      prepend-inner-icon="mdi-magnify"
      append-icon="mdi-close"
      v-model="searchValue"
      :items="items"
      :label="$t(`SEARCH`)"
      @keydown="inputChanged"
      @click:append="clear"
      single-line
      solo
      flat>
    </v-text-field>
    <v-list class="listSearchInput" v-if="items.length > 0" dense>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content @click="centeredLocation(item.lon,item.lat)">
            <v-list-item-title v-text="item.display_name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "MapSearch",
  data() {
    return {
      selected   : '',
      searchValue: '',
      items      : []
    };
  },
  methods: {
    async inputChanged(event) {
      if (event.key == 'Enter') {
        let geoSearchResult = await this.$axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q     : this.searchValue,
            format: 'json',
          }
        });

        if (geoSearchResult.status == 200) {
          this.items = geoSearchResult.data;
        }
      }
    },
    centeredLocation(lon, lat) {
      this.$emit("locationSelected", {lon: lon, lat: lat});
    },
    clear() {
      this.items       = [];
      this.searchValue = '';
      this.selected    = '';
    }
  },
}
</script>

<style scoped>
.mapSearch {
  margin-top: 12px !important;
  margin-left: 50px;
  z-index: 1005 !important;
  position: absolute !important;
  max-width: 25vw;
}

.listSearchInput {
  margin-top: -30px !important;
  max-height: 30vh !important;
  overflow-y: scroll !important;
}

</style>
