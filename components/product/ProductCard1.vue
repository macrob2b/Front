<template>
  <div class="mx-2 card"  >
    <v-card min-width="0" height="160"
            :to="'/product-details/'+product._id"
            width="125px"
            elevation="0">
      <div class="pa-2">
        <img
          :src="getImgFile(product)" />
      </div>
      <div class="text-center">{{product.title.length<=15 ? product.title : product.title.substring(0,12)+"..."}}</div>
    </v-card>
  </div>
</template>

<script>
import img from "../../assets/img/no-image.png";

export default {
  props:['product'],
  methods:{
    getImgFile(item) {
      var img = require('assets/img/no-image.png');
      if (item.images && item.images.length > 0)
        img = "https://dl.macrob2b.com/products/" + item._id + "/images/thumbnail/" + item.images[0];
      return img;

    }
  }
};
</script>

<style scoped>
#div1{
  color: #165048; font-size: 26px
}
#span1{
  font-size: 13px
}
#span2{
  color: white
}

@media screen and (max-width: 600px) and (min-width: 320px) {
  img{
    width: 126px;
    height: auto;
  }
  .text-center{
    font-size : 13px !important;
  }
  .v-btn{
    font-size : 12px !important;
    min-width: 0px !important;
    width: 110px !important;
    text-align: center !important;
  }
}

.card img{
  width: 110px;
  height: 110px;
  border-radius: 5px;
}
</style>
