<template>
  <v-container fluid class="company-profile">
    <v-row>
      <div class="company-side-bar">
        <SideBar></SideBar>
      </div>
      <div class="company-main" >
        <div v-if="mobileSize" class="mobile-nav">
          <v-btn @click.stop="drawer = !drawer">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </div>
        <Navigation :drawer="drawer" :items="items" @close="drawer = false"></Navigation>


        <h3 class="mt-8">Wellcome to largest b2b platform</h3><br>
        <p>
          You can esay use this platform to sell or buy
        </p>


      </div>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from '../components/company/side-bar'
import Navigation from "~/components/navigation"

export default {
  name: "user-dashboard",
  auth: true,
  components:{
    SideBar,
    Navigation
  },
  data() {
    return {
      mobileSize: false,
      drawer: false,
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
  }
}
</script>

<style scoped>

</style>
