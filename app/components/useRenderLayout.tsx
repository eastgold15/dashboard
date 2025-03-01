import { ElScrollbar } from 'element-plus'
import { computed, defineComponent, h } from 'vue'

import { useMyAppStore } from '~/stores/app'

import Footer from './Footer.vue'
import Logo from './Logo.vue'
import Menu from './Menu.vue'
import ToolHeader from './ToolHeader.vue'

const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')
const appStore = useMyAppStore()

const logo = appStore.getLogo()
const mobile = appStore.getMobile()
const tagsView = appStore.getTagsView()
const collapse = appStore.getCollapse()
const pageLoading = appStore.getPageLoading()
const fixedHeader = appStore.getFixedHeader()

export function useRenderLayout() {
  const renderClassic = (slots: any) => {
    return defineComponent({
      props: {
        fixedHeader: Boolean,
        layout: String,
        footer: Boolean,
      },
      setup(props) {
        const containerClass = computed(() => {
          return [
            'p-[var(--app-content-padding)] w-[100%] bg-[var(--app-content-bg-color)] dark:bg-[var(--el-bg-color)]',
            {
              '!min-h-[calc(100%-var(--app-footer-height))]': props.fixedHeader && props.layout === 'classic' && props.footer,
              '!min-h-[calc(100%-var(--tags-view-height)-var(--top-tool-height)-var(--app-footer-height))]': !props.fixedHeader && props.layout === 'classic' && props.footer,
            },
          ]
        })

        const contentClass = computed(() => {
          return [
            `${prefixCls}-content`,
            'absolute top-0 h-[100%]',
            {
              'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]': collapse && !mobile,
              'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]': !collapse && !mobile,
              'fixed !w-full !left-0': mobile,
            },
          ]
        })

        const scrollbarClass = computed(() => {
          return [
            `${prefixCls}-content-scrollbar`,
            {
              '!h-[calc(100%-var(--top-tool-height)-var(--tags-view-height))] mt-[calc(var(--top-tool-height)+var(--tags-view-height))]': fixedHeader,
            },
          ]
        })

        const toolHeaderClass = computed(() => {
          return [
            'bg-[var(--top-header-bg-color)]',
            {
              'layout-border__bottom': !tagsView,
            },
          ]
        })

        const logoClass = computed(() => {
          return [
            'bg-[var(--left-menu-bg-color)] relative',
            {
              '!pl-0': mobile && collapse,
              'w-[var(--left-menu-min-width)]': collapse,
              'w-[var(--left-menu-max-width)]': !collapse,
            },
          ]
        })

        return () => (
          <div class="h-full flex flex-col">
            <header class="flex-shrink-0">
              <ToolHeader class={toolHeaderClass.value} />
              <Menu class="flex-grow" />
            </header>
            <main class="flex-grow">
              <ElScrollbar v-loading={pageLoading} class={scrollbarClass.value}>
                <div class={containerClass.value}>
                  {slots.default ? slots.default() : null}
                </div>
              </ElScrollbar>
            </main>
            <footer class="flex-shrink-0">
              <Footer />
            </footer>
          </div>
        )
      },
    })
  }

  return {
    renderClassic,
  }
}
