<template>
  <v-container fluid class="company-profile">
    <v-row>
      <div class="company-side-bar">
        <SideBar></SideBar>
      </div>
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
  </v-container>
</template>

<script>
/* eslint-disable */
  import SideBar from '../components/company/side-bar'
  import ProfileCard from '../components/company/profile-card'
  import Stepper from '../components/company/stepper'
  import Navigation from "~/components/navigation"
  export default {
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
    methods: {
      updateData() {
        this.$axios.post('/api/update_company_general_info',
          {
            "role": "seller,buyer,agent",
            "company_name": "MacroB2B Co",
            "business_type": "Ex: 1 or 2 ...",
            "location": "lat,lng",
            "street_address": "52 Main Street London N86 7VH",
            "postal_code": "N4 2QE",
            "phone": "+4479352121",
            "fax": "+4479395212",
            "main_products_keywords": "test1,test2",
            "year_established": "2010",
            "employees_total": "50",
            "annual_revenue": "50,000",
            "description": "Example is a very big company ....",
            "logo": "One png or svg or webp file",
            "images": "Multiple png,jpg or webp file",
            "brochure": "Multiple png,jpg,pdf or webp file",
            "video": "One mp4 file"
          }).then(response => {
          console.log(response)

        }).catch(({response}) => {
          if (response.status == 401) {
            this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
          } else if (response.status == 500 || response.status == 504) {
            this.$toast.error(this.$t(`REQUEST_FAILED`));
          }
        });
      }
    }
  }
</script>
