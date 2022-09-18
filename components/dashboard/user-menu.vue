<template>
  <v-list class="user_menu">
    <div
      v-for="(item, side) in items"
      :key="side"
    >

      <v-list-item
        class="py-2"
        active-class="menu_active"
        v-if="!item.data"
        :to="item.link"
      >
        <v-list-item-title v-text="item.title" class="menu-title"/>
      </v-list-item>

      <v-list-group
        v-else
        active-class="menu_group_active"
        :key="item.title"
        no-action
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-title v-text="item.title" class="py-2"></v-list-item-title>
        </template>

        <v-list-item
          class="pl-7 "
          active-class="menu_active"
          v-for="(subMenuItem, side) in item.data"
          :to="subMenuItem.link"
          :key="side.title"
        >
          <v-list-item-content class="py-2">
            <v-list-item-title v-text="subMenuItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "user-menu",
  data() {
    return {
      items: [
        {
          title: 'My company',
          link:'/user/company'
        },
        {
          title: 'My Products',
          data: [
            {title:'Product list',link:'/user/product'},
            {title:'Add a new product',link:'/user/product/add'},
          ]
        },
        {
          title: 'My selling leads',
          data: [
            {title: 'Add new selling lead', link: '/user/selling-lead/add'},
            {title: 'Selling leads list', link: '/user/selling-lead'},
          ]
        },
        {
          title: 'My buying leads',
          data: [
            {title: 'Add new buying lead', link: '/user/buying-lead/add'},
            {title: 'Buying leads list', link: '/user/buying-lead'},
          ]
        },
        {title: 'My messages', link: '/user/messenger'},

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

<style>
.user_menu .v-list-item__title{
  font-size: 0.8125rem!important;
  font-weight: 900!important;
  line-height: 1rem;
}
</style>
