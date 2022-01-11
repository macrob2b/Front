<template>
  <div>
    <h3>Edit</h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="cateTitle"
        :counter="10"
        label="Title"
        required
      ></v-text-field>







      <v-btn
        color="success"
        class="mr-4"
        @click="updateCategory"
      >
        {{this.submit_btn}}
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="goBack"
      >
        Cancel
      </v-btn>

    </v-form>


  </div>
</template>


<script>
export default {
  middleware: ['auth', 'is_admin'],
  name: "category.vue",
  layout: "admin",
  data() {
    return {
       cateTitle:null,
      submit_btn:'Update'
    }
  },
  mounted() {
      this.loadCategory();
    },
  methods: {
    loadCategory(event) {
      const response = this.$axios.$post('/api/find_category',{id:this.$route.params.id}).then(response => {
        this.cateTitle=response.title
      }).catch(e => {
        this.$toast.error('Error on loading');

      });
    },
    updateCategory() {
      const response = this.$axios.$put('/api/update_category',
        {id: this.$route.params.id, title: this.cateTitle}).then(response => {
        this.$toast.success('Updated successfully');
        this.$router.go(-1);
      }).catch(e => {
        this.$toast.error('Error on updating');

      });
    },
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>

</style>
