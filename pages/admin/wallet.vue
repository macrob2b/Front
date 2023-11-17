<template>
  <div>
    <div>
      <!-- <button @click="connectWallet">Connect Wallet</button> -->
    </div>
  </div>
</template>

<script>
// import { Connection, Wallet } from "@solana/web3.js"

export default {
  name: "solana-wallet",

  methods: {
    // async connectWallet() {
    //   // Connect to the Solana network
    //   const connection = new Connection("https://api.mainnet-beta.solana.com");

    //   // Connect to the user's wallet
    //   const wallet = new Wallet("https://www.sollet.io", connection);

    //   // Connect the wallet
    //   await wallet.connect();

    //   // Check if the wallet is connected
    //   if (wallet.connected) {
    //     console.log("Wallet connected:", wallet.publicKey.toBase58());
    //     // You can use wallet.publicKey in your app to identify the connected user.
    //   } else {
    //     console.log("Wallet not connected");
    //   }
    // },
  },
};
</script>
