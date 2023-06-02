<template>
  <div class="user-type">
    <div class="user-type-header">
      <p>I am</p>
    </div>
    <v-divider></v-divider>
    <div class="user-type-body">
      <v-checkbox
        v-model="roles"
        value="buyer"
        label="Buyer"
      ></v-checkbox>
      <v-checkbox
        v-model="roles"
        value="seller"
        label="Seller"
      ></v-checkbox>
      <v-checkbox
        v-model="roles"
        value="agent"
        label="Agent"
      ></v-checkbox>
      <v-checkbox
        v-model="roles"
        value="logistics"
        label="Logistics"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    props:['serverData'],
    data() {
      return {
        roles: []
      }
    },
    watch: {
      $data: {
        handler: function(val, oldVal) {
          this.$emit('updateData', this.$data.roles.join(','))
        },
        deep: true
      },
      serverData: {
        handler: function(val, oldVal) {
          this.roles = val.role
        },
        deep: true
      }
    },


  }
</script>
