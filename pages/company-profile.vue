<template>
  <v-container fluid class="company-profile">
    <v-row>
      <div class="company-side-bar">
        <SideBar></SideBar>
      </div>
      <div class="company-main">
        <ProfileCard></ProfileCard>
        <div v-if="mobileSize" class="mobile-nav">
          <v-btn @click.stop="drawer = !drawer">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </div>
        <Navigation :drawer="drawer" :items="items" @close="drawer = false"></Navigation>
        <Stepper></Stepper>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from '../components/company/side-bar'
import ProfileCard from '../components/company/profile-card'
import Stepper from '../components/company/stepper'
import Navigation from "~/components/navigation"
export default {
  name: "company-profile",
  components: {
    SideBar,
    ProfileCard,
    Stepper,
    Navigation
  },
  data() {
    return {
      mobileSize: false,
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
  /* eslint-disable */
  mounted: function () {
    this.$nextTick(function () {
      this.onResize();
    });
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      if (window.innerWidth <= 960) {
        this.mobileSize = true;
      } else if (window.innerWidth > 960) {
        this.mobileSize = false;
      }
    }
  },
}
</script>

<style scoped>

</style>
