<template>
  <v-container class="dashboard" fluid>
    <v-row>
      <v-col
        cols='12' class="px-0">
        <div class="dashboard-holder">
          <div class="d-flex justify-space-between mb-4 dashboard-box-header">
            <h1 class="headline font-weight-bold">Dashboard</h1>
            <div class="premium">

<!--              <v-btn class="subtitle-1 white&#45;&#45;text text-capitalize " elevation="0">-->
<!--                Go premium-->
<!--              </v-btn>-->
            </div>
          </div>
          <div></div>
          <v-divider class="d-md-block d-none mb-8"></v-divider>
<!--          <div class="intro">-->
<!--            <v-row>-->
<!--              <v-col-->
<!--                cols="12"-->
<!--                md="7">-->
<!--                <div class="fill-height d-flex flex-column justify-space-between">-->
<!--                  <div>-->
<!--                    <h2 class="title">Help your Business grow up to high level</h2>-->
<!--                    <p class="heading">Watch the tutorials and learn how to grow your business</p>-->
<!--                  </div>-->
<!--                  <div>-->
<!--                    <v-btn class="body-2 text-capitalize" elevation="0">-->
<!--                      Watch-->
<!--                    </v-btn>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </v-col>-->
<!--              <v-col-->
<!--                class="d-md-block d-none text-right"-->
<!--                md="5">-->
<!--                <img alt="" src="~/assets/img/9812.png">-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </div>-->
          <div class="parts">
            <v-row class="ma-0">
              <v-col
                class="rounded-lg part-item"
                cols="6"
                md="3"
              >
                <nuxt-link
                  to="/user/product"
                  class="d-flex flex-column justify-center align-center rounded-lg part-item-content storefront">
                  <div>
                    <v-icon>mdi-storefront</v-icon>
                  </div>
                  <p class="title">My products</p>
                </nuxt-link>
              </v-col>
<!--              <v-col-->
<!--                class="rounded-lg part-item"-->
<!--                cols="6"-->
<!--                md="3"-->
<!--              >-->
<!--                <div class="d-flex flex-column justify-center align-center rounded-lg part-item-content basket">-->
<!--                  <div>-->
<!--                    <v-icon class="mdi mdi-basket"></v-icon>-->
<!--                  </div>-->
<!--                  <p class="title">My basket</p>-->
<!--                </div>-->
<!--              </v-col>-->
              <v-col
                class="rounded-lg part-item"
                cols="6"
                md="3"
              >
                <nuxt-link
                  to="/user/company"
                  class="d-flex flex-column justify-center align-center rounded-lg part-item-content company">
                  <div>
                    <v-icon>mdi-office-building-outline</v-icon>
                  </div>
                  <p class="title">Company profile</p>
                </nuxt-link>
              </v-col>
<!--              <v-col-->
<!--                class="rounded-lg part-item"-->
<!--                cols="6"-->
<!--                md="3"-->
<!--              >-->
<!--                <div class="d-flex flex-column justify-center align-center rounded-lg part-item-content premium">-->
<!--                  <div>-->
<!--                    <v-icon>mdi-pyramid</v-icon>-->
<!--                  </div>-->
<!--                  <p class="title">Premium</p>-->
<!--                </div>-->
<!--              </v-col>-->
            </v-row>
          </div>
          <v-row class="d-flex justify-md-space-between justify-center pa-10 rounded-lg statistics">
            <v-col cols="6" md="3" v-for="item in statisticsList" class="statistics-item">
              <div class="d-flex flex-column justify-center align-center statistics-item-content">
                <p class="statistics-count">{{ item.count }}</p>
                <p class="statistics-name">{{ item.name }}</p>
              </div>
            </v-col>
          </v-row>
<!--          <div class="rounded-lg notifications">-->
<!--            <h3 class="headline font-weight-bold">Notifications</h3>-->
<!--            <div class="notifications-holder">-->
<!--              <div class="d-flex align-center rounded-lg notifications-item update-notif">-->
<!--                <div class="icon-holder">-->
<!--                  <span class="d-flex justify-center align-center icon-box">-->
<!--                    <v-icon>mdi-update</v-icon>-->
<!--                  </span>-->
<!--                </div>-->
<!--                <div class="ms-4 notification-content">-->
<!--                  <h4 class="notification-name">Update</h4>-->
<!--                  <p class="notification-description">You need to update the desktop version to be aable to use our-->
<!--                    latest and awesome features to improve your market</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="d-flex align-center rounded-lg notifications-item successful-notif">-->
<!--                <div class="icon-holder">-->
<!--                  <span class="d-flex justify-center align-center icon-box">-->
<!--                    <v-icon>mdi-check</v-icon>-->
<!--                  </span>-->
<!--                </div>-->
<!--                <div class="ms-4 notification-content">-->
<!--                  <h4 class="notification-name">Update</h4>-->
<!--                  <p class="notification-description">You need to update the desktop version to be aable to use our-->
<!--                    latest and awesome features to improve your market</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="d-flex align-center rounded-lg notifications-item error-notif">-->
<!--                <div class="icon-holder">-->
<!--                  <span class="d-flex justify-center align-center icon-box">-->
<!--                    <v-icon>mdi-close</v-icon>-->
<!--                  </span>-->
<!--                </div>-->
<!--                <div class="ms-4 notification-content">-->
<!--                  <h4 class="notification-name">Update</h4>-->
<!--                  <p class="notification-description">You need to update the desktop version to be aable to use our-->
<!--                    latest and awesome features to improve your market</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="d-flex align-center rounded-lg notifications-item good-news-notif">-->
<!--                <div class="icon-holder">-->
<!--                  <span class="d-flex justify-center align-center icon-box">-->
<!--                    <v-icon>mdi-bell</v-icon>-->
<!--                  </span>-->
<!--                </div>-->
<!--                <div class="ms-4 notification-content">-->
<!--                  <h4 class="notification-name">Update</h4>-->
<!--                  <p class="notification-description">You need to update the desktop version to be aable to use our-->
<!--                    latest and awesome features to improve your market</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="text-center more-notification">-->
<!--              <v-btn class="primary subtitle-1 white&#45;&#45;text" elevation="0">-->
<!--                More-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </div>-->

        </div>
