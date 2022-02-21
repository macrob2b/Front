<template>
  <div class="mb-10">
        <v-simple-table
        >
          <template v-slot:default>
            <thead>
            <tr>
              <th >
                Factory name
              </th>
              <th >
                Contact num
              </th>
              <th >
                Factory size
              </th>
              <th >
                Production staff num
              </th>
              <th >
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(item, i) in factories"
              :key="i"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.contact_num }}</td>
              <td>{{ item.area_size }}</td>
              <td>{{ item.production_staff_num }}</td>
              <td>
                <v-btn
                  icon
                  @click="editItem(item, i)"
                >
                  <v-icon
                    small
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon
                       color="error"
                       @click="deleteItem(item, i)"
                >
                  <v-icon
                    small
                  >
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
          /
        </v-simple-table>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  props: ['value'],
  data() {
    return {
      factories: [],
    }
  },
  watch: {
    value(val) {
      this.factories = val;
    }
  },
  methods: {
    editItem(item, i) {
      this.$emit('edit', item, i);
    },
    deleteItem(item, i) {
      this.$axios.delete('/api/delete_company_factory', {data: {id: item._id}}).then(response => {
        if (typeof response.data === 'object') {
          for (let i in response.data) {
            let error = response.data[i][0];
            this.$toast.error(error);
            // break;
          }
        } else {
          this.factories.splice(i, 1);
          this.$emit('input', this.factories);
        }
      }).catch(({response}) => {
        if (response.status == 401) {
          this.$toast.error(this.$t(`LOGIN_WRONG_DATA`));
        } else if (response.status == 500 || response.status == 504) {
          this.$toast.error(this.$t(`REQUEST_FAILED`));
        }
      });
    }
  }
}
</script>
