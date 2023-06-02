<template>
  <div className="d-flex justify-space-between">
    <div className="slider-sheet">
      <ProductSlider :newProducts="new_products" :loading="new_product_loading"/>
    </div>
  </div>
</template>

<script>
import ProductSlider from "../product/ProductSlider.vue";
import ProductSlider1 from "../product/ProductSlider1.vue";

export default {
  name:"related-products",
  props: {
    mediaList: {
      type: Array,
      default: []
    },
    id: 0,
  },
  data() {
    return {
      new_products: null,
      new_product_loading: false,
      newProductsSideImage: null,
    }
  },
  watch: {
    'mediaList': {
      handler(val) {
        if (!(val == null || val == "null" || val == [])) {
          //Product side image
          var new_products_side_image = this.mediaList.filter(item => {
            return item.file_section == "new_products_side_image"
          });
          if (new_products_side_image && new_products_side_image[0] && new_products_side_image[0]['file'])
            this.newProductsSideImage = (`${process.env.baseUrl}/general/${new_products_side_image[0]['file']}`);
          //End product side image
        }
      },
      deep: true
    }
  }
  ,
  components: {
    ProductSlider, ProductSlider1
  }
  ,
  mounted() {
    this.getNewProducts();
  }
  ,
  methods: {
    getNewProducts() {
      this.new_product_loading = true;
      this.$axios.$post('/api/get_new_products')
        .then(response => {
          this.new_products = response;
        }).catch(err => {
        console.log(err);
      }).finally(msg => {
        this.new_product_loading = false;
      })
    }
  }
}
;
</script>

<style scoped>
.slider-sheet {
  overflow: hidden;
}

.banner {
  background-image: url("/banner-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  /* background-size: 100 100; */
  background-size: contain;
  /* width: 20%; */
  height: 420px;
}

.tit {
  position: relative;
  top: 60px;
  margin-right: 20px;
  text-align: center;
  font-size: 16px !important;
  color: white;
}

.banner-container {
  margin-top: -30px;
}
</style>
