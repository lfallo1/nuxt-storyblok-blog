const pkg = require('./package')
const axios = require('axios')

const STORYBLOK_TOKEN = process.env.NODE_ENV == 'production' ? 'zPLZ7clr4u2dlhNwgCi4Pgtt' : 'HP0S4MrLY1nyw3tSXWcj3Att';
const STORYBLOK_VERSION = process.env.NODE_ENV == 'production' ? 'published' : 'draft';

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Storyblok + Nuxt Blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "An awesome blog about tech stuff, built with Nuxt and Storyblok" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    ['storyblok-nuxt', {accessToken: STORYBLOK_TOKEN, cacheProvider: 'memory'}]
  ],

  generate:{
    routes: function(){
      return axios.get(`https://api.storyblok.com/v1/cdn/stories?version=published&token=zPLZ7clr4u2dlhNwgCi4Pgtt&starts_with=blog&cv=${Math.floor(Date.now() / 1e3)}`).then(res=>{
        const blogPosts = res.data.stories.map(s=>s.full_slug);
        return ['/', '/blog', '/about', ...blogPosts]
      });
    }
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
