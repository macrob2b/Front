<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content certificate-tab-content">
      <div class="mb-8 title">
        <v-icon class="secondary-color">mdi-poll</v-icon>
        Trademarks
      </div>
      <v-data-table
        :headers="headers"
        :items="trademark"
        item-key="name"
        class="elevation-1 certificate-table"
      >
        <template v-slot:item.picture="{ item }">
          <img :src="require(`~/assets/img/${item.picture}`)" style="width: 50px; height: 40px" />
        </template>
        <template v-slot:item.Verified="{ item }">
          <v-simple-checkbox
            v-model="item.Verified"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data: () => ({
    trademark: [
      {
        picture: 'poster.png',
        certificateName: 'Example',
        certificateIsuuer: 'Example',
        certificateID: 'Example',
        ExpiryDate: 'Example',
        Verified: 'true',
      },
    ],
    headers: [
      {
        text: 'Picture',
        align: 'start',
        sortable: false,
        value: 'picture',
      },
      { text: 'Certificate name', value: 'certificateName' },
      { text: 'Certificate isuuer', value: 'certificateIsuuer' },
      { text: 'Certificate ID', value: 'certificateID' },
      { text: 'Expiry date', value: 'ExpiryDate' },
      { text: 'Verified', value: 'Verified' },
    ],
  }),
}
</script>
