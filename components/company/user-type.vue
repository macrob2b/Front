<template>
  <div class="user-type">
    <div class="user-type-header">
      <p>I am</p>
    </div>
    <v-divider></v-divider>
    <div class="user-type-body">
      <v-radio-group v-model="radioGroup">
        <v-radio
          v-for="index in types"
          :key="index"
          :label="`${ index }`"
          :value="index"
        ></v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radioGroup: 1,
        types: [
          'Buyer',
          'Seller',
          'Agent'
        ]
      }
    }
  }
</script>
