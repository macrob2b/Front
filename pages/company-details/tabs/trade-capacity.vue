<template>
  <div class="company-details">
    <div class="pa-8 secondary-background company-details-tabs-content trade-tab-content">
      <div class="mb-8 title">
        <v-icon class="secondary-color">mdi-poll</v-icon>
        Trademarks
      </div>
      <v-data-table
        :headers="headers"
        :items="trademark"
        item-key="name"
        class="elevation-1 trade-table"
      >
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
    headers: [
      {
        text: 'TrademarkName',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Trademark NO.', value: 'TrademarkNO' },
      { text: 'Start Date', value: 'StartDate' },
      { text: 'Trademark description', value: 'TrademarkDescription' },
      { text: 'Verified', value: 'Verified' },
    ],
    trademark: [
      {
        name: 'Example',
        TrademarkNO: 'Example',
        StartDate: 'Example',
        TrademarkDescription: 'Example',
        Verified: true,
      },
      {
        name: 'Example',
        TrademarkNO: 'Example',
        StartDate: 'Example',
        TrademarkDescription: 'Example',
        Verified: true,
      },
    ],

  }),
}
</script>
