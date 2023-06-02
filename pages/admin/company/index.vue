<template>
  <div>
    <h1>Companies</h1>
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
          :to="'/admin/company/add/'+new_item_parent"
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
          Name
        </th>
        <th>
          Owner Name
        </th>



        <th>
          Action
        </th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="(company,index) in companies" :key="index">
        <td>
          {{company.name}}
        </td>
        <td>
          <span
            v-if="company.owner!==null">
              {{company.owner.first_name}} {{company.owner.last_name}}
          </span>

        </td>

        <td>
          <v-btn icon
                 :to="'/admin/company/'+company._id"
          >
            <v-icon small
                    class="mr-2">mdi-eye
            </v-icon>
          </v-btn>
          <v-btn icon
                 :to="'/admin/company/edit/'+company._id"
          >
            <v-icon small
                    class="mr-2">mdi-pencil
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
      companies: [],
      company_list_title: null,

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
      this.companies = [];
      this.getData();
    },
    async getData() {
      //Get brand list
      let companyApiURL = `/api/company_list`;
      await this.$axios.$post(companyApiURL,
        {
          "paginate": true,
          "keyword": this.search,
          "page": this.page++
        }
      ).then(response => {
        if (response)
          this.companies = this.companies.concat(response.data);
        else
          this.table_status = "Not found"
      })
        .catch(e => {
          this.table_status = "Not found"
          console.log('error');
        })
    },
    getCompanyListTitle() {
      const response = this.$axios.$post('/api/find_company',
        {id: this.$route.params.id}).then(response => {
        this.company_list_title = response.title;
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
