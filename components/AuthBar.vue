<template>
  <v-card>
    <v-card-title>
      {{ $t(`MYACCOUNT`) }}
    </v-card-title>
    <v-card-text>
      <v-btn to="login" color="primary" block class="mb-2">
        {{ $t(`LOGIN`) }}
      </v-btn>
      <v-btn to="register" color="primary" block>
        {{ $t(`REGISTER`) }}
      </v-btn>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name: "AuthBar"
}
</script>

<style scoped>

</style>
