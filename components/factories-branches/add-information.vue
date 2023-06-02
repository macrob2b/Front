<template>
  <div class="add-information">
    <div class="add-information-header">
      <p>{{ type.title }}</p>
    </div>
    <v-divider></v-divider>
    <div class="add-information-body">
      <div v-if="names !== undefined" class="info-list">
        <div v-for="(index, item) in names" :key="index" class="info1">
          <span>{{ index }}</span>
          <v-btn @click="remove(item)">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </div>
      </div>
      <v-btn class="add-btn" @click="add">{{ type.btnTitle }}</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    /* eslint-disable */
    props: ['type', 'names'],
    data() {
      return {
        test: this.type
      }
    },
    watch: {
      test(val) {
        console.log(val);
      }
    },
    methods: {
      add() {
        this.$emit('add');
      },
      remove(id) {
        this.names.splice(id, 1);
        this.$emit('newNames', this.names);
      }
    }
  }
</script>
