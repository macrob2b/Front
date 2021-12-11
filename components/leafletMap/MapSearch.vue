<template>
  <div class="mapSearch">
    <v-text-field
      class="mapSearchInput rounded-0"
      v-model="searchValue"
      :items="items"
      :label="$t(`SEARCH`)"
      @keydown="inputChanged"
      single-line
      solo
      flat>
      <template slot="append">
        <v-btn @click="clear"
               icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template slot="prepend-inner">
        <v-btn @click="searchLocation"
               :loading="searchLoader"
               icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
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
      selected    : '',
      searchValue : '',
      items       : [],
      searchLoader: false
    };
  },
  methods: {
    async inputChanged(event) {
      if (event.key == 'Enter') {
        await this.searchLocation();
      }
    },
    async searchLocation() {
      this.searchLoader   = true;
      let geoSearchResult = await this.$axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q     : this.searchValue,
          format: 'json',
        }
      });

      if (geoSearchResult.status == 200) {
        this.items        = geoSearchResult.data;
        this.searchLoader = false;
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
  max-width: 350px;
  min-width: 350px;
}

.listSearchInput {
  margin-top: -30px !important;
  max-height: 30vh !important;
  overflow-y: scroll !important;
}

</style>
