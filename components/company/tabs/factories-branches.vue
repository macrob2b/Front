<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content branch-tab-content">
      <v-row>
        <v-col cols="12" md="5">
          <h2 class="mt-4 mb-2">Factories</h2>
          <v-card>
            <v-row class="mt-12 mb-12" v-if="factories_loading">
              <v-col cols="12" class="text-center">
                <v-progress-circular
                  :size="30"
                  :width="4"
                  color="orange"
                  indeterminate
                ></v-progress-circular>
              </v-col>
            </v-row>
            <v-navigation-drawer v-else>
              <v-list
                dense
                nav
              >
                <v-list-item
                  v-for="(item, i) in factory_list"
                  :key="item.id"
                  link
                  @click="showLocationDetails(item, i)"
                  v-bind:class="{selected: activeIndex == i}"
                  class="branchs-list"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>

          <h2 class="mt-4 mb-2">Branches</h2>
          <v-card>
            <v-row class="mt-12 mb-12" v-if="branches_loading">
              <v-col cols="12" class="text-center">
                <v-progress-circular
                  :size="30"
                  :width="4"
                  color="orange"
                  indeterminate
                ></v-progress-circular>
              </v-col>
            </v-row>
            <v-navigation-drawer v-else>
              <v-list
                dense
                nav
              >
                <v-list-item
                  v-for="(item, i) in branch_list"
                  :key="item.id"
                  link
                  @click="showLocationDetails(item, i)"
                  v-bind:class="{selected: activeIndex == i}"
                  class="branchs-list"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
              <v-list
                dense
                nav
              >
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <div class="location-map" v-if="locationDetails">
            <client-only>
              <l-map id="map" :zoom=5
                     :center="[locationDetails.location.coordinates[1], locationDetails.location.coordinates[0]]">
                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker :lat-lng="[item.location.coordinates[1], item.location.coordinates[0]]"
                          v-for="(item, i) in all_locations"
                          v-if="item.location && item.location.coordinates"
                          @click="showLocationDetails(item, i)">
                  <l-icon v-if="item._id===activeIndex"
                          :icon-url="require('~/assets/img/marker-icon-red.png')"></l-icon>
                </l-marker>
              </l-map>
            </client-only>
            <div id="showlocationDetails" class="show-branch-details">
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-map-marker
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-model="locationDetails.title">
                        {{ locationDetails.address }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-phone
                      </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ locationDetails.contact_num }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="locationDetails.factory_size && locationDetails.factory_size.title">
                    <v-list-item-icon>
                      <v-list-item-title class="font-weight-bold primary-color">
                        Factory size
                      </v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ locationDetails.factory_size.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="locationDetails.annual_output && locationDetails.annual_output.title">
                    <v-list-item-icon>
                      <v-list-item-title class="font-weight-bold primary-color">
                        Annual output value
                      </v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ locationDetails.annual_output.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="locationDetails.production_staff_num">
                    <v-list-item-icon>
                      <v-list-item-title class="font-weight-bold primary-color">
                        No. of production staff
                      </v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ locationDetails.production_staff_num }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
export default {
  name:'factories-branches-company',
  data() {
    return {
      factories_loading: false,
      branches_loading: false,

      factory_list: [],
      branch_list: [],

      all_locations: [],
      right: null,
      locationDetails: null,
      activeIndex: 0
    }
  },
  created() {
    // let map = this.$L.map('map', {
    //   center: [51.505, -0.09],
    //   zoom: 13
    // });

    // this.locationDetails = this.branchsList.length > 0 ? this.branchsList[0] : null;
    // this.mapCenter = [this.locationDetails.location.coordinates[1], this.locationDetails.location.coordinates[0]];
  },
  mounted() {
    this.getFactoryList();
    this.getBranchList();
  },
  watch: {
    factory_list(val, old_val) {
      if (val !== old_val && val.length > 0) {
        this.all_locations = this.factory_list.concat(this.branch_list);
        this.locationDetails = this.all_locations.length > 0 ? this.all_locations[0] : null;
        if (this.locationDetails && this.locationDetails.location && this.locationDetails.location.coordinates)
          this.mapCenter = [this.locationDetails.location.coordinates[1], this.locationDetails.location.coordinates[0]];
        else
          this.mapCenter = [0, 0];
      }
    },
    branch_list(val, old_val) {
      if (val !== old_val && val.length > 0) {
        this.all_locations = this.factory_list.concat(this.branch_list);
        this.locationDetails = this.all_locations.length > 0 ? this.all_locations[0] : null;
        if (this.locationDetails && this.locationDetails.location && this.locationDetails.location.coordinates)
          this.mapCenter = [this.locationDetails.location.coordinates[1], this.locationDetails.location.coordinates[0]];
        else
          this.mapCenter = [0, 0];      }
    }
  },
  methods: {
    showLocationDetails(location) {
      this.activeIndex = location._id;
      this.locationDetails = location;
      this.locationDetails.address = location.country + '-' + location.state + '-' + location.city;
    },
    getFactoryList() {
      this.factories_loading = true;
      this.$axios.$post('/api/factory_list',
        {
          company_id: this.$route.params.id
        })
        .then(response => {
          this.factory_list = response;
          this.factories_loading = false;
          console.log("is ok")
        })
        .catch(err => {
          this.factories_loading = false;
          this.$toast.error(err);
        })
    },
    getBranchList() {
      this.branches_loading = true;
      this.$axios.$post('/api/branch_list',
        {
          company_id: this.$route.params.id
        })
        .then(response => {
          this.branch_list = response;
          this.branches_loading = false;
          console.log("is ok")
        })
        .catch(err => {
          this.branches_loading = false;
          this.$toast.error(err);
        })
    }
  }
}
</script>
