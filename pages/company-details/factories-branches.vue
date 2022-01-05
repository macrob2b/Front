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
                    v-for="item in items"
                    :key="item.title"
                    link
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
        <v-col cols="4" md="7"></v-col>
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
      items: [
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},
        { title: 'Example'},

      ],
      right: null,
    }
  }
}
</script>
