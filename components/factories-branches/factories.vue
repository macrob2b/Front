<template>
  <div class="mb-10">
    <v-data-table
      :headers="headers"
      :items="factories"
      class="elevation-1 factory-table"
    >
      <template
        v-slot:body="{ items }"
      >
        <tbody>
        <tr
          v-for="(item, i) in items"
          :key="i"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.contact_num }}</td>
          <td>{{ item.area_size }}</td>
          <td>{{ item.production_staff_num }}</td>
          <td>
            <v-icon
              class="mr-2"
              small
              @click="editItem(item, i)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item, i)"
            >
              mdi-delete
            </v-icon>
          </td>
        </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    /* eslint-disable */
    props: ['value'],
    data() {
      return {
        factories: [],
        headers: [
          {
            text: 'Factory name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {text: 'contact_num', value: 'contact_num'},
          {text: 'factory size', value: 'area_size'},
          {text: 'production staff num', value: 'production_staff_num'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
      }
    },
    watch: {
      value (val) {
        this.factories = val;
      }
    },
    methods: {
      editItem(item, i) {
        this.$emit('edit', item, i);
      },
      deleteItem(item, i) {
        this.$axios.delete('/api/delete_company_factory', {data: {id: item._id}}).then(response => {
          if(typeof response.data === 'object') {
            for(let i in response.data) {
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
