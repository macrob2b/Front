<template>
  <div>
    <h3>Add new item</h3>
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
        @click="addCategory"
      >
        {{ this.submit_btn }}
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
      cateTitle: null,
      submit_btn: 'Create'
    }
  },
  mounted() {
  },
  methods: {
    addCategory() {
      const response = this.$axios.$post('/api/create_category',
        {parent: this.$route.params.parent_id, title: this.cateTitle}).then(response => {
        this.$toast.success('Created successfully');
        this.$router.go(-1);
      }).catch(e => {
        this.$toast.error('Error on creating');

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
