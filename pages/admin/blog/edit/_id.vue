<template>
  <div class="mt-16">
    <h2>Edit {{ page_info.title }}</h2>
    <v-form
      ref="form"
      lazy-validation
    >

      <v-col cols="4">
        <v-text-field
          v-model="title"
          label="Title"
        />
      </v-col>


      <v-col cols="12">
        <client-only placeholder="loading...">
          <ckeditor-nuxt v-model="describe" :config="editorConfig"/>
        </client-only>
      </v-col>

      <v-btn
        color="success"
        class="mr-4"
        :loading="update_loading"
        @click="updatePage"
      >
        Update
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
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  async asyncData({params, $axios, error}) {
    const page_info = await $axios.$get(`/api/blog/${params.id}`);

    return {page_info};

  },
  layout: "admin",
  name: "edit_blog",
  data() {
    return {
      title: '',
      describe: '',
      update_loading: false,
      editorConfig: {
        placeholder: 'Describe',
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: '/api/editor_uploader/blog',
          headers: {
            'Authorization': this.$auth.strategy.token.get()
          }
        }
      }
    }
  },
  mounted() {
    this.title=this.page_info.title;
    this.describe=this.page_info.describe;
  },
  methods: {
    async updatePage() {
      this.update_loading = true;
      await this.$axios.$put('/api/blog',
        {
          id: this.page_info._id,
          title: this.title,
          describe: this.describe
        }).then(response => {
        if (typeof response == "object") {
          for (let i in response) {
            let error = response[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.$toast.success("Page updated successfully");
          this.$router.push({
            path: '/admin/blog'
          });
        }
      }).catch(err => {
        this.$toast.error("An error occurred during page creation.")
      }).finally(msg => {
        this.update_loading = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
