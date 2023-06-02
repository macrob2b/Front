<template>
  <div>
    <h1>Contact us</h1>
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


      </v-col>


    </v-app-bar>
    <v-simple-table>
      <thead>
      <tr>
        <th>
          Full name
        </th>
        <th>
          Email
        </th>

        <th>
          Website
        </th>
        <th>
          Phone
        </th>
        <th>
          Created at
        </th>
        <th>
          Action
        </th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in contact_us" :key="index">
        <td>
          {{ item.fullName }}
        </td>
        <td>
          <a :href="`mailto:${item.email}`" target="_blank">
            {{ item.email }}
          </a>
        </td>
        <td>
          <a :href="item.website" target="_blank">
            {{ item.website }}
          </a>
        </td>
        <td>
          <a :href="`tel:${item.phone}`" target="_blank">
            {{ item.phone }}
          </a>
        </td>
        <td>
          {{ item.created_at }}
        </td>
        <td>
          <v-btn icon
                 color="green"
                 :to="'/admin/contact-us/detail/'+item._id"
          >
            <v-icon small
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>

        </td>
      </tr>
      <InfiniteScroll :enough="enough" @load-more="getData()"/>

      </tbody>
    </v-simple-table>


  </div>
</template>


<script>
export default {
  middleware: ['auth', 'is_admin'],
  name: "contact-us",
  layout: "admin",
  head() {
    return {
      title: "Contact us manage"
    }
  },
  data() {
    return {
      table_status: 'Loading information ...',
      search: '',
      //=======infiniteScroll
      enough: false,
      page: 1,
      pageSize: 20,
      //=====================
      contact_us: [],

      delete_item: null,
      delete_loading: false,
      deleteConfirmDialog: false,
      admin_delete_pass: null,

      //To create new item button
      new_item_parent: null
    }
  },
  mounted() {

    this.getData();
    if (this.$route.params.id != undefined)
      this.new_item_parent = this.$route.params.id;
  },
  methods: {
    searchData() {
      this.page = 1;
      this.contact_us = [];
      this.getData();
    },
    async getData() {
      //Get brand list
      let ApiURL = `/api/contact_us_list`;
      await this.$axios.$post(ApiURL,
        {
          "paginate": true,
          "keyword": this.search,
          "page": this.page++
        }
      ).then(response => {
        if (response)
          this.contact_us = this.contact_us.concat(response.data);
        else
          this.table_status = "Not found"
      })
        .catch(e => {
          this.table_status = "Not found"
          console.log('error');
        })
    },

    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>

</style>
