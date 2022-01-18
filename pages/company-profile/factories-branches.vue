<template>
  <div class="factories-branches">
    <div class="add-information">
      <div class="add-information-header">
        <p>Factories</p>
      </div>
      <div>
        <add-factory></add-factory>
      </div>
    </div>
    <!--    <AddFactory-->
    <!--      v-if="form === 'factory'"-->
    <!--      @formData="factoryData = $event"-->
    <!--    ></AddFactory>-->
    <!--    <AddInformation-->
    <!--      :type="Factories"-->
    <!--      :names="factoryNames"-->
    <!--      @add="form = 'factory'"-->
    <!--      @newNames="factoryNames = $event"></AddInformation>-->

<!--    <AddBranch-->
<!--      v-if="form === 'branch'"-->
<!--      @formData="branchData = $event"></AddBranch>-->
<!--    <AddInformation-->
<!--      :names="branchNames"-->
<!--      :type="Branches"-->
<!--      @add="form = 'branch'"-->
<!--      @newNames="branchNames = $event"></AddInformation>-->
  </div>
</template>

<script>
import AnnualProduction from "~/components/factories-branches/annual-production"
import AddInformation from "~/components/factories-branches/add-information"
import AddFactory from "~/components/factories-branches/add-factory"
import AddBranch from "~/components/factories-branches/add-branch"

export default {
  components: {
    AnnualProduction,
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
