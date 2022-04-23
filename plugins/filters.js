import Vue from 'vue'

export default () => {
  Vue.filter('currency', function (value) {
    return Number(value).toLocaleString("fa-IR", {
      // style: "currency",
      currency: "IRR"
    });
  })
}
