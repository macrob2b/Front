import Vue from 'vue'

export default () => {
  Vue.filter('currency', function (value) {
    return Number(value).toLocaleString("en-US", {
      // style: "currency",
      currency: "USD"
    });
  })
}
