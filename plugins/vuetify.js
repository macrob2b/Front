import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify, {
  theme: {
    primary: '#5F30FE', // #E53935
    secondary: '#EB3535', // #FFCDD2
    typography: '#3E3E3E', // #3F51B5
    header: '#6633CC'
  }
})

const vuetify = new Vuetify({
  theme: {
    primary: '#5F30FE', // #E53935
    secondary: '#EB3535', // #FFCDD2
    typography: '#3E3E3E', // #3F51B5
    header: '#6633CC'
  },
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})


export default vuetify