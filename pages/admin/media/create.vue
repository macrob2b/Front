<template>
  <div class="mt-16">
    <h2>Create new media</h2>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form
        @submit.prevent="createMedia"
      >
        <v-row>

          <v-col cols="4">
            <validation-provider v-slot="{errors}" name="file_section" rules="required">
              <v-autocomplete
                v-model="media_form.file_section"
                :items="file_section_list"
                :loading="file_section_loading"
                item-value="key"
                item-text="title"
                :error-messages="errors"
                label="File section"
              />
            </validation-provider>
          </v-col>


          <v-col cols="4">
            <validation-provider v-slot="{errors}" name="file_type" rules="required">
              <v-autocomplete
                v-model="media_form.file_type"
                :items="file_type_items"
                :error-messages="errors"
                label="File type"
              />
            </validation-provider>
          </v-col>


          <v-col cols="4">
            <validation-provider v-slot="{errors}" name="file" rules="required">
              <v-file-input
                v-model="media_form.file"
                :error-messages="errors"
                label="Media file"
              />
            </validation-provider>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="media_form.link"
              label="Media link"
            />
          </v-col>

          <v-col cols="12" class="text-center">
            <v-btn
              color="success"
              class="mr-4"
              type="submit"
              :disabled="invalid"
              :loading="create_loading"
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
          </v-col>
        </v-row>

      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider, validate} from "vee-validate";

export default {
  head() {
    return {
      title: "Media manage",
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: "admin",
  name: "create_media",
  data() {
    return {
      file_type_items: ['image', 'video'],
      file_section_list: '',

      media_form:{
        file_section:'',
        file_type:'',
        file:'',
        link:''
      },
      file_section_loading: false,
      create_loading: false,

    }
  },
  mounted() {
    this.fileSectionList();
  },
  methods: {
    async createMedia() {
      this.create_loading = true;
      let formData=new FormData();
      for(var key in this.media_form)
        formData.append(key,this.media_form[key]);

      await this.$axios.$post('/api/submit_media',
        formData).then(response => {
        if (typeof response == "object") {
          for (let i in response) {
            let error = response[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.$toast.success("New page created successfully");
          this.$router.push({
            path: '/admin/media'
          });
        }
      }).catch(err => {
        this.$toast.error("An error occurred during page creation.")
      }).finally(msg => {
        this.create_loading = false;
      });
    },
    async fileSectionList() {
      this.file_section_loading = true;
      await this.$axios.$post('/api/file_section_list')
        .then(response => {
          this.file_section_list = response;
        }).catch(err => {
          this.$toast.error(err);
        }).finally(() => {
          this.file_section_loading = false;
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
