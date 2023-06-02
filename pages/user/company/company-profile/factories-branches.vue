<template>
  <div class="factories-branches">
    <div class="add-information">
      <div class="add-information-header">
        <p>Factories</p>
      </div>
      <div>
        <div class="add-factory">
          <div class="add-information-body">
            <v-btn v-if="!showFactoryForm" class="primary add-btn" @click="AddFactoryInfo">+ Add Factory
              Information
            </v-btn>
          </div>

          <div ref="add_factory">
            <add-factory v-if="showFactoryForm"
                         @submitStatus="factorySubmitStatus"
                         v-model="showFactoryForm"
                         @addFactoryInfo="addFactory"></add-factory>
            <Factories :submit_status="factory_submit_status" @edit="editFactory" @delete="deleteFactory"></Factories>
          </div>
        </div>
      </div>
    </div>

    <div class="branches-branches">
      <div class="add-information">
        <div class="add-information-header">
          <p>Branches</p>
        </div>
        <div>
          <div class="add-factory">
            <div class="add-information-body">
              <v-btn v-if="!showBranchForm" class="primary add-btn" @click="AddBranchInfo">+ Add Branch
                Information
              </v-btn>
            </div>
            <add-branch v-if="showBranchForm"
                         @submitStatus="branchSubmitStatus"
                         v-model="showBranchForm"
                         @addFactoryInfo="addFactory"></add-branch>
            <Branches
              :submit_status="branch_submit_status"
            ></Branches>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnnualProduction from "~/components/factories-branches/annual-production"
import AddInformation from "~/components/factories-branches/add-information"
import AddFactory from "~/components/factories-branches/add-factory"
import Factories from "~/components/factories-branches/factories"
import Branches from "~/components/factories-branches/branches"
import AddBranch from "../../../../components/factories-branches/add-branch";

export default {
  components: {
    AddBranch,
    AnnualProduction,
    AddInformation,
    AddFactory,
    Branches,
    Factories
  },
  computed: {},
  data() {
    return {
      showFactoryForm: false,
      showBranchForm: false,
      factoryInfo: null,
      factory_submit_status: false,
      branch_submit_status: false
    }
  },
  created() {
    // this.addFactory();
  },
  mounted() {
  },
  watch: {
    showFactoryForm(val) {
      if (!val) {
        this.factoryInfo = null;
        window.scrollTo(0,0);
      }
    },
    showBranchForm(val) {
      if (val===false) {
        window.scrollTo(0,0);
      }
    }
  },
  methods: {
    AddFactoryInfo() {
      this.showFactoryForm = true;
      this.factory_submit_status = false;
    },
    AddBranchInfo() {
      this.showBranchForm = true;
      this.branch_submit_status = false;
    },
    editFactory(factoryInfo) {
      this.showFactoryForm = true;
      this.factoryInfo = factoryInfo;
      window.scrollTo({top: this.$refs.add_factory.getBoundingClientRect().top, behavior: "smooth"});


    },
    addFactory(factoryInfo) {
      this.showFactoryForm = false;
      this.factories.push(Object.assign({}, factoryInfo));
    },
    deleteFactory(index) {
      this.factories.splice(index, 1);
    },
    factorySubmitStatus(val) {
      if (val === true) {
        this.showFactoryForm = false;
        this.factory_submit_status = true;
        window.scrollTo(0, 0);
      }
    },
    branchSubmitStatus(val) {
      if (val === true) {
        this.showBranchForm = false;
        this.branch_submit_status = true;
        window.scrollTo(0, 0);
      }
    }
  }
}
</script>
