<template>
  <div class="factories-branches">
    <div class="add-information">
      <div class="add-information-header">
        <p>Factories</p>
      </div>
      <div>
        <div class="add-factory">
          <div class="add-information-body">
            <v-btn v-if="!showFactoryForm" class="primary add-btn" @click="showFactoryForm = true">+ Add Factory Information</v-btn>
          </div>

          <add-factory v-if="showFactoryForm" v-model="showFactoryForm" :defaultFactoryInfo="defaultFactoryInfo" @addFactoryInfo="addFactory" @reloadFactories="reloadFactories"></add-factory>
          <Factories v-model="factories" @edit="editFactory" @delete="deleteFactory"></Factories>
        </div>
      </div>
    </div>

    <Branches></Branches>

  </div>
</template>

<script>
import AnnualProduction from "~/components/factories-branches/annual-production"
import AddInformation from "~/components/factories-branches/add-information"
import AddFactory from "~/components/factories-branches/add-factory"
import Factories from "~/components/factories-branches/factories"
import Branches from "~/components/factories-branches/branches"

export default {
  components: {
    AnnualProduction,
    AddInformation,
    AddFactory,
    Branches,
    Factories
  },
  computed: {
    defaultFactoryInfo() {
      return this.factoryInfo || {
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
        image: [],
      };
    }
  },
  data() {
    return {
      showFactoryForm: false,
      factories: [],
      factoryInfo: null
    }
  },
  created() {
    // this.addFactory();
  },
  beforeMount() {
      this.reloadFactories();
  },
  watch: {
    showFactoryForm(val) {
      if(!val) {
        this.factoryInfo = null;
      }
    },
  },
  methods: {
    editFactory(factoryInfo) {
      this.showFactoryForm = true;
      this.factoryInfo = factoryInfo;
    },
    addFactory(factoryInfo) {
      this.showFactoryForm = false;
      this.factories.push(Object.assign({}, factoryInfo));
    },
    deleteFactory(index) {
      this.factories.splice(index, 1);
    },
    reloadFactories(func) {
      this.$axios.post('/api/factory_list', {company_id: this.$auth.user.company._id}).then(response => {
        console.log('aaaaaaaaaaaaa factory_list', response.data)
        this.factories = response.data;
        if(func) {
          func(true, this);
        }
      }).catch(({response}) => {
          func(false, this);
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
