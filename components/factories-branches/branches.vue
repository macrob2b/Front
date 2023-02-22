<template>
  <div class="mb-10">
    <v-simple-table
    >
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Branch name
          </th>
          <th class="text-left">
            Contact num
          </th>
          <th class="text-left">
            Supervisor name
          </th>
          <th class="text-left">
            Supervisor phone
          </th>
          <th class="text-left">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="mt-12 mb-12" v-if="loading_data">
          <td colspan="5" class="text-center">
            <v-progress-circular
              class="mt-4"
              :size="30"
              :width="3"
              color="orange"
              indeterminate
            ></v-progress-circular>
          </td>
        </tr>
        <tr
          v-else
          v-for="(item, i) in branches"
          :key="i"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.contact_num }}</td>
          <td>{{ item.supervisor_name }}</td>
          <td>{{ item.supervisor_phone }}</td>
          <td>
            <v-btn icon
                   color="error"
            >
              <v-icon
                small

                @click="openDeleteConfirmDialog(item, i)"
              >
                mdi-delete
              </v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
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
            @click="deleteBranch()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </div>
</template>

<script>

export default {
  /* eslint-disable */
  props:['submit_status'],
  components: {
  },
  data() {
    return {
      branches: [],
      deleteConfirmDialog:false,
      branch: null,
      delete_item:null,
      delete_index:null,
      delete_loading:false,
      loading_data:false
    }
  },
  mounted() {
    this.getBranches();
  },
  watch: {
    submit_status:{
      immediate: true,
      handler (val, oldVal) {
        if (val===true)
          this.getBranches();
      }
    }
  },
  methods: {
    openDeleteConfirmDialog(item, i) {
      this.deleteConfirmDialog = true;
      this.delete_item = item;
      this.delete_index = i;
    },
    deleteBranch() {
      this.delete_loading=true;
      this.$axios.$delete('/api/delete_company_branch',
        {
          params:
            {id: this.delete_item._id}
        })
        .then(response => {
        if (typeof response.data === 'object') {
          for (let i in response.data) {
            let error = response.data[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.$toast.success("Deleted successfully");
          this.branches.splice(this.delete_index, 1);
          this.delete_loading=false;
          this.deleteConfirmDialog=false;
        }
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
        this.delete_loading=false;
        this.deleteConfirmDialog=false;
      });
    },
    getBranches() {
      this.loading_data=true;
      this.$axios.$post('/api/branch_list',
        {company_id: this.$auth.user.company._id}).then(response => {
        this.branches = response;
        this.loading_data=false;
      }).catch(({response}) => {
        func(false, this);
        if (response.status == 401) {
          this.$toast.error('The information entered is incorrect');
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error('An error occurred. Please try again');
        }
        this.loading_data=false;
      });
    },
  }
}
</script>
