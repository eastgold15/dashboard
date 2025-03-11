import type { ILivechat, IUpdateLivechat } from './wechat.type'
import { endHttp } from '../../axios'

export default {
  Livechat: {
    list(data: Partial<ILivechat>) {
      return endHttp.get('/wechat/livechat/list', data)
    },
    create(data: ILivechat) {
      return endHttp.post('/wechat/livechat', data)
    },
    update(id: string | number, data: IUpdateLivechat) {
      return endHttp.put(`/wechat/livechat/${id}`, data)
    },
    delete(id: string | number) {
      return endHttp.del(`/wechat/livechat/${id}`)
    },
  },
}