<!--        <div class="premium-benefits-holder">-->
<!--          <div class="">-->
<!--            <v-row>-->
<!--              <v-col-->
<!--                cols="12"-->
<!--                md="7">-->
<!--                <div class="rounded-lg benefits-details-holder">-->
<!--                  <v-row class="ma-0">-->
<!--                    <v-col cols="8">-->
<!--                      <h2 class="text-h5 font-weight-bold mb-4">Premium benefits</h2>-->
<!--                    </v-col>-->
<!--                    <v-col cols="2" class="d-flex align-end">-->
<!--                      <span class="font-weight-bold label">free</span>-->
<!--                    </v-col>-->
<!--                    <v-col cols="2" class="d-flex align-end">-->
<!--                      <span class="font-weight-bold label">Premium</span>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                  <v-row class="ma-0">-->
<!--                    <v-col cols="8">-->
<!--                      <p class="benefit-name">Benefit example</p>-->
<!--                    </v-col>-->
<!--                    <v-col cols="2">-->
<!--                       <span class="d-flex justify-center align-center status checked">-->
<!--                        <v-icon>mdi-check</v-icon>-->
<!--                       </span>-->
<!--                    </v-col>-->
<!--                    <v-col cols="2">-->
<!--                      &lt;!&ndash;  if ok => Add checked class   &ndash;&gt;-->
<!--                      <span class="d-flex justify-center align-center status ">-->
<!--                        <v-icon>mdi-close</v-icon>-->
<!--                       </span>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                  <v-row class="ma-0">-->
<!--                    <v-col cols="8">-->
<!--                      <p class="benefit-name">Benefit example</p>-->
<!--                    </v-col>-->
<!--                    <v-col cols="2">-->
<!--                       <span class="d-flex justify-center align-center status checked">-->
<!--                        <v-icon>mdi-check</v-icon>-->
<!--                       </span>-->
<!--                    </v-col>-->
<!--                    <v-col cols="2">-->
<!--                      &lt;!&ndash;  if ok => Add checked class   &ndash;&gt;-->
<!--                      <span class="d-flex justify-center align-center status ">-->
<!--                        <v-icon>mdi-close</v-icon>-->
<!--                       </span>-->
<!--                    </v-col>-->
<!--                  </v-row>-->
<!--                  <div class="mt-7 text-center">-->
<!--                    <v-btn class="primary body-2 benefit-btn" elevation="0">-->
<!--                      View plans-->
<!--                    </v-btn>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </v-col>-->
<!--              <v-col-->
<!--                class="d-md-block d-none text-center"-->
<!--                md="5">-->
<!--                <img alt="" src="~/assets/img/wavy.png">-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </div>-->
<!--        </div>-->
      </v-col>

    </v-row>
  </v-container>
</template>

<script>


export default {
  layout: 'user_dashboard',
  name: "user-dashboard",
  middleware: 'is_user',
  components: {},
  head() {
    return {
      title: 'Dashboard'
    }
  },
  data() {
    return {
      drawer: null,
      statisticsList: [
        {
          key:'company_views',
          count: '...',
          name: 'Company views'
        },
        {
          key:'product_views',
          count: '...',
          name: 'Product views'
        },
        {
          key:'selling_leads_views',
          count: '...',
          name: 'Selling leads views'
        },
        {
          key:'buying_leads_views',
          count: '...',
          name: 'Buying leads views'
        }

      ]
    }
  },
  mounted() {
    this.getProductViewsCount();
    this.getCompanyViewsCount();
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
    async getProductViewsCount() {
      await this.$axios.$post('/api/user_product_views_count')
        .then(response => {
          this.statisticsList.filter(function (elem){
            if (elem.key==='product_views')
              elem.count=response
          })
        }).catch(err => {
            if (err.response.status===401){
              this.$auth.logout();
              this.$toast.err(err);
            }
        });
    },
    async getCompanyViewsCount() {
      await this.$axios.$post('/api/user_company_views_count')
        .then(response => {
          this.statisticsList.filter(function (elem){
            if (elem.key==='company_views')
              elem.count=response
          })
        }).catch(err => {
            if (err.response.status===401){
              this.$auth.logout();
              this.$toast.err(err);
            }
        });
    }
  }
}
</script>

<style scoped>
.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
