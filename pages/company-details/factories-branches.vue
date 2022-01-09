<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content branch-tab-content">
      <v-row>
        <v-col cols="12" md="5">
            <v-card>
              <v-navigation-drawer>
                <v-list
                  dense
                  nav
                >
                  <v-list-item
                    v-for="(item, i) in branchsList"
                    :key="item.id"
                    link
                    @click="showDetailsBranch(item, i)"
                    v-bind:class="{selected: activeIndex == i}"
                    class="branchs-list"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
        </v-col>
        <v-col cols="12" md="7">
          <div class="location-map" v-if="branchDetails">
            <client-only>
              <l-map id="map" :zoom=5 :center="[branchDetails.lat, branchDetails.lng]">
                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker :lat-lng="[item.lat, item.lng]" v-for="(item, i) in branchsList" @click="showDetailsBranch(item, i)">
                  <l-icon v-if="i===activeIndex" :icon-url="require('~/assets/img/marker-icon-red.png')"></l-icon>
                </l-marker>
              </l-map>
            </client-only>
            <div id="showBranchDetails" class="show-branch-details">
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-map-marker
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-model="branchDetails.title">
                        {{branchDetails.address}}
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
                      <v-list-item-title>{{branchDetails.phone}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-list-item-title class="font-weight-bold primary-color">
                        Factory size
                      </v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{branchDetails.factorySize}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-list-item-title class="font-weight-bold primary-color">
                        Annual output value
                      </v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{branchDetails.annualOutputValue}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-list-item-title class="font-weight-bold primary-color">
                        No. of production staff
                      </v-list-item-title>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{branchDetails.productionStaff}}</v-list-item-title>
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
  components: {

  },
  data() {
    return {
      branchsList: [
        {
          id: '1',
          title: 'Example1',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example1',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 55.9464418,
          lng: 8.1277591,
        },
        {
          id: '2',
          title: 'Example2',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example2',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 51.9464418,
          lng: 7.1277591,
        },
        {
          id: '3',
          title: 'Example3',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example3',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 45.9464418,
          lng: 7.1277591,
        },
        {
          id: '4',
          title: 'Example4',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 44.9464418,
          lng: 7.1277591,
        },
        {
          id: '5',
          title: 'Example5',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 43.9464418,
          lng: 7.1277591,
        },
        {
          id: '6',
          title: 'Example6',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 42.9464418,
          lng: 7.1277591,
        },
        {
          id: '7',
          title: 'Example7',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 40.9464418,
          lng: 1.1277591,
        },
        {
          id: '8',
          title: 'Example8',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 51.9464418,
          lng: 2.1277591,
        },
        {
          id: '9',
          title: 'Example9',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 51.3464418,
          lng: 3.1277591,
        },
        {
          id: '10',
          title: 'Example10',
          address: 'Chicago , Bedford street , across the street from lufga academy',
          phone: '+44 21 4578 32165',
          factorySize: 'Example',
          annualOutputValue: 'Example',
          productionStaff: 'Example',
          lat: 52.9464418,
          lng: 7.0977591,
        },

      ],
      right: null,
      branchDetails: null,
      activeIndex: 0
    }
  },
  created() {
    // let map = this.$L.map('map', {
    //   center: [51.505, -0.09],
    //   zoom: 13
    // });

    this.branchDetails = this.branchsList.length > 0 ? this.branchsList[0] : null;
    this.mapCenter = [this.branchDetails.lat, this.branchDetails.lng];
  },
  methods: {
    showDetailsBranch (branch, index) {
      this.activeIndex = index;
      this.branchDetails = branch;
    },
  }
}
</script>
