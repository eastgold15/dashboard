import type { IMenuModel } from "~/api/base/index.type"

function filterQuery(query: Record<string, any>) {
  Object.entries(query).forEach(([key, value]) => {
    if (!value) delete query[key]
  })
  return query
}

export const useMenu = () => {
  const { data: menuData, refresh: refreshMenu } = useAPI.get('/cms/menu/list', null, {
    key: 'menu-list',
    transform: (res) => res.data ?? []
  })

  const menuList = ref<IMenuModel[]>(menuData.value || [])

  const actions = {
    async fetch(query?: Partial<IMenuModel>) {
      const { data } = await useAPI.get('/cms/menu/list', filterQuery(query || {}), {
        key: 'menu-query',
        server: false
      })
      menuList.value = data.value?.data || []
    },

    async create(item: IMenuModel) {
      const { data } = await useAPI.post('/cms/menu/create', item)
      if (data.value?.code === 200) {
        await refreshMenu()
        return data.value
      }
      throw new Error(data.value?.message || '创建失败')
    },

    async update(id: number, item: Partial<IMenuModel>) {
      const { data } = await useAPI.put(`/cms/menu/update/${id}`, item)
      if (data.value?.code === 200) {
        await refreshMenu()
        return data.value
      }
      throw new Error(data.value?.message || '更新失败')
    },

    async delete(id: number) {
      const { data } = await useAPI.delete(`/cms/menu/delete/${id}`)
      if (data.value?.code === 200) {
        await refreshMenu()
        return data.value
      }
      throw new Error(data.value?.message || '删除失败')
    },

    refresh: refreshMenu
  }

  return {
    menuList,
    ...actions
  }
}
