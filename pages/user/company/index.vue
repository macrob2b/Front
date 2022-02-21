<template>
    <v-row>
      <div class="company-main">
        <ProfileCard></ProfileCard>
        <div class="mobile-nav d-md-none">
          <v-btn class="drawer-btn" @click.stop="drawer = !drawer">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
          <Navigation :drawer="drawer" :items="items" @close="drawer = false"></Navigation>
        </div>
        <Stepper></Stepper>
      </div>
    </v-row>
</template>

<script>
/* eslint-disable */
  import SideBar from '../../../components/company/side-bar'
  import ProfileCard from '../../../components/company/profile-card'
  import Stepper from '../../../components/company/stepper'
  import Navigation from "~/components/navigation"
  export default {
    auth:false,
    head() {
      return {
        title: 'Company info'
      }
    },
    layout:'user_dashboard',
    // middleware:'is_user',
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
          {name: 'My Buying Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My Selling Tools', data: ['Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My Products', data: ['Add a New Buying Lead', 'Add a New Buying Lead', 'Add a New Buying Lead']},
          {name: 'My account', data: ['Add a New Buying Lead']}
        ],
      }
    },
  }
</script>
