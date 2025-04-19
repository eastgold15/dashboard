import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    // 特殊原子
    'btn-unit': 'text-14px text-[rgba(255,255,255,0.8)] bg-rgba(255, 255, 255, 0.1) px-8px py-4px border-rd-4px',

    // 间距规范

    // 按钮样式

    'header-btn': 'bg-[#407E8A] text-white p-2 px-8 rounded-md text-center text-sm hover:bg-[#366a74] active:bg-[#2a525c] focus:ring-2 focus:ring-[#407E8A] focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95',
    'header-btn-active': 'bg-[#2a525c] ring-2 ring-[#407E8A] ring-opacity-50',
    // 背景色
    'bgAlpha': 'bg-black bg-opacity-50 backdrop-blur-sm shadow-md backdrop-blur-1px',

    // 菜单间距
    'menu-space': 'm-4 p-4', // 菜单之间的间距
    'menu-item-space': 'm-2 p-2', // 菜单项之间的间距

    // 布局间距
    'layout-space': 'm-8 p-8', // 布局之间的间距
    'section-space': 'm-6 p-6', // 区块之间的间距

    // 水务特色文本
    'water-title': 'text-xl font-bold text-water-blue text-[#387e98]',
    'water-subtitle': 'text-lg font-medium text-water-blue',
    // 布局规范
    'flex-row': 'flex flex-row', // 水平排列
    'flex-col': 'flex flex-col', // 垂直排列
    'flex-center': 'flex justify-center items-center', // 居中对齐
    'flex-between': 'flex justify-between items-center', // 两端对齐
    'flex-around': 'flex justify-around items-center', // 均匀分布
    'flex-start': 'flex justify-start items-center', // 左对齐
    'flex-end': 'flex justify-end items-center', // 右对齐

    // 网格布局
    'grid-2': 'grid grid-cols-2 gap-4', // 两列网格
    'grid-3': 'grid grid-cols-3 gap-4', // 三列网格
    'grid-responsive': 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', // 响应式网格

    // 响应式断点
    'sm': 'max-w-screen-sm mx-auto px-4', // 640px
    'md': 'max-w-screen-md mx-auto px-4', // 768px
    'lg': 'max-w-screen-lg mx-auto px-4', // 1024px
    'xl': 'max-w-screen-xl mx-auto px-4', // 1280px

    // 响应式文字大小
    'text-sm': 'text-sm sm:text-base md:text-lg lg:text-xl', // 响应式文字大小
    'text-md': 'text-base sm:text-lg md:text-xl lg:text-2xl', // 响应式文字大小
    'text-lg': 'text-lg sm:text-xl md:text-2xl lg:text-3xl', // 响应式文字大小

    // 卡片样式


    // 布局样式


  },
  presets: [
    presetWind3(),
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
  theme: {

  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
