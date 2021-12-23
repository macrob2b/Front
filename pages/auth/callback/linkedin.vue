<template>
  <v-container>
    <h2 class="text-center ma-16">
      <v-progress-circular color="primary" class="mr-2" size="30" indeterminate></v-progress-circular>
      {{ $t(`LOGGING_IN`) }}
    </h2>
  </v-container>
</template>

<script>
import config from "../../../config";

export default {
  name: "linkedinCallBack",
  auth: 'guest',
  async mounted() {
    await this.$axios.post('https://api.macrob2b.com/api/linkedin_login',
      {
        code        : this.$route.query.code,
        redirect_uri: config.linkedinRedirectUri,
      }).then(response => {

      this.$auth.setUserToken(response.data.token).then(async () => {
        this.$toast.success(this.$t(`LOGIN_SUCCESSFUL`));
        await this.$auth.fetchUser();
        await this.$router.push({
          path: "/user-dashboard"
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
