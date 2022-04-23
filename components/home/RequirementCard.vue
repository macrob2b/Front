<template>
    <v-card class="card" color="transparent" height="100%">
        <div class="header py-5">
          <span>Tell us your <span> Buying </span> Requirement</span>
        </div>
        <div class="px-5 mb-5">
          <v-progress-linear
            value="15"
            height="1.5px"
            color="primary"
          ></v-progress-linear>
        </div>
        <div class="px-5 py-1">
          <v-text-field label="Enter product" outlined dense></v-text-field>
        </div>
        <div class="px-5 py-1">
          <v-textarea outlined no-resize name="input-7-4" label="Detail"></v-textarea>
        </div>
        <div class="px-5 py-1">
          <v-text-field label="Business email" outlined dense></v-text-field>
        </div>
        <div class="px-5 py-1">
          <v-text-field label="Company product" outlined dense></v-text-field>
        </div>
        <div class="px-5 pt-1 pb-10">
          <v-btn color="primary" width="100%"><span  id="span1"> Submit </span> </v-btn>
        </div>
    </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
#span1{
  color:white
}
.header span span {
  color: primary;
}
.header {
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
}


.card {
  background-color: #f0f0f0!important;
}
.v-input >>> .v-text-field__details {
  display: none;
}
.v-text-field--outlined >>> fieldset {
  border-width: 2px;
  border-color: #1111;
}
.v-text-field >>> .fieldset {
  border-width: 4px;
}
</style>
