<template>
  <div class="add-branch">
    <div class="add-branch-inner">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="branchName"
                label="Branch Name"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="contactNumber"
                :rules="contactRules"
                label="Contact Number"
                outlined
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
            >
              <v-text-field
                v-model="branchAddress"
                label="Branch Address"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col
              class="d-flex"
              cols="12"
            >
              <v-textarea
                outlined
                name="description"
                label="Description"
                required
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-file-input
                accept="image/*"
                label="Image"
                outlined
              ></v-file-input>
            </v-col>
          </v-row>
          <BranchSupervisor></BranchSupervisor>
        </v-container>
      </v-form>
      <div class="btn-container">
        <v-btn @click="submit">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import BranchSupervisor from "~/components/factories-branches/branch-supervisor"
  export default {
    components: {
      BranchSupervisor
    },
    data() {
      return {
        branchName: '',
        branchAddress: '',
        contactNumber: null,
        contactRules: [
          value => {
            const pattern = /^[0-9]*$/;
            return pattern.test(value) || 'Invalid value.'
          },
        ]
      }
    },
    methods: {
      submit() {
        this.$emit('formData', this.branchName);
      }
    }
  }
</script>
