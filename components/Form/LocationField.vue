<template>
  <!-- Root -->
  <div>
    <!-- Location Field -->
    <LocationSearch ref="locationField" :label="label" @locationSelected="zoomOnLocation"/>

    <!--    Location Map Dialog       -->
    <v-dialog
      v-model="locationDialog"
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
      eager>
      <v-card>
        <v-toolbar
          color="primary"
          outlined
          dark>
          <v-toolbar-title>{{ $t(`SELECT`) + ' ' + label }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              color="white"
              @click="locationDialog = false">
              {{ $t(`SELECT`) }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <LeafletMap
          ref="locationMap"
          @locationSelected="selectLocation">
        </LeafletMap>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import LocationSearch from "@/components/Form/LocationSearch";
import LeafletMap    from "@/components/leafletMap/LeafletMap";

export default {
  name      : "LocationField",
  components: {LocationSearch, LeafletMap},
  props     : ['label'],
  data() {
    return {
      locationDialog: false,
    }
  },
  methods: {
    zoomOnLocation(location) {
      this.$refs.locationMap.goToSearchLocation(location);
      this.locationDialog = true;
    },
    selectLocation(location) {
      this.$refs.locationField.toggleSearch(false);
      this.$refs.locationField.addAndSetItem(location);
      this.$emit('locationSelected', {
        lat         : location.lat,
        lng         : location.lng,
        country_code: location.country_code,
        country     : location.country,
        state       : location.state,
      });
    }
  }
}
</script>

<style scoped>

</style>
