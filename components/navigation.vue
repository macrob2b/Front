<!--eslint-disable-->
<template>
  <div class="navigation">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <div class="title">
        <h2>Basic Services</h2>
        <v-btn @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="side-bar-container">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="(index, id1) in items"
            :key="id1"
          >
            <v-expansion-panel-header>{{ index.name }}</v-expansion-panel-header>
            <v-expansion-panel-content v-for="(menuItem, id2) in index.data" :key="id2">
              <v-btn :to="menuItem.link"><div class="dot">&nbsp;</div> {{ menuItem.title }}</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
   /*eslint-disable */
  export default {
    props: ['drawer', 'items'],
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>
