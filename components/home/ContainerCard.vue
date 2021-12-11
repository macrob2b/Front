<template>
  <div class="section">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.section {
  background-color: #f8f8f8;
  border-radius: 10px;
    padding:8px !important;
    margin : 20px !important;
}
@media screen and (max-width: 600px) and (min-width: 320px) {
  .section{
    padding: 6px !important;
    margin : 7px !important;
  }
}
</style>