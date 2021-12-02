<template>
  <v-text-field
    class="phoneNumberInput"
    v-model.number="phoneNumber"
    height="55"
    type="number"
    :error-messages="errors"
    :label="$t(`PHONE_NUMBER`)"
    outlined>
    <template slot="prepend-inner">
      <v-select class="phoneCodeSelect"
                v-model="phoneCode"
                :items="phoneCodes"
                item-text="name"
                item-value="dialCode"
                flat
                solo
                dense>
        <template slot="selection" slot-scope="data">
          <gb-flag :code="data.item.iso2" class="mr-2"/>
          +{{ data.item.dialCode }}
        </template>
        <template slot="item" slot-scope="data">
          <gb-flag :code="data.item.iso2" class="mr-2"/>
          {{ data.item.name }}
        </template>
      </v-select>
    </template>
  </v-text-field>
</template>

<script>

import {countries} from 'assets/countriesList';

export default {
  name : "phoneNumberInput",
  props: ['errors'],
  data() {
    return {
      phoneCode  : '93',
      phoneNumber: '',
      finalNumber: '',
      phoneCodes : countries,
    };
  },
  methods: {
    inputChanged() {
      this.$emit('numberEntered', '+' + this.phoneCode + ' ' + this.phoneNumber);
    }
  },
  watch  : {
    phoneNumber: function (val) {
      this.inputChanged();
    },
    phoneCode  : function (val) {
      this.inputChanged();
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
}

.phoneNumberInput >>> input::-webkit-outer-spin-button,
.phoneNumberInput >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

</style>
