<template>
  <div className="market">
    <main_tabs/>
    <div className="market-items">
      Comapnies content
    </div>
  </div>
</template>

<script>

import Main_tabs from "../components/main_tabs";
export default {
  name: 'companies',
  auth: false,
  components: {
    Main_tabs
  }
}
</script>
