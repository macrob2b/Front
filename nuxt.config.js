import colors from 'vuetify/es5/util/colors'
import config from './config'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - macrob2bApp',
    title        : 'macrob2bApp',
    htmlAttrs    : {
      lang: 'en'
    },
    meta         : [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link         : [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: 'plugins/vee-validate.js', ssr: true},
    {src: 'plugins/persistedState.client.js'},
    {src: 'plugins/vueFlags.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies: {
      google  : {
        clientId           : config.googleClientId,
        codeChallengeMethod: '',
        responseType       : 'code',
        grantType          : 'google',
        endpoints          : {
          token   : 'http://localhost:8000/api/auth',
          userInfo: 'http://localhost:8000/api/user/'
        },
      },
      facebook: {
        clientId           : config.facebookClientId,
        responseType       : 'code',
        codeChallengeMethod: '',
        grantType          : 'facebook',
        scope              : ['public_profile', 'email'],
        endpoints          : {
          token   : 'http://localhost:8000/api/auth',
          userInfo: 'http://localhost:8000/api/user/'
        },
      },
      linkedin: {
        scheme             : 'oauth2',
        clientId           : config.linkedinClientId,
        endpoints          : {
          authorization: 'https://www.linkedin.com/oauth/v2/authorization',
          token        : 'http://localhost:8000/api/auth',
          userInfo     : 'http://localhost:8000/api/user/'
        },
        responseType       : 'code',
        scope              : ['r_liteprofile', 'r_emailaddress'],
        codeChallengeMethod: '',
        grantType          : 'linkedin',
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  i18n: {
    locales      : [
      {code: 'en', file: 'en.js'},
    ],
    lazy         : true,
    langDir      : 'lang/',
    defaultLocale: 'en',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme          : {
      dark  : false,
      themes: {
        dark: {
          primary  : colors.blue.darken2,
          accent   : colors.grey.darken3,
          secondary: colors.amber.darken3,
          info     : colors.teal.lighten1,
          warning  : colors.amber.base,
          error    : colors.deepOrange.accent4,
          success  : colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate"]
  }
}
