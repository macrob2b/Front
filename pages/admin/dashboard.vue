<template>
  <div>
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
    >
      <v-card
        :color="item.color"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="text-h5"
              v-text="item.title"
            ></v-card-title>

            <v-card-subtitle v-text="item.artist"></v-card-subtitle>

            <v-card-actions>



              <v-btn
                :to="item.link"
                class="ml-2 mt-5"
                outlined
                rounded
                small
              >
                Show list
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img :src="item.src"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>



  <!--Chart section-->

    <br>
    <br>
    <br>
    <h2>Sale report</h2>
    <v-card
      class="mx-auto text-center col-12"
      color="green"
      dark

    >
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
             ${{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>



      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn
          block
          text
        >
         Show Report
        </v-btn>
      </v-card-actions>
    </v-card>
 <!--End chart section-->
  </div>
</template>

<script>
export default {
  middleware: ['auth','is_admin'],
  name: "dashboard",
  layout:"admin",
  data: () => ({
    value: [
      423,
      446,
      675,
      510,
      590,
      610,
      760,
    ],
    items: [
      {
        color: '#1F7087',
        src: require("../../assets/img/category.png"),
        title: 'Category manage',
        artist: 'View',
        link: '/admin/category',
      },{
        color: 'purple',
        src: require("../../assets/img/sale.png"),
        title: 'Company manage',
        artist: 'View',
        link: '/admin/company',
      }
    ],
  }),
}
</script>

<style scoped>

</style>
