<template>
  <div className="companies">
   <CompanyItem/>
  </div>
</template>

<script>
  import CompanyItem from "./CompanyItem";
  export default {
    name: 'Companies',
    auth: false,
    components: {
      CompanyItem
    }
  }
</script>
