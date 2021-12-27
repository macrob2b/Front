<template>
  <section class="product-info pa-md-5">
    <h1>
      Product Name
    </h1>

    <!--  Product Rate  -->
    <Stars v-show="!$vuetify.breakpoint.xs"/>

    <v-divider class="my-3"></v-divider>

    <!-- Information List    -->
    <v-list class="transparent">
      <v-list-item v-for="(info, i) in infos" :key="i">
        <v-list-item-content>
          <v-row no-gutters>
            <v-col cols="6" lg="3">
              <div>{{info.label}}</div>
            </v-col>
            <v-col cols="6" lg="3" >
              <div class="d-flex justify-end">{{info.value}}</div>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!--Share-->
    <Share v-show="!$vuetify.breakpoint.xs"/>

    <v-row v-show="$vuetify.breakpoint.xs" >
      <v-col
             cols="6" lg="auto"
             align-self="center"
             class="d-flex mx-lg-4 pa-2 rounded-lg  justify-space-between align-center grey lighten-2 text-md-body-2"
             style="font-size: 10px"
      >
        <v-icon
          color="white"
          style="background-color: #444;border-radius:5px"
          class="ml-1 mr-3 pa-1"
          small
        >
          mdi-phone
        </v-icon>
        contact supplier
      </v-col>
      <v-col cols="6" class="px-0">
        <Stars/>
      </v-col>
    </v-row>


    <v-row class="ml-md-4 mt-8 d-flex align-center justify-space-between justify-lg-start px-0">
      <v-col cols="3" lg="4" class="px-lg-0 mb-lg-5 mb-lg-0 mr-lg-8" >
        <AddToCart/>
      </v-col>
      <v-col cols="5" lg="3" class="mx-lg-2 px-0" >
        <Count/>
      </v-col>
      <v-col cols="3" lg="3" class="mx-lg-2 text--black font-weight-bold text-center px-0 mt-lg-0 pt-lg-0">
        195.562 $
      </v-col>
    </v-row>

  </section>
</template>


<script>
  import AddToCart from "./AddToCart";
  import Count from "./Count";
  import Stars from "./Stars";
  import Share from "./Share";

  export default {
    components: {
      AddToCart,
      Count,
      Stars,
      Share
    },
    data() {
      return {
        infos: [
          {
            label: "Brand Name",
            value: "AAA"
          },
          {
            label: "Place Of Origin",
            value: "AAA"
          },
          {
            label: "Condition",
            value: "AAA"
          },
          {
            label: "Model Number",
            value: "AAA"
          },
          {
            label: "Supply Type",
            value: "AAA"
          },
          {
            label: "Color",
            value: "AAA"
          },
        ],
        price: "195.562 $"
      }
    }
  }
</script>

<style scoped>

</style>
