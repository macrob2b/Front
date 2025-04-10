<template>
  <div class="mt-16">
    <h2>Edit {{ page_info.title }}</h2>
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col cols="4">
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
          <v-chip v-show="image_name">{{ image_name }}</v-chip>
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
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  async asyncData({ params, $axios, error }) {
    const page_info = await $axios.$get(`/api/blog/${params.id}`);

    return { page_info };
  },
  layout: "admin",
  name: "edit_blog",
  data() {
    return {
      title: "",
      describe: "",
      keywords: "",
      image: null,
      image_name: null,
      update_loading: false,
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
  mounted() {
    this.title = this.page_info.title;
    this.describe = this.page_info.describe;
    this.keywords = this.page_info.keywords?.split(",");
    this.image_name = this.page_info.image;
  },
  methods: {
    async updatePage() {
      this.update_loading = true;
      let formData = new FormData();
      formData.append("id", this.page_info._id);
      formData.append("title", this.title);
      formData.append("describe", this.describe);
      formData.append("keywords", this.keywords);
      if (this.image) formData.append("image", this.image);
      await this.$axios
        .$post("/api/blog", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // if (typeof response == "object") {
          // for (let i in response) {
          //   let error = response[i][0];
          //   this.$toast.error(error);
          //   // break;
          // }
          // } else {
          this.$toast.success("Page updated successfully");
          this.$router.push({
            path: "/admin/blog",
          });
          // }
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

<style scoped></style>
