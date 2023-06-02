<template>
  <div class="search">
    <v-container  id="#container">
      <div class="cont">
        <!-- append-icon="mdi-close" -->
        <div class="d-flex justify-space-between">
          <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
          <v-icon @click="click" v-show="$vuetify.breakpoint.xs">
            mdi-close
          </v-icon>
        </div>
        <v-simple-table>
          <tbody>
            <tr v-for="(item, idx) in items" :key="idx">
              <td>{{ item.name }}</td>
              <td class="align-end justify-end"  id="td1">
                {{ item.cat }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: "Smart TV",
          cat: "Media",
        },

        {
          name: "Smart TV",
          cat: "Media",
        },

        {
          name: "Smart TV",
          cat: "Media",
        },

        {
          name: "Smart TV",
          cat: "Media",
        },

        {
          name: "Smart TV",
          cat: "Media",
        },
      ],
    };
  },
  methods: {
    click: function () {
      this.$emit("toggle");
    },
  },
};
</script>

<style scoped>
.cont {
  background-color: white;
  height: 100%;
  padding-left: 200px;
  padding-right: 200px;
}
tr {
  border-bottom: 0px !important;
}
.search {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: 150px;
  z-index: 150;
}
#td{
  text-align: right
}
#container{
  height: 100%;
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  .search {
    margin-top: 0;
  }
  .container {
    max-width: 1000px !important;
    width: 100%;
    padding: 0;
  }
  .cont {
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
  }
}
</style>