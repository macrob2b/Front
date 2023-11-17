<template>
  <div class="mt-16">
    <h2>Edit {{ form.schoolTitle }}</h2>
    <v-form ref="form" lazy-validation>
       
       <v-text-field v-model="form.stateTitle" label="استان"></v-text-field>
       <v-text-field v-model="form.regionTitle" label="ناحیه"></v-text-field>
       <v-text-field v-model="form.stageTitle" label="استیج"></v-text-field>
       <v-text-field v-model="form.schoolTitle" label="عنوان مدرسه"></v-text-field>
       <v-text-field v-model="form.schoolTitle2" label="عنوان مدرسه 2"></v-text-field>
       <v-text-field v-model="form.address" label="آدرس"></v-text-field>
       <v-text-field v-model="form.address2" label="آدرس2"></v-text-field>
       <v-text-field v-model="form.tel" label="تلفن"></v-text-field>
       <v-text-field v-model="form.tel2" label="تلفن 2"></v-text-field>
       <v-text-field v-model="form.lat" label="عرض جغرافیایی"></v-text-field>
       <v-text-field v-model="form.lng" label="طول جغرافیایی"></v-text-field>
       <v-text-field v-model="form.majors" label="رشته ها"></v-text-field>
       <v-text-field v-model="form.genderTypeTitle" label="جنسیت"></v-text-field>
       <v-text-field v-model="form.organizationTypeTitle" label="نوع مدرسه"></v-text-field>
 <v-btn
        color="success"
        class="mr-4"
        :loading="update_loading"
        @click="updatePage"
      >
        Update
      </v-btn>

      <v-btn color="error" class="mr-4" @click="goBack"> Cancel </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: "admin",
  auth: false,
  name: "edit_school",
  data() {
    return {
      update_loading:false,
      form: {
        schoolTitle:''
      },
    };
  },
  mounted() {
    this.getInfo();
    // this.title=this.page_info.title;
    // this.describe=this.page_info.describe;
  },
  methods: {
    getInfo() {
      this.$axios
        .$get(`/test_api/school_info/${this.$route.params.id}`)
        .then((response) => {
          this.form = response;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updatePage() {
      this.update_loading = true;
      await this.$axios
        .$put("/test_api/school_update", this.form)
        .then((response) => {
          if (typeof response == "object") {
            for (let i in response) {
              let error = response[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.$toast.success("Page updated successfully");
            this.$router.push({
              path: "/school-list",
            });
          }
        })
        .catch((err) => {
          this.$toast.error("An error occurred during page creation.");
        })
        .finally((msg) => {
          this.update_loading = false;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>
