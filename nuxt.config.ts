import Aura from '@primeuix/themes/aura'
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'nuxt-echarts',
    'dayjs-nuxt',
    '@primevue/nuxt-module',
  ],
  echarts: {
    // https://echarts.nuxt.dev/guides/usage
    renderer: ['svg', 'canvas'],
    charts: ['BarChart', 'LineChart', 'PieChart', 'GaugeChart'],
    components: ['DatasetComponent', 'GridComponent', 'TooltipComponent', 'LegendComponent', 'TitleComponent'],
    features: ['LabelLayout', 'UniversalTransition'],
  },

  devtools: {
    enabled: true,
  },
  primevue: {
    usePrimeVue: false,
    importTheme: { from: '@/assets/themes/mytheme.js' },

    options: {
      ripple: true,
      inputVariant: 'filled',
    },

  },

  app: {
    // head
    head: {
      title: '学生水务实践',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'ElementPlus + Nuxt3',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // css
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/scss/index.scss',
  ],

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // colorMode
  colorMode: {
    classSuffix: '',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },
  build: { transpile: ['echarts-liquidfill'] },
  vite: {
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
            @use "@/assets/scss/element/index.scss" as element;
            @use "@/assets/scss/global/index.scss" as *;
          `,
        },
      },
    },
  },

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文',
      },
    ],

  },
  runtimeConfig: {
    count: 1,
    apiSecret: '', // 可以由 NUXT_API_SECRET 环境变量覆盖
    public: {
      // 可以由 NUXT_BASEURL_DEV 环境变量覆盖
      // eslint-disable-next-line node/prefer-global/process
      apiBase: process.env.NODE_ENV === 'development' ? process.env.NUXT_BASEURL_DEV : process.env.NUXT_BASEURL_PROD,
      // eslint-disable-next-line node/prefer-global/process
      apiBase_mock: process.env.NUXT_BASEURL_MOCK,

      // # 开发环境读取配置文件路径
      // eslint-disable-next-line node/prefer-global/process
      VITE_PUBLIC_PATH: process.env.VITE_PUBLIC_PATH || '/',
    },
  },

  $production: {
    // routeRules: {
    //   "/**": { isr: true },
    // },
  },
  $development: {
    //
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        jsx: 'preserve',
      },
    },
  },
  srcDir: 'app/',
  // build: {
  //   transpile: [/echarts/],
  // },
})
