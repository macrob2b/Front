<template>
  <v-text-field
    v-if="render"
    class="phoneNumberInput"
    v-model.number="phoneNumber"
    height="55"
    type="number"
    :loading="loading"
    :error-messages="errors"
    :label="label"
    outlined>
    <template slot="prepend-inner">
      <v-autocomplete class="phoneCodeSelect"
                      v-model="phoneCode"
                      :items="phoneCodes"
                      item-text="title"
                      item-value="code"
                      flat
                      solo
                      dense>
        <template slot="selection" slot-scope="data">
          <gb-flag :code="data.item.flag" class="mr-2"/>
          +{{ data.item.code }}
        </template>
        <template slot="item" slot-scope="data">
          <gb-flag :code="data.item.flag" class="mr-2"/>
          {{ data.item.title }}
        </template>
      </v-autocomplete>
    </template>
  </v-text-field>
</template>

<script>

export default {
  name: "phoneNumberInput",
  props: {
    errors: {default: null},
    label: {type: String, default: 'Phone number'},
    phone: {type: String, default: null},
  },
  data() {
    return {
      inputLabel: "",
      phoneCode: '90',
      phoneNumber: '',
      finalNumber: '',
      phoneCodes: [],
      render: true,
      loading: false
    };
  },
  methods: {
    inputChanged() {
      this.$emit('numberEntered', '+' + this.phoneCode + '-' + this.phoneNumber);
    },
    reRenderComponent() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    }
  },
  watch: {
    phoneNumber: function (val) {
      this.inputChanged();
    },
    phoneCode: function (val) {
      this.inputChanged();
    }
  },
  async mounted() {
    this.loading = true;
    let countries = await this.$axios.post('/api/search_country', {
      keyword: ''
    });
    if (countries.status == 200) {
      for (let i = 0; i < countries.data.length; i++) {
        this.phoneCodes[i] = {
          title: countries.data[i].title,
          code: countries.data[i].tel,
          flag: countries.data[i].alpha2
        };
      }
      this.loading = false;

      //Set default value
      if (this.phone) {
        this.phoneCode = this.phone.split('-')[0].replace('+', '');
        this.phoneNumber = this.phone.split('-')[1];
      }
      //End set default value
      this.reRenderComponent();


    }
  }
}
</script>

<style scoped>

.phoneCodeSelect {
  margin-top: -8px !important;
  width: 130px !important;
}

.phoneNumberInput >>> input[type="number"] {
  -moz-appearance: textfield;
  text-align: left !important;
}

.phoneNumberInput >>> input::-webkit-outer-spin-button,
.phoneNumberInput >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

</style>
