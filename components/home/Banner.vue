<template>
  <!-- <div class="pa-9 ma-5">
    <img src="banner4.png" width="100%" />
    <div class="rel">
      <div class="tit">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
     <v-btn>
            {{button}}
        </v-btn> 
     <div class="desc">{{ desc }}</div> 
  </div> -->
  <div class="pa-10">
    <div class="banner">
      <div class="py-10" style="font-size: 32px; text-align: center">
        {{ title }}
      </div>
      <div class="desc">
        <div class="mt-5" style="font-size: 15px; text-align: center">
          {{ desc }}
        </div>
      </div>
      <div style="color: white; text-align: center; margin-top: 20px">
        <v-btn color="#EB3535" width="200px" height="45px">
          <span style="color: white">
            {{ button }}
          </span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Title",
      desc: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!",
      button: "Button",
    };
  },
};
</script>

<style scoped>
.desc {
  /* position: relative; */
  /* top : 230px; */
  /* text-align: center;
  padding-right: 300px;
  padding-left: 300px;
  font-size: 14px;
  font-weight: 500; */
  height: 100px;
  padding-right: 400px;
  padding-left: 400px;
}
.banner {
  height: 350px;
  width: 100%;
  background-image: url("/banner4.png");
  background-position: center;
  background-size: cover;
  border-radius: 20px;
}
</style>