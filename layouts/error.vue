<template>
  <v-app dark>
    <error-msg v-if="error.statusCode === 404"/>
    <div v-else>
      <h1 >
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
import ErrorMsg from '../components/error';
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  components:{
    ErrorMsg
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
