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
      car_models:[],
      productId: null,
      voiceFile: null,
      voiceTitle: null,
      voice_uploaded_name:null,
      submit_btn:'ثبت',
      voiceCar: null,
      product_details:null,
      product_price:null,
      price_by_discount:null,
      product_id:null,


      product_title:null,
      product_parent:null,
      discount:0,

      search: '',
      headers: [
        {
          text: 'عنوان',
          align: 'start',
          sortable: false,
          value: 'Title',
        },
        { text: 'صدا', value: 'voice_file', align: 'center' },
        // { text: 'قیمت', value: 'price' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      product_voices:[],
    }
  }, mounted() {
    if (this.$route.params.productId){
      this.productId = this.$route.params.productId;

      //Get product general info
      this.$axios.post('/api/get_product',{},
        {
          params:{
            productId:this.productId
          },
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$auth.strategy.token.get()
          }
        }).then(response=>{
        this.product_details=response.data;
        this.product_title=response.data.title;
        this.product_price=response.data.price;
        this.discount=response.data.discount;
        this.product_parent=response.data.parent;
        this.product_id=response.data.id;
      })


      this.$axios.post('/api/get_product_voice',{},
        {
          params:{
            productId:this.productId
          },
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$auth.strategy.token.get()
          }
        }).then(response=>{
          this.product_voices=response.data;
      })


      //Get cluster list
      let clusterApiURL = `/api/cars_list`;
      this.$axios.$post(clusterApiURL).then(response => {
        console.log(response);
        this.car_models = response;
      })
        .catch(e => {
          console.log('error');
        })

    }
    else
      this.$router.push({
        path: '/admin/product/main_product'
      })

  },
  watch: {
    // whenever question changes, this function will run
    discount: function (newDiscount,oldDiscount) {
      // `this` points to the vm instance
      this.price_by_discount= this.product_price-newDiscount*this.product_price/100;
    }
  },
  methods: {
    uploadVoice(event) {
      this.submit_btn="در حال آپلود فایل صدا منتظر بمانید...."
      let formData = new FormData();
      formData.append('voice', this.voiceFile);
      const response = this.$axios.$post('/api/submit_voice',
        formData, {
          params: {
            productId:this.$route.params.productId
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + this.$auth.strategy.token.get()
          }
        }).then(response => {
        if (response !== false)
           this.voice_uploaded_name=response;
        else
          this.$toast.error('در فرآیند آپلود خطایی رخ داده است.');
      }).catch(e => {
        this.$toast.error('در فرآیند ثبت خطایی رخ داده است.');

      });
      this.submit_btn="ثبت"


    },
    submit_voice() {
      const response = this.$axios.$post('/api/submit_product_voice',
        {
          title: this.voiceTitle,
          file:this.voice_uploaded_name,
          productId:this.productId,
          car:this.voiceCar
        }
        , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$auth.strategy.token.get()
          }
        }).then(response => {
        this.$router.push({
          path:'/admin/product'
        });
        this.$toast.success('با موفقیت ثبت شد');

      }).catch(e => {
        this.$toast.error('در فرآیند ثبت خطایی رخ داده است.');

      });
    },
    deleteVoice(item_id) {
      const response = this.$axios.$delete('/api/delete_product_voice'
        , {
          params:{
            id : item_id
          },
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$auth.strategy.token.get()
          }
        }).then(response => {
        this.$router.push({
          path:'/admin/product'
        });
        this.$toast.success('با موفقیت حذف شد');

      }).catch(e => {
        this.$toast.error('در فرآیند حذف خطایی رخ داده است.');

      });
    },


    submit_discount(){
      this.$toast.success(this.discount);

      const response = this.$axios.$put('/api/update_product_discount'
        , {

          },{
           params:{
             id : this.product_id,
             discount : this.discount
           },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$auth.strategy.token.get()
          }
        }).then(response => {
        this.$toast.success('با موفقیت اعمال شد');

      }).catch(e => {
        this.$toast.error('در فرآیند ایجاد تخفیف خطایی رخ داده است.');

      });
    },
    getVoiceUrl(voice) {
      var voice_url = 'https://dl.mycarlubs.com/product/voice/'+this.productId+"/"+voice;
      return voice_url;
    },
    nameRules(){

    }
  }
}
</script>

<style scoped>

</style>
