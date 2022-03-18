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
            <v-btn :to="menuItem.link"><div class="dot">&nbsp;</div> {{ menuItem.title }}</v-btn>
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
          {
            name: 'My Products',
            data: [
              {title:'Product list',link:'/user/product'},
              {title:'Add a new product',link:'/user/product/add'},
            ]
          },
          {
            name: 'My company',
            data: [
              {title:'Update company info',link:'/user/company'},
              {title: 'My message', link: '/messenger'},
            ]
          },
          // {name: 'My Inquiries', data: [{title:'Add a New Buying Lead',link:'/'}, 'Add a New Buying Lead', 'Add a New Buying Lead']},
          // {name: 'My Storefront', data: ['Add a New Buying Lead']},
          // {name: 'My Buying Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
          // {name: 'My Selling Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead']},
          // {name: 'My account', data: ['Add a New Buying Lead']}
        ],
      }
    }
  }
</script>
