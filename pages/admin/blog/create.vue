<template>
  <div class="mt-16">
    <h2>Create new blog</h2>
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
        :loading="create_loading"
        @click="createContent"
      >
        Create
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
  layout: "admin",
  name: "create_static_page",
  data() {
    return {
      title: '',
      describe: '',
      create_loading: false,
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
  methods: {
    async createContent() {
      this.create_loading = true;
      await this.$axios.$post('/api/blog',
        {
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
          this.$toast.success("New blog created successfully");
          this.$router.push({
            path: '/admin/blog'
          });
        }
      }).catch(err => {
        this.$toast.error("An error occurred during page creation.")
      }).finally(msg => {
        this.create_loading = false;
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
