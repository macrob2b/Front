<template>
  <div class="factories-branches">
    <AddInformation
      :type="Factories"
      :names="factoryNames"
      @add="form = 'factory'"
      @newNames="factoryNames = $event"></AddInformation>
    <AddFactory
      v-if="form === 'factory'"
      @formData="factoryData = $event"
    ></AddFactory>
    <AddInformation
      :type="Branches"
      :names="branchNames"
      @add="form = 'branch'"
      @newNames="branchNames = $event"></AddInformation>
    <AddBranch
      v-if="form === 'branch'"
      @formData="branchData = $event"></AddBranch>
  </div>
</template>

<script>
  import AddInformation from "~/components/factories-branches/add-information"
  import AddFactory from "~/components/factories-branches/add-factory"
  import AddBranch from "~/components/factories-branches/add-branch"
  export default {
    components: {
      AddInformation,
      AddFactory,
      AddBranch
    },
    data() {
      return {
        form: '',
        factoryData: '',
        branchData: '',
        factoryNames: [],
        branchNames: [],
        Factories: {
          title: 'Factories',
          btnTitle: '+ Add Factory Information'
        },
        Branches: {
          title: 'Branches',
          btnTitle: '+ Add Branch Information'
        }
      }
    },
    watch: {
      factoryData(val) {
        this.factoryNames.push(val);
        this.form = '';
      },
      branchData(val) {
        this.branchNames.push(val);
        this.form = '';
      }
    }
  }
</script>
