<template>

  <v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>ویرایش {{product_title}}</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>

        پادکست
      </v-tab>
      <v-tab>

        تخفیف
      </v-tab>


      <v-tab-item>
        <div class="px-12">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-file-input
              v-model="voiceFile"
              @change="uploadVoice"
              accept="audio/*"
              truncate-length="15"
              placeholder="فایل صدا"
            ></v-file-input>

            <v-text-field
              v-model="voiceTitle"
              :counter="10"
              :rules="nameRules"
              label="عنوان"
              required
            ></v-text-field>




            <v-autocomplete
              v-model="voiceCar"
              :items="car_models"
              label="مدل خودرو را انتخاب کنید"
              item-text="Title"
              item-value="Id"
            >

            </v-autocomplete>

            <v-btn
              color="success"
              class="mr-4"
              @click="submit_voice"
            >
              {{this.submit_btn}}
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              to="/admin/product"
            >
              انصراف
            </v-btn>

          </v-form>



          <br>
          <br>
          <br>
          <br>
          <br>
          <v-data-table
            :headers="headers"
            :items="product_voices"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>لیست صداهای آپلود شده</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>

              </v-toolbar>
            </template>
            <template v-slot:item.voice_file="{ item }">
              <audio controls>
                <source :src="getVoiceUrl(item.File)" type="audio/mpeg">
              </audio>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn icon

              >

                <v-icon small
                        class="mr-2">mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteVoice(item.Id)">
                <v-icon small
                        class="mr-2">mdi-delete</v-icon>

              </v-btn>
            </template>
          </v-data-table>

        </div>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="py-8">
         <div v-if="discount!=0">
           <strong>قیمت:</strong><del style="color: red">{{ product_price }}تومان</del><span style="color: green">{{price_by_discount}} تومان</span>
         </div>
          <div v-else>
            <strong>قیمت:</strong>{{product_price}}تومان
          </div>
          <div v-if="product_parent==null">
            <v-text-field
              v-model="discount"
              label="درصد تخفیف"
              required
            ></v-text-field>
            <v-btn
              color="success"
              class="mr-4"
              @click="submit_discount"
            >
              {{this.submit_btn}}
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              to="/admin/product/main_product"
            >
              انصراف
            </v-btn>
          </div>

        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>



</template>

<script>
export default {
  middleware:['auth','admin'],
  name: "update",
  layout: "admin",
  data() {
    return {
      category_title:null,

    }
  }, mounted() {
     this.loadCategory();

  },

  methods: {
    loadCategory(event) {
      const response = this.$axios.$post('/api/find_category',{id:this.$route.params.id}).then(response => {
        this.category_title=response.title
      }).catch(e => {
        this.$toast.error('Error on loading');

      });
    },

  }
}
</script>

<style scoped>

</style>
