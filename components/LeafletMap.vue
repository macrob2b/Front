<template>
  <div id="map-wrap">
    <client-only>
      <l-map ref="map"
             :zoom="map.zoom"
             :center="map.center"
             @ready="setMapObject()"
             @click="selectLocation">

        <l-tile-layer :url="map.url"></l-tile-layer>
        <l-marker :lat-lng="map.markerLocation"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>

export default {
  name: "LeafletMap",
  data() {
    return {
      map: {
        url           : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        zoom          : 13,
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
      this.$emit('locationSelected', pos);
    },
    setMapObject() {
      this.map.object = this.$refs.map.mapObject;
    },
  }
}
</script>

<style scoped>
#map-wrap {
  height: 91vh;
}
</style>
