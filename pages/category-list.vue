<template>
  <v-row class="masonry">
    <v-col cols="12" sm="4" class="px-6"
    v-for="(item,index) in categories"
    >
      <h2>{{item.title}}</h2>
      <ul>
        <li
        v-for="(child_item,child_index) in item.grandchildren"
        >
          <h3>{{child_item.title}}</h3>
          <ul v-if="child_item.length!=0">
            <li
              v-for="(grandchild_item,grandchild_index) in child_item.grandchildren"
            >
              <h4>{{grandchild_item.title}}</h4>
            </li>
          </ul>
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth:false,
  name: "all-categories",
  data(){
    return{
       categories:[]
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    async getData() {
      //Get brand list
      let categoryApiURL = `/api/cate_list_by_child`;
      await this.$axios.$post(categoryApiURL,
      ).then(response => {
        this.categories=response;
      })
        .catch(e => {
          this.table_status = "Not found"
          console.log('error');
        })
    },

  }
}
</script>

<style scoped>

</style>
