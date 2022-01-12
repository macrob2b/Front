<template>
  <div class="user-type">
    <div class="user-type-header">
      <p>I am</p>
    </div>
    <v-divider></v-divider>
    <div class="user-type-body">
      <v-checkbox
        v-model="buyer"
        label="Buyer"
      ></v-checkbox>
      <v-checkbox
        v-model="seller"
        label="Seller"
      ></v-checkbox>
      <v-checkbox
        v-model="agent"
        label="Agent"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        buyer: false,
        seller: false,
        agent: false
      }
    },
    watch: {
      $data: {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data)
        },
        deep: true
      }
    },
    // computed: {
    //   checked: {
    //     get() {
    //       let buyer = this.buyer
    //       let seller = this.seller
    //       let agent = this.agent
    //       let userType = [buyer,seller,agent]
    //       return userType;
    //     },
    //     set(userType) {
    //       this.$emit("updateData", userType);
    //     }
    //   }
    // }

  }
</script>
