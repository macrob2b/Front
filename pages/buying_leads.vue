<template>
  <div className="market">
    <main_tabs/>
    <div className="market-items">
      Buying leads content
    </div>
  </div>
</template>

<script>

import Main_tabs from "../components/main_tabs";
export default {
  name: 'buying_leads',
  auth: false,
  components: {
    Main_tabs
  }
}
</script>
