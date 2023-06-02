<template>
 <v-container>
   <v-col cols="12">
     <div class="not-found-page">
       <!--    <div class="holder-404">-->
       <div class="mb-4 set404">
         <span>4</span>
         <span>0</span>
         <!--      <img alt="" class="img-404" src="../assets/img/earth.jpg"/>-->
         <span>4</span>
       </div>
       <div class="description">
         <h2 class="">It looks like you'r lost..</h2>
         <h3>The page you are looking for no longer exists.</h3>
       </div>
       <!--    </div>-->
       <nuxt-link :to="{ path: '/'}" class="btn btn-solid text-md-body-1 text-caption back-to-home">GO TO HOMEPAGE
       </nuxt-link>
     </div>
   </v-col>
 </v-container>
</template>
<script>
export default {
  name:'error-msg',
  auth:false
}
</script>
<style>



</style>
