<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="6">
        <h1>MB2B Airdrop is coming Soon</h1>
        <v-text-field
          class="mt-4"
          v-model="address"
          :loading="loading"
          placeholder="Just leave your Solana Wallet Address here"
          label="Wallet Address"
          outlined
        >
        </v-text-field>
        <v-btn
          @click="verify"
          :disabled="!address"
          height="50"
          color="primary"
          block
          class="mb-2"
          :loading="loading"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  auth: false,
  name: "airdrop",
  head() {
    return {
      title: "Mb2b Airdrop Party",
    };
  },

  data() {
    return {
      address: "",
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.$axios
        .$post("/api/airdrop", { address: this.address })
        .then(() => {
          this.$toast.success("Submited");
          this.address = "";
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error(err);
        });
    },
    verify() {
      this.$axios
        .$post("/governance_api/verifyWalletAddress", {
          address: this.address,
        })
        .then((res) => {
          if (res.valid) this.submit();
          else this.$toast.error("Wallet address is invalid");
        })
        .catch(() => {
          this.loading = false;
          this.$toast.error("Wallet address is invalid");
        });
    },
  },
};
</script>
