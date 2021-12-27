<template>
  <v-col style="background-color: #f3f3f3;height: 100%;overflow:auto;" class="rounded-lg">
    <v-row justify="space-between" class="py-4 px-3">
      <v-col class="font-weight-black"> Description by Manufacturer </v-col>
      <!--      If Have Rate prop-->
      <Stars />

    </v-row>
    <v-divider></v-divider>
    <!--    If have description prop  -->
    <v-col>
      <p class="text-grey">

        Our company has maintained low competitive prices, good quality as well
        as timely deliveries. We are a gold supplier and assessed.
      </p>
    </v-col>
    <v-col style="max-height: 350px" class="overflow-y-auto">
      <v-list class="transparent">
        <v-list-item v-for="(info, i) in infos" :key="i">
          <v-list-item-content>
            <v-row no-gutters>
              <v-col cols="6" lg="3">
                <div>{{info.title}}</div>
              </v-col>
              <v-col cols="6">
                <div>
                  <span v-for="(item,j) in info.items" :key="j">
                    {{item}} ,
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-col>
</template>

<script>
import Stars from "./Stars";

export default {
  components: { Stars },
  data() {
    return {
      infos: [
        {
          title: "Car Types",
          items: ["Commercial", "SUV", "Light Trucks", "smaller cars"],
        },
        {
          title: "Car Types",
          items: ["Commercial", "SUV", "Light Trucks", "smaller cars"],
        },
        {
          title: "Car Types",
          items: ["Commercial", "SUV", "Light Trucks", "smaller cars"],
        },
        {
          title: "Car Types",
          items: ["Commercial", "SUV", "Light Trucks", "smaller cars"],
        },
        {
          title: "Car Types",
          items: ["Commercial", "SUV", "Light Trucks", "smaller cars"],
        },
      ],
    };
  },
};

</script>
