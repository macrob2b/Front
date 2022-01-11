<template>
  <v-container class="filter-container">
    <h3 >{{title}}</h3>
    <div v-if="type==='checkbox'">
      <v-checkbox v-for="item in list"
                  v-model="selected"
                  :label="item"
                  :value="item"
                  hide-details="true"
                  multiple
                  class="small"
      ></v-checkbox>
    </div>

    <div v-if="type==='text'">
      <v-list dense flat>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            dense
            v-for="(item, i) in list"
            :key="i"
          >

            {{item}}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: "FilterItems",
    props: {
      title: String,
      type: String,
      list: Array
    },
    data() {
      return {
        selected: ['John'],
        selectedItem: 1,
      }
    }
  }
</script>

<style scoped>
  .v-input--selection-controls {
    margin-top: 0 !important;
  }

  .v-list-item--dense .v-list-item__content, .v-list--dense .v-list-item .v-list-item__content {
    padding: 0 !important;
  }
  .v-list-item--dense, .v-list--dense .v-list-item{
    min-height: unset;
    padding: 2px 0;
  }
  .filter-container{
    /*max-height: calc(100vh - 150px);*/
    overflow: auto;
    max-height: 200px;
  }

</style>
