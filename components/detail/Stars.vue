<template>
  <div class="mt-1">
    <v-icon v-for="(start,index) in 5"
            :color="index<active ? 'amber darken-1':' #ccc'"
            @click="setACtiveStar(index+1)"

    >
      mdi-star
    </v-icon>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        active: 0
      }
    },
    methods: {
      setACtiveStar(index) {
        this.active = index
      }
    }
  }
</script>
