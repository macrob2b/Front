<template>
  <div>
    <v-row>
      <v-col v-for="n in 5" :key="n">
        <v-card>
          <img src="lorem-ipsum.png" width="100%"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>