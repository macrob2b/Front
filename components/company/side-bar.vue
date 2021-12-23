<template>
  <div class="side-bar">
    <div class="title">
      <h2>Basic Services</h2>
    </div>
    <div class="side-bar-container">
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="(index, id1) in items"
          :key="id1"
        >
          <v-expansion-panel-header>{{ index.name }}</v-expansion-panel-header>
          <v-expansion-panel-content v-for="(menuItem, id2) in index.data" :key="id2">
            <v-btn><div class="dot">&nbsp;</div> {{ menuItem }}</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {name: 'My Inquiries', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My Storefront', data: ['Add a New Buying Lead']},
          {name: 'My Buying Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My Selling Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My Products', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My account', data: ['Add a New Buying Lead']}
        ],
      }
    }
  }
</script>
