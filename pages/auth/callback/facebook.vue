<template>
  <v-container>
    <h2 class="text-center ma-16">
      <v-progress-circular color="primary" class="mr-2" size="30" indeterminate></v-progress-circular>
      {{ $t(`LOGGING_IN`) }}
    </h2>
  </v-container>
</template>

<script>

export default {
  name: "facebookCallBack",
  auth: 'guest',
  async mounted() {
    await this.$axios.post('/api/facebook_login',
      {
        access_token: this.$route.query.code,
      }).then(response => {

      this.$auth.setUserToken(response.data.token).then(async () => {
        this.$toast.success(this.$t(`LOGIN_SUCCESSFUL`));
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

    }).catch(({response}) => {
      if (response.status == 401) {
        this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
      } else if (response.status == 500 || response.status == 504) {
        this.$toast.error(this.$t(`REQUEST_FAILED`));
      }
    });
  }
}
</script>

<style scoped>

</style>
