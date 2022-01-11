<template>
  <div>
    <h3>Add new item</h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >


      <v-textarea
        v-model="cateTitles"
        name="input-7-1"
        label="Cate titles (Separate by Enter)"
        hint="Hint text"
      ></v-textarea>

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
      cateTitles: null,
      final_cate_string:null,
      submit_btn: 'Create'
    }
  },
  mounted() {
  },
  watch:{
    cateTitles(newVal,oldVal){
      this.final_cate_string=newVal.split('\n').join('|');
    }
  },
  methods: {
    addCategory() {
      this.submit_btn='Creating, please wait...';
      const response = this.$axios.$post('/api/create_category',
        {parent: this.$route.params.parent_id, title: this.final_cate_string}).then(response => {
        this.$toast.success('Created successfully');
        this.submit_btn='Created';
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
