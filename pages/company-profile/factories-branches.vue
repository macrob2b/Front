<template>
  <div class="factories-branches">
    <div class="add-information">
      <div class="add-information-header">
        <p>Factories</p>
      </div>
      <div>
        <add-factory v-for="(item, index) in factories" v-model="factories[index]" @delete="deleteFactory(index)"></add-factory>
      </div>
      <div class="add-information-body">
        <div class="add-information-body">
          <v-btn class="add-btn" @click="addFactory">+ Add Factory Information</v-btn>
        </div>
      </div>
      <div class="btn-container">
        <v-btn>Submit</v-btn>
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
      factories: [],
      factoryData: '',
      branchData: '',
      factoryNames: [],
      branchNames: [],
      factoryInfo: {
        factory_id: '',
        name: '',
        location: '',
        contact_num: '',
        area_size: '',
        production_staff_num: '',
        qc_staff_num: '',
        rd_staff_num: '',
        production_line_num: '',
        annual_output_val: '',
        annual_production_capacity: [],
        image: '',
      }
    }
  },
  created() {
    this.addFactory();
  },
  watch: {
    // factoryData(val) {
    //   this.factoryNames.push(val);
    //   this.form = '';
    // },
    // branchData(val) {
    //   this.branchNames.push(val);
    //   this.form = '';
    // }
  },
  methods: {
    addFactory() {
      this.factories.push(this.factoryInfo);
    },
    deleteFactory(index) {
      this.factories.splice(index, 1);
    }
  }
}
</script>
