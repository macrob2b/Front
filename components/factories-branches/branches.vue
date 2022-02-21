<template>
 <div class="branches-branches">
    <div class="add-information">
      <div class="add-information-header">
        <p>Branches</p>
      </div>
      <div>
        <div class="add-factory">
          <div class="add-information-body">
            <v-btn v-if="!showBranchForm" class="primary add-btn" @click="showBranchForm = true">+ Add Branch Information</v-btn>
          </div>

          <AddBranch v-if="showBranchForm" v-model="showBranchForm" :activeBranch="activeBranch()" @reloadBranches="reloadBranches"></AddBranch>

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
                    Description
                  </th>
                  <th class="text-left">
                    Supervisor name
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                  v-for="(item, i) in branches"
                  :key="i"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.contact_num }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.supervisor_name }}</td>
                  <td>
                    <v-icon
                      class="mr-2"
                      small
                      @click="editBranch(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      @click="deleteBranch(item, i)"
                    >
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
                </tbody>
              </template>/
            </v-simple-table>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AddBranch from "~/components/factories-branches/add-branch"

  export default {
    /* eslint-disable */
    components: {
      AddBranch
    },
    data() {
      return {
        showBranchForm: false,
        branches: [],
        branch: null,
        headers: [
          {
            text: 'Branch name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {text: 'contact_num', value: 'contact_num'},
          {text: 'Description', value: 'description'},
          {text: 'Supervisor name', value: 'supervisor_name'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
      }
    },
    mounted() {
        this.reloadBranches();
    },
    watch: {
      showBranchForm(val) {
        if(!val) {
          this.branch = null;
        }
      },
    },
    methods: {
      editBranch(branch) {
        this.showBranchForm = true;
        this.branch = Object.assign({}, branch);
      },
      deleteBranch(item, index) {
        this.$axios.delete('/api/delete_company_branch', {data: {id: item._id}}).then(response => {
          if(typeof response.data === 'object') {
            for(let i in response.data) {
              let error = response.data[i][0];
              this.$toast.error(error);
              // break;
            }
          } else {
            this.branches.splice(index, 1);
          }
        }).catch(({response}) => {
          if (response.status == 401) {
            this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
          } else if (response.status == 500 || response.status == 504) {
            this.$toast.error(this.$t(`REQUEST_FAILED`));
          }
        });
      },
      reloadBranches() {
        this.$axios.$post('/api/branch_list',
          {company_id: this.$auth.user.company._id}).then(response => {
          this.branches = response;
        }).catch(({response}) => {
            func(false, this);
          if (response.status == 401) {
            this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
          } else if (response.status == 500 || response.status == 504) {
            this.$toast.error(this.$t(`REQUEST_FAILED`));
          }
        });
      },
      activeBranch() {
        return this.branch || {
          name: '',
          contact_num: '',
          location: '',
          description: '',
          image: [],
          supervisor_name: '',
          supervisor_phone: '',
          supervisor_fax: '',
          supervisor_email: '',
        };
      }
    }
  }
</script>
