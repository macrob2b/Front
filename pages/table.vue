<template>
  <v-data-table
    :headers="headers"
    :items="certificateList"
    sort-by="calories"
    class="elevation-1 certificate-table"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >

          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.certificateName"
                      label="certificateName"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.certificateIsuuer"
                      label="certificateIsuuer"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.certificateID"
                      label="certificateID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.expiryDate"
                      label="expiryDate"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-file-input
                      v-model="editedItem.picture"
                      accept="image/*"
                      label="Image"
                      outlined
                      required
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Certificate name',
        align: 'start',
        sortable: false,
        value: 'certificateName',
      },
      {text: 'Certificate isuuer', value: 'certificateIsuuer'},
      {text: 'Certificate ID', value: 'certificateID'},
      {text: 'Expiry date', value: 'expiryDate'},
      {text: 'Picture', value: 'picture'},
      {text: 'Description', value: 'description'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    certificateList: [],
    editedIndex: -1,
    editedItem: {
      picture: 'poster.png',
      certificateName: 'Example',
      certificateIsuuer: 'Example',
      certificateID: 'Example',
      ExpiryDate: 'Example',
    },
    defaultItem: {
      picture: 'poster.png',
      certificateName: 'Example',
      certificateIsuuer: 'Example',
      certificateID: 'Example',
      ExpiryDate: 'Example',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.certificateList = [
        {
          picture: 'poster.png',
          certificateName: 'Example',
          certificateIsuuer: 'Example',
          certificateID: 'Example',
          ExpiryDate: 'Example',
        },
        {
          picture: 'poster.png',
          certificateName: 'Example',
          certificateIsuuer: 'Example',
          certificateID: 'Example',
          ExpiryDate: 'Example',
        },

      ]
    },

    editItem (item) {
      this.editedIndex = this.certificateList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.certificateList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.certificateList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.certificateList[this.editedIndex], this.editedItem)
      } else {
        this.certificateList.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
