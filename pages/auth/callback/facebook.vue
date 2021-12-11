<template>

</template>

<script>
import config from "../../../config";

export default {
  name: "google",
  async mounted() {
    console.log(this.$route.query.code);
    await this.$axios.post('https://api.macrob2b.com/api/facebook_login',
      {
        access_token: this.$route.query.code,
    }).then(response => {
      this.$toast.success('You logged in successfully');

      // this.$router.push({
      //   path:"/user_dashboard"
      // })
    }).catch(({response}) => {
      if (response.status==401){
        this.$toast.error('The information entered is incorrect.');
      }else if(response.status==500 || response.status==504){
        this.$toast.error('An error occurred. Please try again.');
      }
    });
  }
}
</script>

<style scoped>

</style>
