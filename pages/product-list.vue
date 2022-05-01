<template>
  <div class="market">
    <main_tabs/>
    <div class="market-items">
      <productsTab></productsTab>
    </div>
  </div>
</template>

<script>
import productsTab from '../components/products-tab'
import Main_tabs from "../components/main_tabs";

export default {
  name: 'product-list',
  auth: false,
  head() {
    return {
      title: 'Product list',
    };
  },
  components: {
    Main_tabs,
    productsTab,

  }
}
</script>
