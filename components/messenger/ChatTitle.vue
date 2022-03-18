<template>
  <div class="chatTitle" :class="className">

    <!--         Group Icon           -->
    <v-icon v-if="ticketType === 4">mdi-account-multiple</v-icon>

    <!--         Channel Icon           -->
    <v-icon v-if="ticketType === 5">mdi-bullhorn</v-icon>

    {{ ticketTitle }}

    <!--         System Check Icon           -->
    <v-icon v-if="ticketType === 1"
            class="mx-0"
            color="blue"
            dense>mdi-check-decagram
    </v-icon>

    <!--         Support Check Icon           -->
    <v-icon v-if="ticketType === 2"
            class="mx-0"
            color="blue"
            dense>mdi-check-decagram-outline
    </v-icon>

  </div>
</template>

<script>
export default {
  name : "ChatTitle",
  props: ['ticketType', 'ticketTitle', 'className']
}
</script>

<style scoped>

</style>
