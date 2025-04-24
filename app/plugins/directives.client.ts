export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('permission', {
    mounted(el, binding) {
      const permission = useMyPermissionStore()
      if (!permission.hasPermission(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
})
