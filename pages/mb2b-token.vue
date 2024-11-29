<template>
  <v-container  >
    <v-row>
      <v-col cols="12" class="mb-2">
        <h1>
          MB2B Token
        </h1>
      </v-col>
      <v-col cols="12">
       <v-btn href="https://jup.ag/swap/USDC-BdLaNH3m6da2jXkx6XpGwLkUEKB4EbQWxLxntv5BuvAn" target="_blank" class="mb-8 primary">Buy Token Now</v-btn>
      </v-col>
    </v-row>
    <iframe height="800px" width="100%" class="mx-auto" id="geckoterminal-embed" title="GeckoTerminal Embed" src="https://www.geckoterminal.com/solana/pools/6iFXKWTP7S4FRhKrK8oLtTVQivppyfuqX3eFwp5y7Wk2?embed=1&info=0&swaps=1" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>
  </v-container>
</template>

<script>
export default {
  auth:false,
  name: "mb2b-token",
  head() {
    return {
      title: 'mb2b-token',

    }
  },

  data(){
    return{

    }
  }
}
</script>

<style scoped>

video {
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
  height: auto;
}
</style>
