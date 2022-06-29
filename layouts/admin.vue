<template>
  <v-app>
    <v-app-bar
      color="deep-purple accent-4 "

      fixed
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

    </v-app-bar>


    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user_first_name }}</v-list-item-title>
            <v-list-item-subtitle class="pointer" @click="logout">Online | Logout</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/admin/category">
            <v-list-item-title>Category manage</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/user">
            <v-list-item-title>User manage</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/company">
            <v-list-item-title>Company manage</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/static-page">
            <v-list-item-title>Static page manage</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/media">
            <v-list-item-title>Media manage</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/contact-us">
            <v-list-item-title>Contact us manage</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/dashboard">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/" color="primary">
            <v-list-item-title>Home page</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <!--    </v-app-bar>-->
    <v-main style="margin-top: 60px">
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>


  </v-app>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      user_first_name: this.$auth.FirstName,
      drawer: false,
      fixed: false,

    }
  },
  mounted() {


  }
  , methods: {
    async logout() {
      await this.$auth.logout().then(() =>
        this.$toast.success('Logout successfully')
      );
    },
  }
}
</script>

<style>

</style>
