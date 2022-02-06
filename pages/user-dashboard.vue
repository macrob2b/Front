<template>
  <v-container fluid class="company-profile">
    <v-row>

      <div class="company-main">
        <div class="mobile-nav d-md-none">
          <v-btn class="drawer-btn" @click.stop="drawer = !drawer">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
          <Navigation :drawer="drawer" :items="items" @close="drawer = false"></Navigation>
        </div>
        <h3 class="mt-8">Wellcome to largest b2b platform</h3><br>
        <p>
          You can esay use this platform to sell or buy
        </p>
        <v-btn @click="logout()">
          Logout
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import SideBar from '../components/company/side-bar'
import ProfileCard from '../components/company/profile-card'
import Stepper from '../components/company/stepper'
import Navigation from "~/components/navigation"

export default {
  layout:'user_dashboard',
  name:"user-dashboard",
  middleware:'is_user',
  components: {
    SideBar,
    ProfileCard,
    Stepper,
    Navigation
  },
  data() {
    return {
      drawer: null,
      items: [
        {name: 'My Inquiries', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
        {name: 'My Storefront', data: ['Add a New Buying Lead']},
        {
          name: 'My Buying Tools',
          data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']
        },
        {name: 'My Selling Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead']},
        {name: 'My Products', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
        {name: 'My account', data: ['Add a New Buying Lead']}
      ],
    }
  },
  methods:{
    logout(){
      this.$auth.logout();
    }
  }
}
</script>
