import { endHttp } from '../../axios'

export default {
  dailyFortune() {
    return endHttp.get('dummy/fortune')
  },
}
