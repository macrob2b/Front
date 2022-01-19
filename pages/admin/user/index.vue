<template>
  <div>
    <h1>Users</h1>
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
          :to="'/admin/user/add/'+new_item_parent"
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
          First name
        </th>
        <th>
          Last name
        </th>

        <th>
          Mobile number
        </th>
        <th>
          Email
        </th>
        <th>
          Action
        </th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(user,index) in users" :key="index">
        <td>
          {{ user.first_name }}
        </td>
        <td>
          {{ user.last_name }}
        </td>
        <td>
          {{ user.mobile_num }}
        </td>
        <td>
          {{ user.email }}
        </td>
        <td>
          <v-btn icon
                 :to="'/admin/user/'+user._id"
          >
            <v-icon small
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>
          <v-btn icon
                 :to="'/admin/user/edit/'+user._id"
          >
            <v-icon small
                    class="mr-2">mdi-pencil
            </v-icon>
          </v-btn>
          <!--          <v-icon-->
          <!--            small-->
          <!--            @click="deleteItem(user)"-->
          <!--          >-->
          <!--            mdi-delete-->
          <!--          </v-icon>-->
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
  name: "user.vue",
  layout: "admin",
  data() {
    return {
      table_status: 'Loading information ...',
      search: '',
      //=======infiniteScroll
      enough: false,
      page: 1,
      pageSize: 20,
      //=====================
      users: [],
      user_list_title: null,

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
      this.users = [];
      this.getData();
    },
    async getData() {
      //Get brand list
      let userApiURL = `/api/user_list`;
      await this.$axios.$post(userApiURL,
        {
          "paginate": true,
          "keyword": this.search,
          "page": this.page++
        }
      ).then(response => {
        if (response)
          this.users = this.users.concat(response.data);
        else
          this.table_status = "Not found"
      })
        .catch(e => {
          this.table_status = "Not found"
          console.log('error');
        })
    },
    getUserListTitle() {
      const response = this.$axios.$post('/api/find_user',
        {id: this.$route.params.id}).then(response => {
        this.user_list_title = response.title;
      }).catch(e => {
        this.$toast.error('Error on updating');

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
