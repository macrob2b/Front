<template>
    <v-row>
      <div class="company-main " >
        <ProfileCard></ProfileCard>
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
        ],
      }
    },
  }
</script>

<style scoped>
.company-main{
  width: 100%;
}
</style>
