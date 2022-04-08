import colors from 'vuetify/es5/util/colors'
import config from './config'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | MacroB2B',
    title: 'MacroB2B',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/macrob2b.ico'}
    ]
  },

  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/style.scss',
    '@/assets/scss/responsive.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: 'plugins/vee-validate.js', ssr: true},
    {src: 'plugins/persistedState.client.js'},
    {src: 'plugins/vueFlags.js'},
    {src: 'plugins/axios.js'}
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
    '@nuxtjs/auth-next',
    'nuxt-leaflet',
    '@nuxtjs/toast',
    '@forked-prs/nuxt-infinite-scroll-module'
  ],


  axios: {
    proxy: true,
    headers: {}
  },

  auth: {
    cookie:false,
    strategies: {
      google: {
        clientId: config.googleClientId,
        redirectUri: config.googleRedirectUri,
        codeChallengeMethod: '',
        responseType: 'code',
        grantType: 'google',
        endpoints: {
          token: '/api/google_login',
          userInfo: '/api/user'
        },
        user: {
          property: 'user',
          autoFetch: false
        }
      },
      facebook: {
        clientId: config.facebookClientId,
        redirectUri: config.facebookRedirectUri,
        responseType: 'code',
        codeChallengeMethod: '',
        grantType: 'facebook',
        scope: ['public_profile', 'email'],
        endpoints: {
          token: '/api/facebook_login',
          userInfo: '/api/user'
        },
        user: {
          property: 'user',
          autoFetch: false
        }
      },
      linkedin: {
        scheme: 'oauth2',
        clientId: config.linkedinClientId,
        redirectUri: config.linkedinRedirectUri,
        endpoints: {
          authorization: 'https://www.linkedin.com/oauth/v2/authorization',
          token: '/api/linkedin_login',
          userInfo: '/api/user'
        },
        responseType: 'code',
        scope: ['r_liteprofile', 'r_emailaddress'],
        codeChallengeMethod: '',
        grantType: 'linkedin',
        user: {
          property: 'user',
          autoFetch: false
        }
      },
      local: {
        token: {
          property: 'token',
          global: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: {url: '/api/login', method: 'post'},
          refresh: {url: '/api/refresh_token', method: 'post'},
          user: {url: '/api/user'},
          logout: {url: '/api/logout',method: 'post'}
        }
      }
    }
  },


  router: {
    middleware: ['auth']
  },

  i18n: {
    locales: [
      {code: 'en', file: 'en.js'},
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },
  proxy: {
    '/api/': {target: "https://api.macrob2b.com", pathRewrite: {'^/api/': '/api/'}, changeOrigin: true}
    // '/api/': {target: "http://localhost:8000", pathRewrite: {'^/api/': '/api/'}, changeOrigin: true}
  },

  serverMiddleware:[
    '~/middleware/redirects'
  ],


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark  : false,
      themes: {
        dark : {
          primary  : colors.blue.darken2,
          accent   : colors.grey.darken3,
          secondary: "#FB641E",
          info     : colors.teal.lighten1,
          warning  : colors.amber.base,
          error    : colors.deepOrange.accent4,
          success  : colors.green.accent3
        },
        light: {
          primary  : '#00394D',
          accent   : '#005270',
          secondary: "#D2D3D5",
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
    transpile: ["vee-validate"],
  },
  toast: {
    position: 'top-center',
    duration: 3000,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  env:{
    geo_by_ip_key: config.geoByIpKey
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
}
