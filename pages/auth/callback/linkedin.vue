<template>
  <v-container>
    <h2 class="text-center ma-16">
      <v-progress-circular color="primary" class="mr-2" size="30" indeterminate></v-progress-circular>
      Logging in
    </h2>
  </v-container>
</template>

<script>

export default {
  name: "linkedinCallBack",
  auth: 'guest',
  async mounted() {
    await this.$axios.post('/api/linkedin_login',
      {
        code        : this.$route.query.code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      }).then(response => {
      if (response.data.msg === 'UnAuthorised') {
        this.$toast.error('The information entered is incorrect');
      } else {
        this.$auth.setUserToken(response.data.token).then(async () => {
          this.$toast.success('You logged in successfully');
          await this.$auth.fetchUser();

          var path = "/user-dashboard";
          //Check last path
          if (this.$store && this.$store.state && this.$store.state.user && this.$store.state.user.lastPath
            && !(this.$store.state.user.lastPath === ''
              || this.$store.state.user.lastPath === '/'
              || this.$store.state.user.lastPath === '/forget_pass'
              || this.$store.state.user.lastPath === '/register'
            ))
            path = this.$store.state.user.lastPath;

          await this.$router.push({
            path: path
          });
        });
      }

    }).catch(({response}) => {
      if (response.status == 401) {
        this.$toast.error('The information entered is incorrect');
      } else if (response.status == 500 || response.status == 504) {
        this.$toast.error('An error occurred. Please try again');
      }
    });
  }
}
</script>

<style scoped>

</style>
