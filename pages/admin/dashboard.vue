<template>
  <div>


    <!--Statistic section-->

    <v-row class="mt-5">
      <v-col cols="12" md="4">
        <v-card
          class="mx-auto "
          color="purple"
          max-width="400"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 white--text">
                Registered Company
              </v-list-item-title>
              <v-list-item-subtitle class="white--text">Statistics of registered companies
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col
                class="text-h2 white--text"
                cols="6"
              >
                {{company_count}}
              </v-col>
              <v-col cols="6">
                <v-img
                  src=""
                  alt="Sunny image"
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text to="/admin/company" class="white--text">
              Full Report
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card
          color="warning"
          class="mx-auto"
          max-width="400"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 ">
                Registered products
              </v-list-item-title>
              <v-list-item-subtitle>Statistics of registered products
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col
                class="text-h2"
                cols="6"
              >
                {{product_count}}
              </v-col>
              <v-col cols="6">
                <v-img
                  src=""
                  alt="Sunny image"
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text to="/admin/product">
              Full Report
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
      <v-col cols="12" md="4">
        <v-card
          color="info"
          class="mx-auto"
          max-width="400"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 white--text">
                Registered users
              </v-list-item-title>
              <v-list-item-subtitle class="white--text">Statistics of registered users
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col
                class="text-h2 white--text"
                cols="6"
              >
                {{user_count}}
              </v-col>
              <v-col cols="6">
                <v-img
                  src=""
                  alt="Sunny image"
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>


          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text to="/admin/user" class="white--text">
              Full Report
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>


    <!--End Statistic section-->


    <!--Chart section-->

    <br>
    <br>
    <br>
<!--    <h2>Sale report</h2>-->
<!--    <v-card-->
<!--      class="mx-auto text-center col-12"-->
<!--      color="green"-->
<!--      dark-->

<!--    >-->
<!--      <v-card-text>-->
<!--        <v-sheet color="rgba(0, 0, 0, .12)">-->
<!--          <v-sparkline-->
<!--            :value="value"-->
<!--            color="rgba(255, 255, 255, .7)"-->
<!--            height="100"-->
<!--            padding="24"-->
<!--            stroke-linecap="round"-->
<!--            smooth-->
<!--          >-->
<!--            <template v-slot:label="item">-->
<!--              ${{ item.value }}-->
<!--            </template>-->
<!--          </v-sparkline>-->
<!--        </v-sheet>-->
<!--      </v-card-text>-->


<!--      <v-divider></v-divider>-->

<!--      <v-card-actions class="justify-center">-->
<!--        <v-btn-->
<!--          block-->
<!--          text-->
<!--        >-->
<!--          Show Report-->
<!--        </v-btn>-->
<!--      </v-card-actions>-->
<!--    </v-card>-->
    <!--End chart section-->
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'is_admin'],
  name: "dashboard",
  layout: "admin",
  head() {
    return {
      title: "Admin dashboard"
    }
  },
  data() {
    return{
      user_count:'--',
      company_count:'--',
      product_count:'--'
    }
  },
  mounted() {
    this.getStatistics();
  },
  methods: {
    getStatistics() {
      this.$axios.$post('/api/get_admin_statistics')
        .then(response => {
          this.company_count=response.company_count;
          this.user_count=response.user_count;
          this.product_count=response.product_count;
        }).catch(err => {
        this.loading = false;
        if (err.response.status === 401)
          this.$auth.logout();

        this.$toast.error(err.status);
      })
    }
  }
}
</script>

<style scoped>

</style>
