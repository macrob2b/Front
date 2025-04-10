<template>
  <div class="mt-16">
    <h2>Create new blog</h2>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="title" label="Title" />
        </v-col>

        <v-col cols="12" md="4">
          <v-file-input
            v-model="image"
            accept="image/*"
            small-chips
            persistent-hint
            label="Image"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="4">
          <v-combobox
            v-model="keywords"
            hide-selected
            hint="Max 40 keyword"
            label="Keywords"
            multiple
            persistent-hint
            small-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    After enter every keyword press <kbd>enter</kbd>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
        </v-col>
      </v-row>

      <v-col cols="12">
        <client-only placeholder="loading...">
          <ckeditor-nuxt v-model="describe" :config="editorConfig" />
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

      <v-btn color="error" class="mr-4" @click="goBack"> Cancel </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  layout: "admin",
  name: "create_static_page",
  data() {
    return {
      title: "",
      image: null,
      keywords: "",
      describe: "",
      create_loading: false,
      editorConfig: {
        placeholder: "Describe",
        removePlugins: ["Title"],
        simpleUpload: {
          uploadUrl: "/api/editor_uploader/blog",
          headers: {
            Authorization: this.$auth.strategy.token.get(),
          },
        },
      },
    };
  },
  methods: {
    async createContent() {
      this.create_loading = true;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("describe", this.describe);
      formData.append("keywords", this.keywords);
      formData.append("image", this.image);
      await this.$axios
        .$post("/api/blog", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (typeof response == "object") {
            for (let i in response) {
              let error = response[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.$toast.success("New blog created successfully");
            this.$router.push({
              path: "/admin/blog",
            });
          }
        })
        .catch((err) => {
          this.$toast.error("An error occurred during page creation.");
        })
        .finally((msg) => {
          this.create_loading = false;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
