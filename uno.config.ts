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
