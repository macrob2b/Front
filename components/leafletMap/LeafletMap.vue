<template>
  <div>
    <MapSearch @locationSelected="goToSearchLocation"/>

    <div id="map-wrap">
      <client-only>
        <l-map ref="map"
               :zoom="map.zoom"
               :center="map.center"
               @click="selectLocation">
          <l-tile-layer :url="map.url"></l-tile-layer>
          <l-marker :lat-lng="map.markerLocation"></l-marker>
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>

import MapSearch from "./MapSearch";

export default {
  name      : "LeafletMap",
  components: {MapSearch},
  data() {
    return {
      map: {
        url           : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        zoom          : 8,
        center        : [55.9464418, 8.1277591],
        markerLocation: [55.9464418, 8.1277591],
        object        : null,
      },
    };
  },
  methods: {
    selectLocation(event) {
      let pos                 = this.$L.latLng(event.latlng.lat, event.latlng.lng);
      this.map.markerLocation = pos;
      this.getNameOfLocation({lng: pos.lng, lat: pos.lat});
    },
    async getNameOfLocation(location) {
      let nameSearchResult = await this.$axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat   : location.lat,
          lon   : location.lng,
          format: 'json',
        }
      });

      if (nameSearchResult.status == 200) {
        this.$emit('locationSelected', {
          lat         : location.lat,
          lng         : location.lng,
          locationName: nameSearchResult.data.display_name
        });
      }
    },
    goToSearchLocation(event) {
      this.map.center = [event.lat, event.lon];
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.map.object = this.$refs.map.mapObject;
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    });
  }
}
</script>

<style scoped>
#map-wrap {
  height: 90vh;
}
</style>
