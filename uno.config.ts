import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    // 标题样式
    'h1': 'text-3xl font-bold mb-4',
    'h2': 'text-2xl font-bold mb-3',
    'h3': 'text-xl font-bold mb-2',
    'h4': 'text-lg font-bold mb-2',

    // 文本样式
    'text-base': 'text-base text-gray-800 dark:text-gray-200',
    'text-sm': 'text-sm text-gray-700 dark:text-gray-300',
    'text-xs': 'text-xs text-gray-600 dark:text-gray-400',

    // 水务特色文本
    'water-title': 'text-xl font-bold text-water-blue',
    'water-subtitle': 'text-lg font-medium text-water-blue',
    // 按钮样式
    'btn': 'bg-blue-500 text-white p-2 rounded-md text-sm hover:bg-blue-600',
    'btn-primary': 'bg-blue-500 text-white p-2 rounded-md text-sm hover:bg-blue-600',
    'btn-secondary': 'bg-gray-500 text-white p-2 rounded-md text-sm hover:bg-gray-600',

    // 卡片样式
    'card': 'bg-white p-4 rounded-lg shadow-md',
    'card-header': 'text-lg font-bold mb-2',

    // 布局样式
    'container': 'max-w-7xl mx-auto px-4',
    'flex-center': 'flex justify-center items-center',
    'titileFont': 'text-xl font-bold', // 移除末尾多余空格
    'bgAlpha': 'bg-black bg-opacity-50 backdrop-blur-sm shadow-md', // 移除首尾多余空格

    'sm': 'max-w-screen-sm mx-auto px-4',  // 640px
    'md': 'max-w-screen-md mx-auto px-4',  // 768px
    'lg': 'max-w-screen-lg mx-auto px-4',  // 1024px
    'xl': 'max-w-screen-xl mx-auto px-4',  // 1280px
    

  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: ['Alibaba PuHuiTi', 'system-ui', 'sans-serif'],
        serif: ['Alibaba PuHuiTi', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
