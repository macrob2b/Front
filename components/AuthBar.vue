<template>
  <v-card>
    <v-card-title>
      {{ this.$auth.loggedIn ? this.$auth.user : 'My Account' }}
    </v-card-title>
    <v-card-text>
      <v-btn to="login" v-if="!this.$auth.loggedIn" color="primary" block class="mb-2">
        Login
      </v-btn>
      <v-btn to="register" v-if="!this.$auth.loggedIn" color="primary" block class="mb-2">
        Sign up
      </v-btn>
      <v-btn @click="logout()" v-if="this.$auth.loggedIn" color="primary" block>
        Logout
      </v-btn>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name   : "AuthBar",
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
