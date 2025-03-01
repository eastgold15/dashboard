import { userStore } from '#imports'
import { $endApi } from '~/composables/api/base'
import { type IChatConversation, PersistStatus } from '~/composables/api/base/v1/aigc/completion-types'
import { encodeObject } from '~/composables/common'

// export enum HistoryManageMode {
//   OFFLINE,
//   ONLINE,
// }

export interface IHistoryManager {
  // getCurrentMode: () => HistoryManageMode

  /**
   * @deprecated 已取消用户离线使用 必须登录使用
   * 触发模式更新，用于抉择历史管理状态
   * 1.离线模式使用 localStorage 管理
   * 2.在线模式需要进行以下步骤：
   *  a) 上传离线模式对话记录
   *  b) 同步历史在线对话记录
   *  c) 接受对话记录更新上传
   */
  // triggerUpdateMode: () => void

  uploadHistory: (history: IChatConversation, uploadHandler: IUploadHistoryHandler) => Promise<boolean>
}

export interface IUploadHistoryHandler {
  onHistorySyncing: () => void
  onHistoryUploadFailed: (error: Error) => void
  onHistoryUploadSuccess: () => void
}

export enum IHistoryStatus {
  DONE,
  LOADING,
  COMPLETED,
  ERROR,
}

export interface IHistoryOption {
  list: Map<string, IChatConversation>
  status: IHistoryStatus
  page: number
}

export class HistoryManager implements IHistoryManager {
  // TODO: performance - shallowReactive
  options: IHistoryOption = reactive({
    list: new Map(),
    status: IHistoryStatus.DONE,
    page: 0,
  })

  constructor() {
    $event.on('USER_LOGOUT_SUCCESS', () => {
      this.options.list.clear()
    })
    $event.on('USER_LOGIN_SUCCESS', async () => {
      this.loadHistories()
    })
  }

  // #updateScope?: EffectScope

  // triggerUpdateMode() {
  //   if (this.#updateScope)
  //     this.#updateScope.stop()

  //   this.#updateScope = effectScope()

  //   this.#updateScope.run(() => {
  //     const localHistoryList = useLocalStorage<ThHistory[]>('chat-history', [])

  //     if (this.getCurrentMode()) {
  //       this.#historyList = reactive([])

  //       if (localHistoryList.value.length) {
  //         // TODO: 上传离线对话记录
  //         // TODO: 同步历史在线对话记录
  //       }
  //     }
  //     else {
  //       this.#historyList = reactive(localHistoryList.value)
  //     }
  //   })
  // }

  async searchHistories(query: string) {
    return $endApi.v1.aigc.getConversations({
      pageSize: 25,
      page: 1,
      topic: query
    })
  }

  async loadHistories() {
    if (!userStore.value.isLogin)
      return

    this.options.status = IHistoryStatus.LOADING
    this.options.page += 1

    const res: any = await $endApi.v1.aigc.getConversations({
      pageSize: 25,
      page: this.options.page,
    })

    this.options.status = IHistoryStatus.DONE

    if (res.code !== 200) {
      return ElMessage({
        message: `获取历史记录失败!所有操作不会被保存!`,
        grouping: true,
        type: 'error',
        plain: true,
      })
    }

    const totalPages = res.data.meta.totalPages
    if (totalPages <= this.options.page) {
      this.options.status = IHistoryStatus.COMPLETED
      this.options.page -= 1
    }

    const result = (res.data.items).map((item: any) => decodeObject(item.value))

    result.forEach((item: IChatConversation) => {
      this.options.list.set(item.id, item)
    })
  }

  async syncHistory(history: IChatConversation) {
    if (this.options.status === IHistoryStatus.LOADING)
      console.warn('HistoryManager is loading, 2 throttle sync request may cause error')

    return this.uploadHistory(history, {
      onHistorySyncing: () => {
        history.sync = PersistStatus.PENDING
      },
      onHistoryUploadFailed(error) {
        history.sync = PersistStatus.FAILED

        ElMessage.error(error.message)
      },
      onHistoryUploadSuccess: () => {
        history.sync = PersistStatus.SUCCESS
      },
    })
  }

  async uploadHistory(history: IChatConversation, uploadHandler: IUploadHistoryHandler) {
    uploadHandler.onHistorySyncing()

    async function _innerUpload() {
      if (!history.id?.length)
        throw new Error('history id is empty')

      const uploadTime = new Date()

      // const meta: Record<string, any> = {
      //   sync: true,
      //   lastUpdate: uploadTime.getTime(),
      //   templateId: history.templateId || -1, // 兜底策略，兼容以前版本
      // }
      history.lastUpdate = uploadTime.getTime()
      history.sync = PersistStatus.SUCCESS

      const uploadQuery = {
        chat_id: history.id,
        topic: history.topic,
        value: encodeObject(history),
        meta: '',
      }

      const res = await $endApi.v1.aigc.uploadHistory(uploadQuery)

      if (res.code !== 200)
        throw new Error(res.message || 'Upload failed')

      uploadHandler.onHistoryUploadSuccess()

      return true
    }

    try {
      return _innerUpload()
    }
    catch (e: any) {
      uploadHandler.onHistoryUploadFailed(e instanceof Error ? e : new Error(e))
    }

    return false
  }

  isLoading() {
    return this.options.status === IHistoryStatus.LOADING
  }
}

export const $historyManager = new HistoryManager()
