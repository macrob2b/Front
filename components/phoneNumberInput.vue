<template>
  <v-row style="position: relative">

    <v-col cols="12">
      <v-autocomplete
        class="countrySelect"
        style="position: absolute;top: 18px;left:14px;width: 24%;z-index: 1;"
        v-model="phoneCodeId"
        outlined
        dense
        :search-input.sync="keyword"
        no-filter
        :items="phoneCodes"
        item-text="title"
        item-value="_id"
      >
        <template v-slot:selection="data" style="color: #000;">
          <gb-flag :code="data.item.alpha2" class="mr-2"/>
        </template>
        <template v-slot:item="data">
          <gb-flag :code="data.item.alpha2" class="mr-2"/>
          {{ data.item.title }} (+{{ data.item.tel }})
        </template>
      </v-autocomplete>

      <v-text-field
        v-if="render"
        class="phoneNumberInput"
        v-model.number="phoneNumber"
        type="number"
        :loading="loading"
        :error-messages="errors"
        :label="label"
        outlined>
      </v-text-field>
    </v-col>
  </v-row>
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
      phoneCodeId: "62825ee56bc62418c64887b2",
      phoneCode: '90',
      phoneNumber: '',
      finalNumber: '',
      country_code: null,
      phoneCodes: [],
      render: true,
      loading: false,
      keyword: '',

    };
  },

  methods: {
    inputChanged() {
      this.$emit('numberEntered', '+' + this.phoneCode + '-' + this.phoneNumber);
    },
    async searchCountry() {
      this.loading = true;
      let countries = await this.$axios.$post('/api/search_country', {keyword: this.keyword});
      this.phoneCodes = countries;

      this.loading = false;
    }
  },
  watch: {
    phoneNumber: function (val) {
      this.inputChanged();
    },
    country_code(val) {
      if (val !== null){
        var phoneCode = this.phoneCodes
          .find(x => x.alpha2 === val);

        if (phoneCode && phoneCode._id)
          this.phoneCodeId=phoneCode._id
      }

    },
    phoneCodeId(val) {
      this.phoneCode = this.phoneCodes
        .find(x => x._id === val).tel;
    },
    phoneCode: function (val) {
      this.inputChanged();
    },
    keyword(val) {
      this.searchCountry();
    }

  },
  async mounted() {
    this.searchCountry();
  }


}
</script>

<style scoped>


.phoneNumberInput >>> input[type="number"] {
  -moz-appearance: textfield;
  text-align: left !important;
  padding-left: 28% !important;
}

.phoneNumberInput >>> label {
  padding-left: 28% !important;
}


.phoneNumberInput >>> input::-webkit-outer-spin-button,
.phoneNumberInput >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.countrySelect.v-text-field--outlined >>> fieldset {
  border-style: none !important;
}

.countrySelect >>> input {
  position: absolute;
  color: transparent;

}


</style>

