<template>
  <div class="side-bar">
    <div class="title">
      <h4>Basic Services</h4>
    </div>
    <div class="side-bar-container">

     <user-menu/>

    </div>
  </div>
</template>

<script>
  import UserMenu from "../dashboard/user-menu";
  export default {
    components: {UserMenu},

  }
</script>
