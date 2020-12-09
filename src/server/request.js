/**
 * axios二次封装
 */
import router from '../router'
import axios from 'axios'
import { Dialog } from 'vant'

/*根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
const isPro = process.env.NODE_ENV === 'production' && process.env.VUE_APP_FLAG === 'pro'
if (isPro) {
  axios.defaults.baseURL = 'https://student.iauss.com/api/v1' //production 生产环境
} else {
  axios.defaults.baseURL = 'http://student-manage-test-v3.lxhelper.com/api/v1' //dev开发环境或test测试环境
}

axios.defaults.timeout = 120000 // 超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 若是有做鉴权token , 就给头部带上token
    // const token = store.state.login.user.token
    // if (token) {
    //   config.headers.Authorization = token
    // }
    return config
  },
  error => {
    // error 的回调信息
    return Promise.reject(error.data.msg)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.data && res.data.code != 0) {
      Dialog({
        title: '提示',
        message: res.data.msg
      })
    }
    return res.data
  },
  error => {
    store.dispatch('close').then(() => {
      if (error && error.response) {
        // 下面是接口回调的status ,如果做了一些错误页面,可以指向对应的报错页面
        switch (error.response.status) {
          case 400:
            Dialog({
              title: '提示',
              message: '请求错误'
            })
            break
          case 401:
            Dialog({
              title: '提示',
              message: '未授权，请重新登录'
            }).then(() => {
              router.go('/')
            })
            break
          case 403:
            Dialog({
              title: '提示',
              message: '拒绝访问'
            })
            break
          case 404:
            Dialog({
              title: '提示',
              message: '请求错误,未找到该资源'
            })
            break
          case 405:
            Dialog({
              title: '提示',
              message: '请求方法未允许'
            })
            break
          case 408:
            Dialog({
              title: '提示',
              message: '请求超时'
            })
            break
          case 500:
            Dialog({
              title: '提示',
              message: '服务器端出错'
            })
            break
          case 501:
            Dialog({
              title: '提示',
              message: '网络未实现'
            })
            break
          case 502:
            Dialog({
              title: '提示',
              message: '网络错误'
            })
            break
          case 503:
            Dialog({
              title: '提示',
              message: '服务不可用'
            })
            break
          case 504:
            Dialog({
              title: '提示',
              message: '网络超时'
            })
            break
          case 505:
            Dialog({
              title: '提示',
              message: 'http版本不支持该请求'
            })
            break
          default:
            Dialog({
              title: '提示',
              message: `连接错误${error.response.status}`
            })
        }
      } else {
        Dialog({
          title: '提示',
          message: '请求超时，请刷新页面重试'
        })
      }
    })
    // 返回 response 里的错误信息
    return Promise.reject(error)
  }
)

export default axios
