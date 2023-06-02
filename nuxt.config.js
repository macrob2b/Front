const axios = require('axios')

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
      {rel: 'icon', type: 'image/x-icon', href: '/macrob2b.ico'},
      { rel: "stylesheet", href: "/video.js/dist/video-js.min.css",defer:true },
      { rel: "stylesheet", href: "/video.js/dist/video-js.min.css",defer:true },
    ],
    script: [
      // {
      //   type: 'text/javascript',
      //   src: '/hotjar.js',
      //   body: true,
      // },
    ],
  },

  loading: '@/components/LoadingBar',


  ssr: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/style.scss',
    '@/assets/scss/responsive.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: 'plugins/axios.js',defer:true,async:true},
    {src: 'plugins/vee-validate.js', ssr: true,defer:true,async:true},
    {src: 'plugins/persistedState.client.js',defer:true,async:true},
    {src: 'plugins/filters.js',defer:true,async:true},
    {src: 'plugins/gtag.js',mode:"client"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-leaflet',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],


  image: {
    dir: 'static',
  },
  axios: {
    proxy: true,
    headers: {},
  },

  auth: {
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
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
        clientId: process.env.FACEBOOK_CLIENT_ID,
        redirectUri: process.env.FACEBOOK_REDIRECT_URI,
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
        clientId: process.env.LINKEDIN_CLIENT_ID,
        redirectUri: process.env.LINKEDIN_REDIRECT_URI,
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


  sitemap: {
    hostname: 'https://macrob2b.com',
    gzip: true,
    exclude: [
      '/admin/**',
      '/user/**',
      '/auth/**'
    ],
    routes: async () => {
      let {data: products} = await axios.post(process.env.API_URL+'/api/all_product_list');

      let {data: companies} = await axios.post(process.env.API_URL+'/api/all_company_list');


      products = products.map((product) => ({
        url:`/product-details/${product._id}`,
        lastmod:product.updated_at,
        changefreq:'monthly'
      }));
      companies = companies.map((company) => ({
        url:`/company/${company.username}`,
        lastmod:company.updated_at,
        changefreq:'monthly'
      }));

      return products.concat(companies);
    },
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date()
    }
  },


  proxy: {
    '/api/': {target: process.env.API_URL, pathRewrite: {'^/api/': '/api/'}, changeOrigin: true}
  },

  serverMiddleware:[
    '~/middleware/redirects'
  ],


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets:false,
    theme: {
      dark  : false,
      themes: {
        dark : {
          primary  : "#1976D2",
          accent   : "#424242",
          secondary: "#FB641E",
          info     : "#26A69A",
          warning  : "#FFC107",
          error    : "#DD2C00",
          success  : "#00E676"
        },
        light: {
          primary  : '#00394D',
          accent   : '#005270',
          secondary: "#D2D3D5",
          info     : "#26A69A",
          warning  : "#FFC107",
          error    : "#DD2C00",
          success  : "#00E676"
        }
      }
    },
    icons: {
      iconfont: 'mdi',
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
    baseUrl:"/storage",
  },

  pwa: {
    manifest: {
      name: 'Macrob2b App',
      short_name:'Macrob2b',
      description:'Global B2B marketplace connecting buyers with suppliers all over the world.',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },

}

