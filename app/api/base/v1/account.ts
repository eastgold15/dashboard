import { endHttp } from '../../axios'
import type { IDataResponse } from '../index.type'
import type { ILoginToken } from './auth.type'

export default {
  dailyFortune() {
    return endHttp.get('dummy/fortune')
  },
}
