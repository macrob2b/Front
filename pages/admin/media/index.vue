<template>
  <div>
    <v-row>
      <h1 class="my-5">Media manage</h1>

    </v-row>
    <hr>
    <v-app-bar
    >


      <v-spacer></v-spacer>


      <v-col cols="10">
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
          @keyup="searchData()"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-btn
          @click="goBack()"
          class="mx-2"
          fab
          dark
          small
          color="pink"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>

        </v-btn>

        <v-btn
          to="/admin/media/create"
          class="mx-2"
          fab
          dark
          small
          color="teal"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>

        </v-btn>
      </v-col>


    </v-app-bar>
    <v-simple-table>
      <thead>
      <tr>
        <th>
          File section
        </th>
        <th>
          File type
        </th>
        <th>
          Image
        </th>
        <th>
          link
        </th>
        <th>
          Operation
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="mt-12 mb-12 " v-if="table_loading">
        <td colspan="5" class="text-center ">
          <v-progress-circular
            :size="40"
            class="my-10"
            :width="3"
            color="orange"
            indeterminate
          ></v-progress-circular>
        </td>
      </tr>
      <tr v-else v-for="(media,index) in media_list" :key="index">
        <td>
          {{ media.file_section }}
        </td>
        <td>
          {{ media.file_type }}
        </td>
        <td>
          <v-img
            v-if="media.file_type=='image'"
            max-height="80"
            max-width="130"
            :src="getImgFile(media.file)"
          />
        </td>
        <td>
          {{ media.link }}
        </td>
        <td>
<!--          <v-btn icon-->
<!--                 :to="'/admin/media/edit/'+media._id"-->
<!--          >-->
<!--            <v-icon small-->
<!--                    class="mr-2">mdi-pencil-->
<!--            </v-icon>-->
<!--          </v-btn>-->
          <v-btn icon
                 color="red"
                 @click="deleteMediaConfirm(media._id)"
          >
            <v-icon small
                    class="mr-2">mdi-delete
            </v-icon>
          </v-btn>
          <!--          <v-icon-->
          <!--            small-->
          <!--            @click="deleteItem(media)"-->
          <!--          >-->
          <!--            mdi-delete-->
          <!--          </v-icon>-->
        </td>
      </tr>

      </tbody>
    </v-simple-table>



    <v-dialog
      v-model="deleteConfirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Are you sure?
        </v-card-title>

        <v-card-text>
          Click AGREE if you are sure
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="deleteConfirmDialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            :loading="delete_loading"
            @click="deleteMedia"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>


<script>
import img from "../../../assets/img/no-image.png";

export default {
  middleware: ['auth', 'is_admin'],
  name: "media.vue",
  layout: "admin",
  data() {
    return {
      table_status: 'Loading information ...',
      table_loading: false,
      deleteConfirmDialog: false,
      delete_item: null,
      delete_loading: false,
      search: '',
      media_list: [],

      //To create new item button
      new_item_parent: null
    }
  },
  mounted() {
    this.getData();
  },
  watch: {

  },
  methods: {
    searchData() {
      this.media_list = [];
      this.getData();
    },
    async getData() {
      this.table_loading = true;
      //Get brand list
      let mediaApiURL = `/api/media_list`;
      await this.$axios.$post(mediaApiURL,
        {
          "keyword": this.search,
        }
      ).then(response => {
        if (response) {
          this.media_list = response;
        } else
          this.table_status = "Not found";

        this.table_loading = false;
      })
        .catch(e => {
          this.table_status = "Not found"
          this.table_loading = false;
          console.log('error');
        })
    },
    deleteMedia() {
      this.delete_loading = true;
      const response = this.$axios.$delete('/api/delete_media',
        {
          params: {
            id: this.delete_item,
          }
        }).then(response => {
        this.delete_item = null;
        this.deleteConfirmDialog = false;
        this.delete_loading = false;
        this.$toast.success('Deleted successfully');
        this.getData();
        // this.$router.go(-1);
      }).catch(e => {
        this.delete_item = null;
        this.delete_loading = false;
        this.deleteConfirmDialog = false;
        this.$toast.error('Error on deleting, Maybe has children (a child)');
      });
    },
    deleteMediaConfirm(id) {
      this.delete_item = id;
      this.deleteConfirmDialog = true;
    },

    goBack() {
      this.$router.go(-1);
    },
    getImgFile(item) {
      var img = "https://dl.macrob2b.com/general/" + item;
      return img;

    }
  }
}
</script>

<style scoped>

</style>
