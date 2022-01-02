<template>
  <div>
    <h3>Edit {{ cateTitle }}</h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

      <v-text-field
        v-model="voiceTitle"
        :counter="10"
        :rules="nameRules"
        label="Title"
        required
      ></v-text-field>





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
        to="/admin/category"
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

    },
  methods: {

  }
}
</script>

<style scoped>

</style>
