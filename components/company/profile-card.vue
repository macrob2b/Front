<template>
  <div class="profile-card">
    <div class="profile-card-header">
      <div class="profile-header-title">
        <p class="title">Company Profile</p>
      </div>
      <div class="premium">
        <v-btn>GO PREMIUM</v-btn>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="profile-card-body">
      <div class="edit-menu">
        <v-btn v-for="index in menu" :key="index"><div class="dot">&nbsp;</div> {{ index }}</v-btn>
      </div>
      <div class="strength-inner">
        <p>Company Profile Strength</p>
        <v-slider
          v-model="strength.val"
        ></v-slider>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu: [
          'Here you can edit or update your company information',
          // 'Here you can edit or update your company information'
        ],
        strength: {
          val: '40'
        }
      }
    }
  }
</script>
