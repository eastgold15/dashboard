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
import {atomicClasses } from "~/assets/styles/automic-classses"

export default defineConfig({
  shortcuts: {
    ...atomicClasses
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
