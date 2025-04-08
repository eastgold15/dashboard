// import LoginAPi from './v1/login'
// // import CommonApi from './v1/common'
// // import ToolsApi from './v1/tools'
// // import AigcApi from './v1/aigc'
import AccountApi from './v1/account'
import AuthApi from './v1/auth'
import { useCmsApi } from './v1/cms'
// // import MarketAPi from './v1/marketing'
// // import WeChatApi from './v1/weChat'

export const $endApi = {
  v1: {
    //     login: LoginAPi,
    auth: AuthApi,
    account: AccountApi,
    get cms() {
      return useCmsApi() // 改为 getter 形式
    },
    //     // common: CommonApi,
    //     // tools: ToolsApi,
    //     // aigc: AigcApi,
    //     // market: MarketAPi,
    //     // wechat: WeChatApi,
  },
}
