// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: "老baby·二爷",
      meta: [
        {name: "description", content: "项目的重点信息描述--" },
        {name: "keywords", content: "项目关键词" },
        {name:"applicable-device", content:"pc,mobile"}, // 移动pc适配
      ],
      link: [{
        rel:"icon",
        type: "image/x-icon",
        href:"/favicon.ico"
      }],
    }
  },
  alias: {
    "@img": "~/assets/image/",
    "@store": "~/store/"
  },
  css: [
    'element-plus/dist/index.css',
    '~/assets/css/iframe.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "~/assets/css/variables.scss";',
        }
      }
    }
  },
  modules: [  //配置Nuxt3的扩展的库
    "@pinia/nuxt",
    '@pinia-plugin-persistedstate/nuxt',
    "@vant/nuxt",
    "@element-plus/nuxt"
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage"//默认储存方式
  },
  postcss: {
    plugins: {
      "postcss-px-to-viewport-8-plugin": {
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
        viewportHeight: 912, // 视窗的高度，对应的是我们设计稿的高度
        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        propList: ['*'],
        selectorBlackList: [/^.pc/],
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        mediaQuery: false, // 允许在媒体查询中转换`px`,
        exclude: [/pc[\s\S]*.vue/,/element-plus/,/elementTheme.scss/], //设置忽略文件，用正则做目录名匹配
      }
    }
  },
  vant: { /** Options */ },
  elementPlus: { /** Options */ },
  components: [{
    path: '~/components/',
    pathPrefix: false, //只根据名称使用组件
  }],
  build: {
    transpile: ['element-plus']
  }
})    