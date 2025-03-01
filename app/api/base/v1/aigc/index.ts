import type { IPageResponse } from '../../index.type'
import type { IHistoryUploadQuery } from './completion-types'
import type { HistoryQuery } from './history/index.type'
import { endHttp } from '~/composables/api/axios'

export default {
  uploadHistory(history: IHistoryUploadQuery) {
    return endHttp.post('aigc/conversations', history)
  },
  getConversations(query: Partial<HistoryQuery>): Promise<IPageResponse<any>> {
    return endHttp.get('aigc/conversations', query)
  },
  deleteConversation(id: string) {
    return endHttp.del(`aigc/conversations/${id}`)
  },
  getPrompt(page: number) {
    return endHttp.get('aigc/prompts/search', {
      page,
      pageSize: 25,
      keyword: '',
    }) as Promise<IPageResponse<any>>
  },
}
