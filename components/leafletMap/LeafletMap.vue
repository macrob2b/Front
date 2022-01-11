<template>
  <div>

    <LocationField :label="$t(`LOCATION`)"
                   class="mapSearch"
                   @locationSelected="goToSearchLocation"
                   :solo="true"/>

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

import LocationField from "@/components/Form/LocationField";

export default {
  name      : "LeafletMap",
  components: {LocationField},
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
      let nameSearchResult = await this.$axios.post('/api/reverse_location', {
        lat: location.lat,
        lng: location.lng
      });

      if (nameSearchResult.status == 200) {
        let locationName =
              (nameSearchResult.data.country ? (nameSearchResult.data.country + ',') : '') + // country
              (nameSearchResult.data.state ? (nameSearchResult.data.state + ',') : '') + // state
              (nameSearchResult.data.province ? (nameSearchResult.data.province + ',') : '') + // province
              (nameSearchResult.data.region ? (nameSearchResult.data.region + ',') : '') + // region
              (nameSearchResult.data.subdistrict ? (nameSearchResult.data.subdistrict + ',') : '') + // subdistrict
              (nameSearchResult.data.county ? (nameSearchResult.data.county + ',') : '') + // county
              (nameSearchResult.data.city ? (nameSearchResult.data.city + ',') : '') + // city
              (nameSearchResult.data.suburb ? (nameSearchResult.data.suburb + ',') : '') + // suburb
              (nameSearchResult.data.town ? (nameSearchResult.data.town + ',') : '') + // town
              (nameSearchResult.data.road ? (nameSearchResult.data.road + ',') : '') + // road
              (nameSearchResult.data.district ? (nameSearchResult.data.district + ',') : '') + // district
              (nameSearchResult.data.village ? (nameSearchResult.data.village + ',') : '') + // village
              (nameSearchResult.data.postcode ? nameSearchResult.data.postcode : ''); // postcode
        locationName     = locationName[locationName.length - 1] === ',' ? locationName.substr(0, locationName.length - 1) : locationName;
        // return data
        this.$emit('locationSelected', {
          lat         : location.lat,
          lng         : location.lng,
          locationName: locationName
        });
      }
    },
    goToSearchLocation(event) {
      this.map.center         = [event[0], event[1]];
      this.map.markerLocation = [event[0], event[1]];
      this.refreshMap();
    },
    refreshMap() {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.map.object = this.$refs.map.mapObject;
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    });
  },
}
</script>

<style scoped>
#map-wrap {
  height: 90vh;
}

.mapSearch {
  margin-top: 12px !important;
  margin-left: 50px;
  z-index: 1005 !important;
  position: absolute !important;
  width: 320px !important;
  max-width: 320px;
}

</style>
