<template>
  <!-- <div class="pa-9 ma-5">
    <img src="banner4.png" width="100%" />
    <div class="rel">
      <div class="tit">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
     <v-btn>
            {{button}}
<<<<<<< HEAD
        </v-btn> 
     <div class="desc">{{ desc }}</div> 
  </div> -->
  <div class="pa-10">
=======
        </v-btn>
     <div class="desc">{{ desc }}</div>
  </div> -->
  <div class="py-10">
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
    <div class="banner">
      <div class="py-10"  id="div1">
        {{ title }}
      </div>
      <div class="desc">
        <div class="mt-5"  id="div2">
          {{ desc }}
        </div>
      </div>
      <div  id="div3">
        <v-btn color="#EB3535" width="200px" height="45px">
          <span  id="span1">
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
<<<<<<< HEAD
  height: 100px;
  padding-right: 400px;
  padding-left: 400px;
=======
  /*height: 100px;*/
  /*padding-right: 400px;*/
  /*padding-left: 400px;*/
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
}
.banner {
  height: 350px;
  width: 100%;
  background-image: url("/banner4.png");
  background-position: center;
  background-size: cover;
  border-radius: 20px;
}
#div1 {
  font-size: 32px;
  text-align: center;
}
#div2 {
<<<<<<< HEAD
  font-size: 15px;
  text-align: center;
=======
  font-size: 13px;
  text-align: center;
  color:#777;
  padding:0 10px
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
}
#div3 {
  color: white;
  text-align: center;
  margin-top: 20px;
}
#span1 {
  color: white;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 9ded16916b1bee121280f3ffae04a0f1c88386ed
