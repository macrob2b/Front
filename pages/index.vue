<template>
  <!-- <Tutorial/> -->
  <div>
    <v-app>
      <Header />
      <Requirement />
    </v-app>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Requirement from "../components/RequirementSection.vue";

export default {
  components: {
    Header,
    Requirement,
  },
};
</script>
