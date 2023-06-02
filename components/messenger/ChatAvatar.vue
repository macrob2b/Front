<template>

  <div class="avatar" :class="className">

    <!--        System         -->
    <v-avatar v-if="ticketType === 1" :size="size">
      <v-img :src="`macrob2b.ico`"></v-img>
    </v-avatar>

    <!--        Support         -->
    <v-avatar v-if="ticketType === 2"
              :size="size"
              color="primary">
      <v-icon color="white" x-large>mdi-face-agent</v-icon>
    </v-avatar>

    <!--        Direct         -->
    <v-badge v-if="ticketType === 3"
             :color="getUserStatusColor(usersData[0].status)"
             offset-x="10"
             offset-y="10"
             bordered
             bottom
             dot>
      <v-avatar :color="!avatar ? color : ''" :size="size">
        <v-img v-if="avatar" :src="avatar"></v-img>
        <span class="white--text" v-if="!avatar" v-text="ticketTitle.substr(0, 1)"></span>
      </v-avatar>
    </v-badge>

    <!--        Group || Channel        -->
    <v-avatar v-if="ticketType === 4 || ticketType === 5" :color="!avatar ? color : ''"
              :size="size">
      <v-img v-if="avatar" :src="avatar"></v-img>
      <span class="white--text" v-if="!avatar" v-text="ticketTitle.substr(0, 1)"></span>
    </v-avatar>

  </div>

</template>

<script>
export default {
  name   : "ChatAvatar",
  props  : ['ticketType', 'ticketTitle', 'color', 'avatar', 'size', 'className', 'usersData'],
  methods: {
    getUserStatusColor(status) {
      switch (status) {
        // offline
        case 0:
          return 'grey lighten-1';
        //  online
        case 1:
          return 'green';
        //  last seen
        case 2:
          return 'yellow';
      }
    }
  }
}
</script>

<style scoped>

</style>
