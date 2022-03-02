<template>
  <!-- App.vue -->

  <v-app>
    <Header/>
    <v-main class="mainContainer">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3" class="d-none d-md-block">
            <SideBar></SideBar>
            <div class="text-center mt-12" >
              <v-btn
                :loading="logout_loading"
                @click="logout()">
                Logout
              </v-btn>
            </div>

          </v-col>
          <v-col cols="12" md="9">
            <Nuxt/>

          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script>
import SideBar from '../components/company/side-bar'
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
export default {
  components:{
    SideBar,
    Footer,
    Header
  },
  data(){
    return{
      logout_loading:false
    }
  },
  name: "user_dashboard",
  methods:{
    logout(){
      this.logout_loading=true;
      this.$auth.logout();
      this.logout_loading=false;
    }
  }
}
</script>

<style scoped>

</style>
