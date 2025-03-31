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
import FontCarbon from '@/constants/carbon.json'
export default defineConfig({
  shortcuts: {
    // 特殊原子
    'btn-unit': 'text-14px text-[rgba(255,255,255,0.8)] bg-rgba(255, 255, 255, 0.1) px-8px py-4px border-rd-4px',

    // 间距规范
    'space-xs': 'm-1 p-1', // 4px
    'space-sm': 'm-2 p-2', // 8px
    'space-md': 'm-4 p-4', // 16px
    'space-lg': 'm-6 p-6', // 24px
    'space-xl': 'm-8 p-8', // 32px
    // 按钮样式
    'btn': 'bg-[#407E8A] text-white p-2 px-8 rounded-md text-center text-sm hover:bg-[#366a74] active:bg-[#2a525c] focus:ring-2 focus:ring-[#407E8A] focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95',
    'btn-active': 'bg-[#2a525c] ring-2 ring-[#407E8A] ring-opacity-50',
    // 背景色
    'bg-primary': 'bg-[#1C222A]', // 背景色
    'bgAlpha': 'bg-black bg-opacity-50 backdrop-blur-sm shadow-md backdrop-blur-1px', // 移除首尾多余空格

    // 菜单间距
    'menu-space': 'm-4 p-4', // 菜单之间的间距
    'menu-item-space': 'm-2 p-2', // 菜单项之间的间距

    // 布局间距
    'layout-space': 'm-8 p-8', // 布局之间的间距
    'section-space': 'm-6 p-6', // 区块之间的间距

    // 文字颜色
    'text-primary': 'text-gray-900 dark:text-gray-100', // 主要文字
    'text-secondary': 'text-gray-700 dark:text-gray-300', // 次要文字
    'text-tertiary': 'text-gray-500 dark:text-gray-500', // 辅助文字
    'text-error': 'text-red-500 dark:text-red-400', // 错误文字
    'text-success': 'text-green-500 dark:text-green-400', // 成功文字
    'text-warning': 'text-yellow-500 dark:text-yellow-400', // 警告文字
    'text-info': 'text-blue-500 dark:text-blue-400', // 信息文字

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
    'card': 'bg-white p-4 rounded-lg shadow-md',
    'card-header': 'text-lg font-bold mb-2',

    // 布局样式
    'container': 'max-w-7xl mx-auto px-4',

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
  safelist: FontCarbon,
})
